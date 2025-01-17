import type { IProduct } from "@/models/product.model";
import Product from "./Product";

interface ListOfProductsProps {
  products: IProduct[];
}

const ListOfProducts: React.FC<ListOfProductsProps> = ({ products }) => {
  return (
    <ul className="grid   gap-8">
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          category={product.category}
          price={product.price}
          size="lg"
          cart={false}
          rating={product.rating.rate}
        />
      ))}
    </ul>
  );
};

export default ListOfProducts;
