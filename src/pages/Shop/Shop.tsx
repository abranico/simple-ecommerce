import { SearchInput } from "@/components";
import products from "@/mocks/products.json";
import Product from "./components/Product";

const Shop = () => {
  return (
    <section className="">
      <div className="px-5 py-3 mb-10 flex justify-between flex-wrap max-w-screen-lg mx-auto">
        <h1 className="text-2xl  tracking-wider font-semibold  ">Products</h1>
        <div>
          <SearchInput />
        </div>
      </div>
      <ul className="max-w-screen-lg px-5 mx-auto grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 h-full ">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            category={product.category}
            image={product.image}
            price={product.price}
            rating={product.rating.rate}
          />
        ))}
      </ul>
    </section>
  );
};

export default Shop;
