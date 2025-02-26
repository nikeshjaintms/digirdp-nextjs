"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const CurrencyContext = createContext({
  currency: {
    id: "1",
    code: "USD",
    prefix: "$",
    suffix: " USD",
    format: "1",
    rate: "1.00000",
  },
  setCurrency: (currency) => {},
  setDefaultCurrency: () => {},
});

export function CurrencyProvider({ children }) {
  const defaultCurrency = {
    id: "1",
    code: "USD",
    prefix: "$",
    suffix: " USD",
    format: "1",
    rate: "1.00000",
  };
  const [currency, setCurrency] = useState(defaultCurrency);

  const setAnotherCurrency = (currency) => {
    setCurrency(currency);
  };

  const setDefaultCurrency = () => {
    setCurrency({
      id: "1",
      code: "USD",
      prefix: "$",
      suffix: " USD",
      format: "1",
      rate: "1.00000",
    });
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setAnotherCurrency, setDefaultCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
