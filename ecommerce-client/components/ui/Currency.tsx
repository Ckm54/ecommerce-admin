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

  return <div className="font-semibold">{priceFormatter.format(value)}</div>;
};

export default Currency;
