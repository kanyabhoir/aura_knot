"use client";

import Newsletter from "@/app/components/home/Newsletter";
import ProductCard from "@/app/components/home/ProductCard";
import { useCallback, useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  PRICE_MAX_DEFAULT,
  PRICE_MIN_DEFAULT,
  SHOP_PRODUCTS,
  type ShopCategory,
  type ShopProduct,
} from "./data/catalog";
import Breadcrumbs, { type BreadcrumbItem } from "./components/Breadcrumbs";
import FilterSidebar from "./components/FilterSidebar";
import ShopPagination from "./components/ShopPagination";
import ShopToolbar, { type SortOption } from "./components/ShopToolbar";

const PAGE_SIZE = 9;

export type ShopClientProps = {
  initialCategory: ShopCategory | "all";
  breadcrumbShopLabel?: string;
};

const defaultCategories = (): Record<ShopCategory, boolean> => ({
  woolen: true,
  quilling: true,
  sketch: true,
});

function categoriesFromInitial(
  initial: ShopCategory | "all"
): Record<ShopCategory, boolean> {
  if (initial === "all") return defaultCategories();
  return {
    woolen: initial === "woolen",
    quilling: initial === "quilling",
    sketch: initial === "sketch",
  };
}

function matchesAvailability(
  p: ShopProduct,
  filterInStock: boolean,
  filterOutOfStock: boolean
): boolean {
  if (!filterInStock && !filterOutOfStock) return true;
  if (filterInStock && filterOutOfStock) return true;
  if (filterInStock) return p.inStock;
  return !p.inStock;
}

