"use client";
import { useEffect, useState } from "react";
import currencies from "../../../currency.json";

export default function Home() {
  const defaultValue = 5; // Default value in USD
  const [currency, setCurrency] = useState(null);
  const [convertedValue, setConvertedValue] = useState(defaultValue);
  const ipinfoToken = process.env.NEXT_PUBLIC_IP_INFO_TOKEN;

  useEffect(() => {
    const convertCurrency = async (amount, from, to) => {
      try {
        const res = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${from}`
        );
        const data = await res.json();
        const rate = data.rates[to] || 1;
        setConvertedValue(amount * rate);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    const getClientLocation = async () => {
      try {
        const res = await fetch(`https://ipinfo.io?token=${ipinfoToken}`);
        const locationData = await res.json();
        console.log(locationData);

        const userCountryCode = locationData.country;
        const foundCurrency = currencies.find(
          (c) => c.isoAlpha2 === userCountryCode
        );

        if (foundCurrency) {
          setCurrency(foundCurrency.currency);
          convertCurrency(defaultValue, "USD", foundCurrency.currency.code);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    getClientLocation();
  }, []);

  return (
    <div>
      <p>Check the console for client location data!</p>
      <p>
        Converted Value: {convertedValue} {currency?.symbol || "USD"}
      </p>
    </div>
  );
}
