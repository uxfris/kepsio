import { useMemo } from "react";

export type BillingCycle = "monthly" | "annual";

export interface PricingConfig {
  billingCycle: BillingCycle;
  annualDiscountPercentage: number;
}

export const usePricing = (config: PricingConfig) => {
  const { billingCycle, annualDiscountPercentage } = config;

  const formatPrice = useMemo(() => {
    return (price: number): number => {
      if (billingCycle === "annual") {
        return Math.round(price * (1 - annualDiscountPercentage / 100));
      }
      return price;
    };
  }, [billingCycle, annualDiscountPercentage]);

  const getAnnualSavings = useMemo(() => {
    return (monthlyPrice: number): number => {
      const annualPrice = monthlyPrice * 12;
      const discountedAnnual = Math.round(
        monthlyPrice * (1 - annualDiscountPercentage / 100) * 12
      );
      return annualPrice - discountedAnnual;
    };
  }, [annualDiscountPercentage]);

  const getBillingText = useMemo(() => {
    return (price: number): string => {
      if (price === 0) return "Free for everyone";
      if (billingCycle === "annual") {
        return `Billed ${
          formatPrice(price) * 12
        }/year · Save ${getAnnualSavings(price)}/year`;
      }
      return "Billed monthly · Cancel anytime";
    };
  }, [billingCycle, formatPrice, getAnnualSavings]);

  return {
    formatPrice,
    getAnnualSavings,
    getBillingText,
  };
};
