import { Product } from "@/models/product.model";
import { useState } from "react";

export interface Filter {
  categories: string[];
  price: PriceFilter;
  rating: number;
  sortby: SortBy;
}

export interface PriceFilter {
  custom: boolean;
  min: number | null;
  max: number | null;
}

export enum SortBy {
  relevance = "relevance",
  priceLowToHigh = "price-l-to-h",
  priceHighToLow = "price-h-to-l",
  rating = "rating",
  newest = "newest",
}

const useFilter = (products: Product[]) => {
  const [filter, setFilters] = useState<Filter>({
    categories: [],
    price: {
      custom: false,
      min: null,
      max: null,
    },
    rating: 0,
    sortby: SortBy.relevance,
  });

  const handleFilters = (newFilters: Partial<Filter>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const filteredProducts = products.filter((product) => {
    return (
      (filter.categories.length > 0
        ? filter.categories.includes(product.category)
        : product) &&
      (filter.price.custom && filter.price.min
        ? product.price >= filter.price.min
        : true) &&
      (filter.price.custom && filter.price.max
        ? product.price <= filter.price.max
        : true) &&
      product.rating.rate >= filter.rating
    );
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    return filter.sortby === "relevance"
      ? b.rating.count - a.rating.count
      : filter.sortby === "price-l-to-h"
      ? a.price - b.price
      : filter.sortby === "price-h-to-l"
      ? b.price - a.price
      : filter.sortby === "rating"
      ? b.rating.rate - a.rating.rate
      : filter.sortby === "newest"
      ? a.id - b.id
      : 0;
  });

  return { handleFilters, sortedProducts, filter };
};

export default useFilter;
