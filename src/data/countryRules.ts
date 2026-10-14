export interface CountryOption {
  code: string;
  name: string;
  flag: string;
  label: string;
}

export interface ValidationSuccess {
  valid: true;
  type: string;
  formatted: string;
}

export interface ValidationFailure {
  valid: false;
  reason: string;
}

export type ValidationResult = ValidationSuccess | ValidationFailure;

export interface CountryRule {
  name: string;
  flag: string;
  length: number | null;
  example: string;
  validate: (num: string) => ValidationResult;
}

export const COUNTRIES: CountryOption[] = [
  { code: '91', name: 'India', flag: '🇮🇳', label: '🇮🇳 +91 India' },
  { code: '1', name: 'USA / Canada', flag: '🇺🇸', label: '🇺🇸 +1 USA / Canada' },
  { code: '44', name: 'UK', flag: '🇬🇧', label: '🇬🇧 +44 UK' },
  { code: '971', name: 'UAE', flag: '🇦🇪', label: '🇦🇪 +971 UAE' },
  { code: '966', name: 'Saudi Arabia', flag: '🇸🇦', label: '🇸🇦 +966 Saudi Arabia' },
  { code: '92', name: 'Pakistan', flag: '🇵🇰', label: '🇵🇰 +92 Pakistan' },
  { code: '880', name: 'Bangladesh', flag: '🇧🇩', label: '🇧🇩 +880 Bangladesh' },
  { code: '61', name: 'Australia', flag: '🇦🇺', label: '🇦🇺 +61 Australia' },
  { code: '65', name: 'Singapore', flag: '🇸🇬', label: '🇸🇬 +65 Singapore' },
  { code: '60', name: 'Malaysia', flag: '🇲🇾', label: '🇲🇾 +60 Malaysia' },
  { code: '62', name: 'Indonesia', flag: '🇮🇩', label: '🇮🇩 +62 Indonesia' },
  { code: '63', name: 'Philippines', flag: '🇵🇭', label: '🇵🇭 +63 Philippines' },
  { code: '49', name: 'Germany', flag: '🇩🇪', label: '🇩🇪 +49 Germany' },
  { code: '33', name: 'France', flag: '🇫🇷', label: '🇫🇷 +33 France' },
  { code: '39', name: 'Italy', flag: '🇮🇹', label: '🇮🇹 +39 Italy' },
  { code: '34', name: 'Spain', flag: '🇪🇸', label: '🇪🇸 +34 Spain' },
  { code: '31', name: 'Netherlands', flag: '🇳🇱', label: '🇳🇱 +31 Netherlands' },
  { code: '41', name: 'Switzerland', flag: '🇨🇭', label: '🇨🇭 +41 Switzerland' },
  { code: '353', name: 'Ireland', flag: '🇮🇪', label: '🇮🇪 +353 Ireland' },
  { code: '55', name: 'Brazil', flag: '🇧🇷', label: '🇧🇷 +55 Brazil' },
  { code: '52', name: 'Mexico', flag: '🇲🇽', label: '🇲🇽 +52 Mexico' },
  { code: '54', name: 'Argentina', flag: '🇦🇷', label: '🇦🇷 +54 Argentina' },
  { code: '57', name: 'Colombia', flag: '🇨🇴', label: '🇨🇴 +57 Colombia' },
  { code: '234', name: 'Nigeria', flag: '🇳🇬', label: '🇳🇬 +234 Nigeria' },
  { code: '27', name: 'South Africa', flag: '🇿🇦', label: '🇿🇦 +27 South Africa' },
  { code: '254', name: 'Kenya', flag: '🇰🇪', label: '🇰🇪 +254 Kenya' },
  { code: '20', name: 'Egypt', flag: '🇪🇬', label: '🇪🇬 +20 Egypt' },
  { code: '90', name: 'Turkey', flag: '🇹🇷', label: '🇹🇷 +90 Turkey' },
  { code: '81', name: 'Japan', flag: '🇯🇵', label: '🇯🇵 +81 Japan' },
  { code: '82', name: 'South Korea', flag: '🇰🇷', label: '🇰🇷 +82 South Korea' },
  { code: '86', name: 'China', flag: '🇨🇳', label: '🇨🇳 +86 China' },
  { code: '7', name: 'Russia / KZ', flag: '🇷🇺', label: '🇷🇺 +7 Russia / KZ' },
  { code: '64', name: 'New Zealand', flag: '🇳🇿', label: '🇳🇿 +64 New Zealand' },
  { code: '48', name: 'Poland', flag: '🇵🇱', label: '🇵🇱 +48 Poland' },
  { code: '351', name: 'Portugal', flag: '🇵🇹', label: '🇵🇹 +351 Portugal' },
  { code: '46', name: 'Sweden', flag: '🇸🇪', label: '🇸🇪 +46 Sweden' },
  { code: '47', name: 'Norway', flag: '🇳🇴', label: '🇳🇴 +47 Norway' },
  { code: '45', name: 'Denmark', flag: '🇩🇰', label: '🇩🇰 +45 Denmark' },
  { code: '94', name: 'Sri Lanka', flag: '🇱🇰', label: '🇱🇰 +94 Sri Lanka' },
  { code: '977', name: 'Nepal', flag: '🇳🇵', label: '🇳🇵 +977 Nepal' },
  { code: '974', name: 'Qatar', flag: '🇶🇦', label: '🇶🇦 +974 Qatar' },
  { code: '968', name: 'Oman', flag: '🇴🇲', label: '🇴🇲 +968 Oman' },
  { code: '965', name: 'Kuwait', flag: '🇰🇼', label: '🇰🇼 +965 Kuwait' },
  { code: '973', name: 'Bahrain', flag: '🇧🇭', label: '🇧🇭 +973 Bahrain' },
  { code: '962', name: 'Jordan', flag: '🇯🇴', label: '🇯🇴 +962 Jordan' },
  { code: '961', name: 'Lebanon', flag: '🇱🇧', label: '🇱🇧 +961 Lebanon' },
  { code: '212', name: 'Morocco', flag: '🇲🇦', label: '🇲🇦 +212 Morocco' },
];

