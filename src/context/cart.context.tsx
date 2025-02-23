import { IProduct } from "@/models/product.model";
import { createContext, useContext, useReducer } from "react";

export interface CartItem {
  id: IProduct["id"];
  image: string;
  title: string;
  category: string;
  price: number;
  quantity: number;
}

enum ActionType {
  ADD = "ADD",
  REMOVE = "REMOVE",
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
  CLEAR = "CLEAR",
}

type Action =
  | { type: ActionType.ADD; payload: { item: CartItem } }
  | { type: ActionType.REMOVE; payload: { id: CartItem["id"] } }
  | { type: ActionType.INCREMENT; payload: { id: CartItem["id"] } }
  | { type: ActionType.DECREMENT; payload: { id: CartItem["id"] } }
  | { type: ActionType.CLEAR; payload?: never };

const initialState: CartItem[] = [];
const reducer = (state: CartItem[], action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.ADD: {
      const { item } = payload;
      return state.concat(item);
    }
    case "REMOVE": {
      const { id } = payload;
      return state.filter((product) => product.id !== id);
    }
    case "INCREMENT": {
      const { id } = payload;
      return state.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    }
    case ActionType.DECREMENT: {
      const { id } = payload;
      return state
        .map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0);
    }
    case ActionType.CLEAR: {
      return initialState;
    }
  }
  return state;
};

interface ContextProps {
  cart: CartItem[];
  add: (product: IProduct) => void;
  remove: (id: CartItem["id"]) => void;
  increment: (id: CartItem["id"]) => void;
  decrement: (id: CartItem["id"]) => void;
  clear: () => void;
}

const CartContext = createContext<ContextProps | null>(null);

interface ProviderProps {
  children: React.ReactNode;
}

const CartContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const add = (product: IProduct) => {
    const item: CartItem = {
      id: product.id,
      image: product.image,
      title: product.title,
      category: product.category,
      price: product.price,
      quantity: 1,
    };
    dispatch({ type: ActionType.ADD, payload: { item } });
  };

  const remove = (id: CartItem["id"]) =>
    dispatch({ type: ActionType.REMOVE, payload: { id } });

  const increment = (id: CartItem["id"]) =>
    dispatch({ type: ActionType.INCREMENT, payload: { id } });

  const decrement = (id: CartItem["id"]) =>
    dispatch({ type: ActionType.DECREMENT, payload: { id } });

  const clear = () => dispatch({ type: ActionType.CLEAR });

  return (
    <CartContext.Provider
      value={{ cart: state, add, remove, increment, decrement, clear }}
    >
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
