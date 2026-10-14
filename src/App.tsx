import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  COUNTRIES,
  getCountryRule,
  onlyDigits,
  isPhoneDevice,
} from './data/countryRules';

export const App: React.FC = () => {
  const [selectedCc, setSelectedCc] = useState<string>('91');
  const [rawNumber, setRawNumber] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [showFallback, setShowFallback] = useState<boolean>(false);
  const [fallbackLink, setFallbackLink] = useState<string>('#');
  const [fallbackText, setFallbackText] = useState<string>('Tap here to open the chat →');
  const [isPhone, setIsPhone] = useState<boolean>(false);

  const numInputRef = useRef<HTMLInputElement>(null);
  const ccSelectRef = useRef<HTMLSelectElement>(null);

  // Check phone device on mount & resize
  useEffect(() => {
    const checkDevice = () => setIsPhone(isPhoneDevice());
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const { rule, cc } = useMemo(() => getCountryRule(selectedCc), [selectedCc]);

  // Handle country code change
  const handleCcChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCc = e.target.value;
    setSelectedCc(newCc);
    setErrorMsg('');
    setShowFallback(false);

    // If existing number exceeds the new country's length limit, truncate it
    const newRule = getCountryRule(newCc).rule;
    if (newRule.length && rawNumber.length > newRule.length) {
      setRawNumber(rawNumber.slice(0, newRule.length));
    }
    if (numInputRef.current) {
      numInputRef.current.focus();
    }
  };

  // Handle number input
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = onlyDigits(e.target.value);

    // If pasted or typed with leading 0 when length matches length + 1
    if (rule.length && digits.length === rule.length + 1 && digits.startsWith('0')) {
      digits = digits.slice(1);
    }

    const maxLen = rule.length || 15;
    const finalVal = digits.slice(0, maxLen);
    setRawNumber(finalVal);
    setErrorMsg('');
    setShowFallback(false);
  };

  // Clear / refresh button
  const handleRefresh = () => {
    setIsSpinning(true);
    setRawNumber('');
    setErrorMsg('');
    setShowFallback(false);
    setTimeout(() => setIsSpinning(false), 450);
    if (numInputRef.current) {
      numInputRef.current.focus();
    }
  };

  // Validation function
  const validateNumber = () => {
    if (!cc) {
      setErrorMsg('Please select a country code.');
      ccSelectRef.current?.focus();
      return null;
    }

    if (!rawNumber) {
      setErrorMsg('Please enter a WhatsApp number.');
      numInputRef.current?.focus();
      return null;
    }

    const check = rule.validate(rawNumber);
    if (!check.valid) {
      setErrorMsg(check.reason);
      numInputRef.current?.focus();
      return null;
    }

    setErrorMsg('');
    return { cc, num: rawNumber, full: `${cc}${rawNumber}` };
  };

  // Let's Chat primary action
  const handleOpenChat = () => {
    const data = validateNumber();
    if (!data) return;

    setShowFallback(false);

    if (isPhone) {
      const appUrl = `whatsapp://send?phone=${data.full}`;
      const webUrl = `https://wa.me/${data.full}`;

      setFallbackLink(webUrl);
      setFallbackText('Tap here to open chat in WhatsApp →');

      window.location.href = appUrl;

      setTimeout(() => {
        if (!document.hidden) {
          setShowFallback(true);
        }
      }, 1500);
      return;
    }

    // Desktop / Tablet / Laptop
    const webWhatsAppUrl = `https://web.whatsapp.com/send?phone=${data.full}`;
    setFallbackLink(webWhatsAppUrl);
    setFallbackText('Tap here to open Web WhatsApp →');

    let win: Window | null = null;
    try {
      win = window.open(webWhatsAppUrl, '_blank', 'noopener,noreferrer');
    } catch {
      win = null;
    }

    if (!win || win.closed || typeof win.closed === 'undefined') {
      setShowFallback(true);
    }
  };

  // Copy Link action
  const handleCopyLink = async () => {
    const data = validateNumber();
    if (!data) return;

    const linkToCopy = isPhone
      ? `https://wa.me/${data.full}`
      : `https://web.whatsapp.com/send?phone=${data.full}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(linkToCopy);
      } else {
        const tmp = document.createElement('textarea');
        tmp.value = linkToCopy;
        tmp.style.position = 'absolute';
        tmp.style.left = '-9999px';
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand('copy');
        document.body.removeChild(tmp);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch {
      setErrorMsg('Copy failed — please copy the link manually.');
    }
  };

  // Compute Checker Box State
  const checkerState = useMemo(() => {
    const targetLen = rule.length;
    if (!rawNumber) {
      return {
        boxClass: '',
        badgeClass: 'checker-badge idle',
        badgeText: 'Ready',
        body: 'Enter any number to check if it\'s on WhatsApp.',
        counter: targetLen ? `0/${targetLen}` : '0',
      };
    }

    const counter = targetLen ? `${rawNumber.length}/${targetLen}` : `${rawNumber.length}`;

    if (targetLen && rawNumber.length < targetLen) {
      const remaining = targetLen - rawNumber.length;
      return {
        boxClass: 'typing',
        badgeClass: 'checker-badge typing',
        badgeText: `${rawNumber.length}/${targetLen}`,
        body: `Entering ${rule.name} number (${remaining} digit${remaining === 1 ? '' : 's'} remaining)`,
        counter,
      };
    }

    const result = rule.validate(rawNumber);
    if (!result.valid) {
      return {
        boxClass: 'invalid',
        badgeClass: 'checker-badge invalid',
        badgeText: '❌ Invalid',
        body: result.reason,
        counter,
      };
    } else {
      return {
        boxClass: 'valid',
        badgeClass: 'checker-badge valid',
        badgeText: '✅ Valid',
        formatted: result.formatted,
        body: null,
        counter,
      };
    }
  }, [rawNumber, rule]);

  // Compute Preview link
  const previewText = useMemo(() => {
    if (isPhone) {
      return rawNumber ? `whatsapp://send?phone=${cc}${rawNumber}` : 'whatsapp://send?phone=…';
    }
    return rawNumber ? `https://web.whatsapp.com/send?phone=${cc}${rawNumber}` : 'https://web.whatsapp.com/send?phone=…';
  }, [isPhone, rawNumber, cc]);

  return (
    <main className="card">
      <div className="card-head">
        <div className="title-row">
          <div className="logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 2C6.5 2 2 6.5 2 12.05c0 1.77.46 3.44 1.28 4.89L2 22l5.2-1.36a10 10 0 0 0 4.85 1.24h.01c5.54 0 10.04-4.5 10.04-10.05C22.1 6.5 17.6 2 12.05 2zm0 18.13h-.01c-1.5 0-2.98-.4-4.26-1.17l-.3-.18-3.09.81.83-3.01-.2-.31a8.3 8.3 0 0 1-1.28-4.43c0-4.6 3.75-8.34 8.36-8.34 2.23 0 4.32.87 5.9 2.45a8.28 8.28 0 0 1 2.44 5.9c0 4.6-3.75 8.28-8.39 8.28z" />
            </svg>
          </div>
          <h1>WhatsApp Number Adder</h1>
        </div>
        <p className="sub">Chat on WhatsApp without saving numbers and check if any number is on WhatsApp.</p>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="field field-cc">
            <label htmlFor="cc">Country</label>
            <select
              id="cc"
              ref={ccSelectRef}
              value={selectedCc}
              onChange={handleCcChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  numInputRef.current?.focus();
                }
              }}
              autoComplete="tel-country-code"
              title="Select Country Code"
            >
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field field-num">
            <div className="num-label-row">
              <label htmlFor="number">
                {rule.length ? `WhatsApp Number (${rule.length} digits)` : 'WhatsApp Number'}
              </label>
              <span className="num-hint">{checkerState.counter}</span>
            </div>
            <div className="input-refresh-wrap">
              <input
                id="number"
                ref={numInputRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={rule.example}
                maxLength={rule.length || 15}
                value={rawNumber}
                onChange={handleNumberInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleOpenChat();
                  }
                }}
                autoComplete="off"
              />
              <button
                type="button"
                className={`btn-refresh ${isSpinning ? 'spinning' : ''}`}
                title="Clear and refresh number"
                aria-label="Clear and refresh number"
                onClick={handleRefresh}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.19" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* WhatsApp Number Checker Box */}
        <div className={`checker-box ${checkerState.boxClass}`}>
          <div className="checker-header">
            <div className="checker-title">
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>WhatsApp Checker</span>
            </div>
            <span className={checkerState.badgeClass}>
              {checkerState.badgeText}
            </span>
          </div>
          <div className="checker-body">
            {checkerState.formatted ? (
              <>
                Valid WhatsApp number: <strong>{checkerState.formatted}</strong>
              </>
            ) : (
              checkerState.body
            )}
          </div>
        </div>

        {/* Direct Link Preview Box */}
        <div className="preview-box">
          <div className="preview-label">
            {isPhone ? 'Direct App Link' : 'Direct WhatsApp Link'}
          </div>
          <div id="preview">{previewText}</div>
        </div>

        {/* Validation error message */}
        <div className="error" role="alert" aria-live="polite">
          {errorMsg}
        </div>

        {/* Action Buttons */}
        <div className="actions">
          <button className="btn-main" type="button" onClick={handleOpenChat}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            <span>Let's Chat</span>
          </button>
          <button
            className={`btn-copy ${isCopied ? 'copied' : ''}`}
            type="button"
            title="Copy direct link"
            onClick={handleCopyLink}
          >
            <svg
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>{isCopied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>
        </div>

        {/* Fallback box */}
        <div className={`fallback ${showFallback ? 'show' : ''}`}>
          WhatsApp didn't open automatically?{' '}
          <a href={fallbackLink} target="_blank" rel="noopener noreferrer">
            {fallbackText}
          </a>
        </div>

        {/* Credits */}
        <div className="credit">
          WhatsApp Chat Automate with Unknown Number &bull; Created by <strong>Shivani</strong>
        </div>
      </div>
    </main>
  );
};

export default App;
