import { SearchInput } from "@/components";
import products from "@/mocks/products.json";

const Shop = () => {
  return (
    <section className="">
      <div className="px-5 py-3 mb-10 flex justify-between flex-wrap max-w-screen-lg mx-auto">
        <h1 className="text-2xl  tracking-wider font-semibold  ">Products</h1>
        <div>
          <SearchInput />
        </div>
      </div>
      <ul className="max-w-screen-lg m-auto grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5 h-full ">
        {products.map((product) => (
          <li key={product.id} className="max-w-[320px] ">
            <img
              src={product.image}
              className="w-full h-auto  object-cover "
              alt=""
            />
            <p>{product.title}</p>
            <button className="text-white bg-red-400">Add To Cart</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Shop;
