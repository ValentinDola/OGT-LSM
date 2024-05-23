"use client";

import { Category } from "@prisma/client";
import {
  FcCurrencyExchange,
  FcCandleSticks,
  FcDepartment,
  FcElectricalThreshold,
  FcSalesPerformance,
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Currencies: FcCurrencyExchange,
  Commodities: FcSalesPerformance,
  "Stock Indices": FcDepartment,
  "Synthetics Indices": FcElectricalThreshold,
  Cryptocurrencies: FcCandleSticks,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
