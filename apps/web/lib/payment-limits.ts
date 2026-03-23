/**
 * Payment limits — single source of truth for all financial constants.
 * Used by both frontend UI and should mirror server-side validation.
 */

export const PAYMENT_LIMITS = {
  depositMin: 500,        // Kz
  depositMax: 5_000_000,  // Kz
  withdrawMin: 5_000,     // Kz
  withdrawMax: 500_000,   // Kz per transaction
  withdrawMonthlyNoKyc: 50_000, // Kz — above this requires KYC
  kycThreshold: 50_000,   // Kz/month
  ivaRate: 0.14,          // 14% IVA Angola
} as const

export const SALOS_PACKAGES = [
  { salos: 50,    priceKz: 50,    discount: 0  },
  { salos: 200,   priceKz: 180,   discount: 10 },
  { salos: 500,   priceKz: 430,   discount: 14 },
  { salos: 1000,  priceKz: 850,   discount: 15 },
  { salos: 2500,  priceKz: 2000,  discount: 20 },
  { salos: 5000,  priceKz: 3900,  discount: 22 },
] as const

export const PLATFORM_COMMISSION = {
  salos: 0.20,
  subscriptions: 0.20,
  shopDigital: 0.15,
  shopPhysical: 0.10,
  shopExperience: 0.20,
} as const

export const SUBSCRIPTION_TIERS = [
  { tier: 1, priceKz: 500,  name: "Nível 1" },
  { tier: 2, priceKz: 1500, name: "Nível 2" },
  { tier: 3, priceKz: 3000, name: "Nível 3" },
] as const
