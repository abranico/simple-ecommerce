import categories from "@/mocks/categories.json";
import { Filter, SortBy } from "../../hooks/useFilter";

interface FiltersProps {
  onFilter: (newFilters: Partial<Filter>) => void;
  filter: Filter;
}

const Filters = ({ onFilter, filter }: FiltersProps) => {
  const handleCategoryChange = (category: string) => {
    const isSelected = filter.categories.includes(category);
    const newCategories = isSelected
      ? filter.categories.filter((cat) => cat !== category)
      : [...filter.categories, category];

    // Llamar a onFilter para actualizar los filtros en useFilter
    onFilter({ categories: newCategories });
  };

  const handlePriceChange = (isCustom: boolean) => {
    onFilter({ price: { ...filter.price, custom: isCustom } });
  };

  const handleCustomPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilter({
      price: {
        ...filter.price,
        [name]: Number(value), // Actualiza min o max
      },
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilter({ rating: rating });
  };

  const handleSort = (sort: string) => {
    onFilter({ sortby: sort });
  };

  return (
    <aside className="sticky top-0 w-1/3 h-screen p-4 bg-gray-100 rounded-lg overflow-y-scroll">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={filter.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span className="ml-2 capitalize">{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Price Range Filter */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Price Range</h3>

          {/* Opción: Cualquier precio */}
          <label className="block mb-2">
            <input
              type="radio"
              name="price-option"
              checked={!filter.price.custom}
              onChange={() => handlePriceChange(false)}
            />
            <span className="ml-2">Any price</span>
          </label>

          {/* Opción: Personalizado */}
          <label className="flex items-start gap-4">
            <input
              type="radio"
              name="price-option"
              checked={filter.price.custom}
              onChange={() => handlePriceChange(true)}
            />

            <div className="flex flex-col gap-2">
              <input
                disabled={!filter.price.custom}
                type="number"
                name="min"
                min={1}
                placeholder="Min."
                className="border rounded px-2 py-1 w-24"
                value={filter.price.min || ""}
                onChange={handleCustomPriceChange}
              />
              <input
                disabled={!filter.price.custom}
                type="number"
                name="max"
                min={1}
                placeholder="Max."
                className="border rounded px-2 py-1 w-24"
                value={filter.price.max || ""}
                onChange={handleCustomPriceChange}
              />
            </div>
          </label>
        </div>

        {/* Rating Filter */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Rating</h3>
          <ul className="space-y-2">
            <li>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="rating"
                  className="form-radio"
                  checked={filter.rating === 4}
                  onChange={() => handleRatingChange(4)}
                />
                <span className="ml-2">4 stars & up</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="rating"
                  className="form-radio"
                  checked={filter.rating === 3}
                  onChange={() => handleRatingChange(3)}
                />
                <span className="ml-2">3 stars & up</span>
              </label>
            </li>
            <li>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="rating"
                  className="form-radio"
                  checked={filter.rating === 2}
                  onChange={() => handleRatingChange(2)}
                />
                <span className="ml-2">2 stars & up</span>
              </label>
            </li>
          </ul>
        </div>

        {/* Order By Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Sort by</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sort-option"
                value="relevance"
                checked={filter.sortby === SortBy.relevance}
                onChange={() => handleSort(SortBy.relevance)}
              />
              <span>Relevance</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sort-option"
                value="price-asc"
                checked={filter.sortby === SortBy.priceLowToHigh}
                onChange={() => handleSort(SortBy.priceLowToHigh)}
              />
              <span>Price: Low to High</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sort-option"
                value="price-desc"
                checked={filter.sortby === SortBy.priceHighToLow}
                onChange={() => handleSort(SortBy.priceHighToLow)}
              />
              <span>Price: High to Low</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sort-option"
                value="rating"
                checked={filter.sortby === SortBy.rating}
                onChange={() => handleSort(SortBy.rating)}
              />
              <span>Rating</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sort-option"
                value="newest"
                checked={filter.sortby === SortBy.newest}
                onChange={() => handleSort(SortBy.newest)}
              />
              <span>Newest</span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Filters;
