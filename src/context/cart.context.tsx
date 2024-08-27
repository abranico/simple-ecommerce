import { Product } from "@/models/product.model";
import { createContext, useContext, useReducer } from "react";

const initialState: Partial<Product>[] = [];
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD": {
      const { product } = payload;
      return state.concat(product);
    }
    case "REMOVE": {
      const { id } = payload;
      return state.filter((product) => product.id !== id);
    }
  }
  return state;
};

interface ContextProps {
  cart: Product[];
  addToCart: (product: Partial<Product>) => void;
  removeFromCart: (id: Pick<Product, "id">) => void;
}

const CartContext = createContext<ContextProps | null>(null);

interface ProviderProps {
  children: React.ReactNode;
}

const CartContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product: Partial<Product>) => {
    dispatch({ type: "ADD", payload: { product } });
  };

  const removeFromCart = ({ id }: Pick<Product, "id">) => {
    dispatch({ type: "REMOVE", payload: { id } });
  };

  return (
    <CartContext.Provider value={{ cart: state, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export default CartContextProvider;
