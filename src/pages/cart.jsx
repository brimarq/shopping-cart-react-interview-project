import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const [totalCart, setTotalCart] = useState(0);
  /**
   * ! Returning the root state, as in the tutorial:
   * const { cart } = useSelector((state) => state);
   * ! produces the followiwng warning in the console:
   * "Selector unknown returned the root state when called. This can lead to unnecessary rerenders. Selectors that return
   * the entire state are almost certainly a mistake, as they will cause a rerender whenever *anything* in state changes."
   * https://stackoverflow.com/questions/77375700/selector-unknown-returned-the-root-state-when-called-this-can-lead-to-unnecessa
   * ! Better is to narrow the scope and subscribe to/select only the data needed.
   */
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    setTotalCart(cart.reduce((acc, cur) => acc + cur.price, 0));
  }, [cart]);

  console.log(cart, totalCart);
  return <div>Cart</div>;
}
