"use client";

import React from "react";

import { priceFormatter } from "@/lib/utils";

interface CurrencyProps {
  value: number;
}

const Currency: React.FC<CurrencyProps> = ({ value }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <span className="font-semibold">{priceFormatter.format(value)}</span>;
};

export default Currency;