function sortProducts(list: ShopProduct[], sort: SortOption): ShopProduct[] {
  const copy = [...list];
  switch (sort) {
    case "priceAsc":
      return copy.sort((a, b) => a.price - b.price);
    case "priceDesc":
      return copy.sort((a, b) => b.price - a.price);
    case "name":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "latest":
    default:
      return copy.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
}

export default function ShopClient({
  initialCategory,
  breadcrumbShopLabel = "Shop",
}: ShopClientProps) {
  const [filterInStock, setFilterInStock] = useState(false);
  const [filterOutOfStock, setFilterOutOfStock] = useState(false);
  const [priceMin, setPriceMin] = useState(PRICE_MIN_DEFAULT);
  const [priceMax, setPriceMax] = useState(PRICE_MAX_DEFAULT);
  const [categoryFilters, setCategoryFilters] = useState(() =>
    categoriesFromInitial(initialCategory)
  );
  const [sort, setSort] = useState<SortOption>("latest");
  const [currentPage, setCurrentPage] = useState(1);

  const inStockCount = useMemo(
    () => SHOP_PRODUCTS.filter((p) => p.inStock).length,
    []
  );
  const outOfStockCount = useMemo(
    () => SHOP_PRODUCTS.filter((p) => !p.inStock).length,
    []
  );

  const activeCategoryKeys = useMemo(
    () =>
      (Object.keys(categoryFilters) as ShopCategory[]).filter(
        (k) => categoryFilters[k]
      ),
    [categoryFilters]
  );

  const filtered = useMemo(() => {
    return SHOP_PRODUCTS.filter((p) => {
      if (!matchesAvailability(p, filterInStock, filterOutOfStock))
        return false;
      if (
        activeCategoryKeys.length > 0 &&
        !activeCategoryKeys.includes(p.category)
      )
        return false;
      if (p.price < priceMin || p.price > priceMax) return false;
      return true;
    });
  }, [
    filterInStock,
    filterOutOfStock,
    priceMin,
    priceMax,
    activeCategoryKeys,
  ]);

  const sorted = useMemo(
    () => sortProducts(filtered, sort),
    [filtered, sort]
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageSlice = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, safePage]);

  const resetPage = useCallback(() => setCurrentPage(1), []);

  const categoryLabelForHeading = useMemo(() => {
    if (initialCategory !== "all") {
      return CATEGORY_LABELS[initialCategory];
    }
    if (activeCategoryKeys.length === 0 || activeCategoryKeys.length === 3) {
      return "All Handmade Art";
    }
    if (activeCategoryKeys.length === 1) {
      return CATEGORY_LABELS[activeCategoryKeys[0]];
    }
    return activeCategoryKeys.map((k) => CATEGORY_LABELS[k]).join(", ");
  }, [initialCategory, activeCategoryKeys]);

  const appliedTags = useMemo(() => {
    const tags: { id: string; label: string; onRemove: () => void }[] = [];
    if (filterInStock && !filterOutOfStock) {
      tags.push({
        id: "in",
        label: "In stock",
        onRemove: () => {
          setFilterInStock(false);
          resetPage();
        },
      });
    }
    if (filterOutOfStock && !filterInStock) {
      tags.push({
        id: "out",
        label: "Out of stock",
        onRemove: () => {
          setFilterOutOfStock(false);
          resetPage();
        },
      });
    }
    if (activeCategoryKeys.length > 0 && activeCategoryKeys.length < 3) {
      activeCategoryKeys.forEach((cat) => {
        tags.push({
          id: `cat-${cat}`,
          label: CATEGORY_LABELS[cat],
          onRemove: () => {
            setCategoryFilters((prev) => {
              const next = { ...prev, [cat]: false };
              const remaining = (
                Object.keys(next) as ShopCategory[]
              ).filter((k) => next[k]);
              if (remaining.length === 0) return defaultCategories();
              return next;
            });
            resetPage();
          },
        });
      });
    }
    if (priceMin > PRICE_MIN_DEFAULT || priceMax < PRICE_MAX_DEFAULT) {
      tags.push({
        id: "price",
        label: `₹${priceMin} – ₹${priceMax}`,
        onRemove: () => {
          setPriceMin(PRICE_MIN_DEFAULT);
          setPriceMax(PRICE_MAX_DEFAULT);
          resetPage();
        },
      });
    }
    return tags;
  }, [
    filterInStock,
    filterOutOfStock,
    activeCategoryKeys,
    priceMin,
    priceMax,
    resetPage,
  ]);

  const clearAllTags = useCallback(() => {
    setFilterInStock(false);
    setFilterOutOfStock(false);
    setCategoryFilters(defaultCategories());
    setPriceMin(PRICE_MIN_DEFAULT);
    setPriceMax(PRICE_MAX_DEFAULT);
    setCurrentPage(1);
  }, []);

  const breadcrumbItems = useMemo(() => {
    const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
    if (initialCategory === "all") {
      items.push({ label: breadcrumbShopLabel });
    } else {
      items.push({ label: "Shop", href: "/shop" });
      items.push({ label: CATEGORY_LABELS[initialCategory] });
    }
    return items;
  }, [initialCategory, breadcrumbShopLabel]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Breadcrumbs items={breadcrumbItems} />

        <h1 className="mt-4 text-2xl font-bold text-neutral-900 md:text-3xl">
          {initialCategory === "all"
            ? "Shop"
            : CATEGORY_LABELS[initialCategory]}
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <FilterSidebar
              inStockCount={inStockCount}
              outOfStockCount={outOfStockCount}
              filterInStock={filterInStock}
              filterOutOfStock={filterOutOfStock}
              onInStockChange={(v) => {
                setFilterInStock(v);
                resetPage();
              }}
              onOutOfStockChange={(v) => {
                setFilterOutOfStock(v);
                resetPage();
              }}
              priceMin={priceMin}
              priceMax={priceMax}
              onPriceMinChange={(v) => {
                setPriceMin(Math.max(PRICE_MIN_DEFAULT, Math.min(v, priceMax)));
                resetPage();
              }}
              onPriceMaxChange={(v) => {
                setPriceMax(
                  Math.min(PRICE_MAX_DEFAULT, Math.max(v, priceMin))
                );
                resetPage();
              }}
              categoryFilters={categoryFilters}
              onCategoryToggle={(c) => {
                setCategoryFilters((prev) => ({ ...prev, [c]: !prev[c] }));
                resetPage();
              }}
            />
          </div>

          <div>
            <ShopToolbar
              showing={sorted.length}
              totalCatalog={SHOP_PRODUCTS.length}
              categoryLabel={categoryLabelForHeading}
              sort={sort}
              onSortChange={(s) => {
                setSort(s);
                resetPage();
              }}
              appliedTags={appliedTags}
              onClearAllTags={clearAllTags}
            />

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {pageSlice.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  oldPrice={product.oldPrice}
                  price={product.price}
                  onSale={product.onSale}
                  slug={`/shop/item/${product.id}`}
                />
              ))}
            </div>

            {pageSlice.length === 0 && (
              <p className="mt-12 text-center text-neutral-500">
                No products match your filters. Try adjusting availability,
                category, or price.
              </p>
            )}

            <ShopPagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Newsletter />
      </div>
    </div>
  );
}