export const COUNTRY_RULES: Record<string, CountryRule> = {
  '91': {
    name: 'India',
    flag: '🇮🇳',
    length: 10,
    example: '9876543210',
    validate: (num: string): ValidationResult => {
      if (num.length !== 10) return { valid: false, reason: `India requires exactly 10 digits (you typed ${num.length}).` };
      if (!/^[6-9]/.test(num)) return { valid: false, reason: `Indian WhatsApp numbers must start with 6, 7, 8, or 9 (Mobile series). '${num[0]}' is a landline or invalid prefix.` };
      return { valid: true, type: 'Mobile (Cellular)', formatted: `+91 ${num.slice(0, 5)} ${num.slice(5)}` };
    }
  },
  '1': {
    name: 'USA / Canada',
    flag: '🇺🇸',
    length: 10,
    example: '4155552671',
    validate: (num: string): ValidationResult => {
      if (num.length !== 10) return { valid: false, reason: `US/Canada requires 10 digits (area code + 7 digits).` };
      if (/^[01]/.test(num)) return { valid: false, reason: `US area codes cannot start with 0 or 1.` };
      return { valid: true, type: 'NANP Mobile / Wireless', formatted: `+1 (${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6)}` };
    }
  },
  '44': {
    name: 'UK',
    flag: '🇬🇧',
    length: 10,
    example: '7911123456',
    validate: (num: string): ValidationResult => {
      if (num.length !== 10) return { valid: false, reason: `UK mobile numbers are 10 digits (without leading 0).` };
      if (!num.startsWith('7')) return { valid: false, reason: `UK WhatsApp mobile numbers must start with 7.` };
      return { valid: true, type: 'UK Mobile Network', formatted: `+44 ${num.slice(0, 4)} ${num.slice(4)}` };
    }
  },
  '971': {
    name: 'UAE',
    flag: '🇦🇪',
    length: 9,
    example: '501234567',
    validate: (num: string): ValidationResult => {
      if (num.length !== 9) return { valid: false, reason: `UAE mobile numbers are 9 digits (without leading 0).` };
      if (!num.startsWith('5')) return { valid: false, reason: `UAE mobile numbers must start with 5 (e.g. 50, 52, 54, 55, 56, 58).` };
      return { valid: true, type: 'UAE Mobile', formatted: `+971 ${num.slice(0, 2)} ${num.slice(2, 5)} ${num.slice(5)}` };
    }
  },
  '966': {
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    length: 9,
    example: '512345678',
    validate: (num: string): ValidationResult => {
      if (num.length !== 9) return { valid: false, reason: `Saudi mobile numbers are 9 digits.` };
      if (!num.startsWith('5')) return { valid: false, reason: `Saudi mobile numbers must start with 5.` };
      return { valid: true, type: 'KSA Mobile', formatted: `+966 5${num.slice(1, 4)} ${num.slice(4)}` };
    }
  },
  '92': {
    name: 'Pakistan',
    flag: '🇵🇰',
    length: 10,
    example: '3001234567',
    validate: (num: string): ValidationResult => {
      if (num.length !== 10) return { valid: false, reason: `Pakistan mobile numbers are 10 digits (without leading 0).` };
      if (!num.startsWith('3')) return { valid: false, reason: `Pakistan mobile numbers must start with 3.` };
      return { valid: true, type: 'Pakistan Mobile', formatted: `+92 ${num.slice(0, 3)} ${num.slice(3)}` };
    }
  },
  '880': {
    name: 'Bangladesh',
    flag: '🇧🇩',
    length: 10,
    example: '1712345678',
    validate: (num: string): ValidationResult => {
      if (num.length !== 10) return { valid: false, reason: `Bangladesh mobile numbers are 10 digits (without leading 0).` };
      if (!num.startsWith('1')) return { valid: false, reason: `Bangladesh mobile numbers must start with 1 (e.g. 17, 18, 19).` };
      return { valid: true, type: 'Bangladesh Mobile', formatted: `+880 ${num.slice(0, 4)} ${num.slice(4)}` };
    }
  },
  '61': {
    name: 'Australia',
    flag: '🇦🇺',
    length: 9,
    example: '412345678',
    validate: (num: string): ValidationResult => {
      if (num.length !== 9) return { valid: false, reason: `Australian mobile numbers are 9 digits (without leading 0).` };
      if (!num.startsWith('4')) return { valid: false, reason: `Australian mobile numbers must start with 4.` };
      return { valid: true, type: 'Australia Mobile', formatted: `+61 4${num.slice(1, 4)} ${num.slice(4)}` };
    }
  },
  '65': {
    name: 'Singapore',
    flag: '🇸🇬',
    length: 8,
    example: '81234567',
    validate: (num: string): ValidationResult => {
      if (num.length !== 8) return { valid: false, reason: `Singapore mobile numbers are 8 digits.` };
      if (!/^[89]/.test(num)) return { valid: false, reason: `Singapore mobile numbers must start with 8 or 9.` };
      return { valid: true, type: 'Singapore Mobile', formatted: `+65 ${num.slice(0, 4)} ${num.slice(4)}` };
    }
  },
  '55': {
    name: 'Brazil',
    flag: '🇧🇷',
    length: 11,
    example: '11987654321',
    validate: (num: string): ValidationResult => {
      if (num.length !== 11) return { valid: false, reason: `Brazil mobile numbers are 11 digits (2-digit DDD + 9 digits).` };
      if (num[2] !== '9') return { valid: false, reason: `Brazilian mobile numbers must have 9 as 3rd digit (e.g. 11 9xxxx-xxxx).` };
      return { valid: true, type: 'Brazil Mobile', formatted: `+55 (${num.slice(0, 2)}) ${num.slice(2, 7)}-${num.slice(7)}` };
    }
  }
};

export const DEFAULT_RULE: CountryRule = {
  name: 'International',
  flag: '🌐',
  length: null,
  example: '9876543210',
  validate: (num: string): ValidationResult => {
    if (num.length < 7 || num.length > 15) return { valid: false, reason: `Mobile numbers are usually 7-15 digits (you typed ${num.length}).` };
    if (/^0+$/.test(num)) return { valid: false, reason: `Invalid phone number format.` };
    return { valid: true, type: 'International Mobile', formatted: `+${num}` };
  }
};

export const onlyDigits = (str: string): string => str.replace(/\D/g, '');

export function getCountryRule(countryCode: string): { rule: CountryRule; cc: string } {
  const cc = onlyDigits(countryCode);
  return { rule: COUNTRY_RULES[cc] || DEFAULT_RULE, cc };
}

export function isPhoneDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  if (/iPhone|iPod/i.test(ua)) return true;
  if (/Android/i.test(ua) && /Mobile/i.test(ua)) return true;
  if (/BlackBerry|IEMobile|Opera Mini|webOS/i.test(ua)) return true;
  if (window.matchMedia && window.matchMedia('(max-width: 500px) and (pointer: coarse)').matches) {
    return true;
  }
  return false;
}
