import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartTile from "../components/cart-tile";

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

  return (
    <div className="flex justify-center">
      {cart && cart.length ? (
        <>
          <div className="min-h-[80vh] grid md:grid-cols-2 max-w-6xl mx-auto">
            <div className="flex flex-col justify-center items-center p-3">
              {cart.map((cartItem) => (
                <CartTile key={cartItem.id} cartItem={cartItem} />
              ))}
            </div>
          </div>

          <div className="w-[300px]">
            <div className="flex flex-col justify-center items.end p-5 space-y-5 mt-14">
              <h1 className="font-bold text-lg text-red-800">
                Your Cart Summary
              </h1>
              <p>
                <span className="text-gray-800 font-bold">Total Items:</span>
                <span className="">&nbsp;{cart.length}</span>
              </p>
              <p>
                <span className="text-gray-800 font-bold">Total Amount:</span>
                <span className="">
                  &nbsp;${Number.parseFloat(totalCart).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-gray-800 font-bold text-xl mb-2">
            Your cart is empty
          </h1>
          <Link to={"/"}>
            <button className="bg-red-950 text-white border-2 rounded-lg font-bold p-4">
              SHOP NOW
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
