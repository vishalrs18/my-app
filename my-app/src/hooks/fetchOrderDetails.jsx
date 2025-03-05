import { useSelector } from "react-redux";

export const useFetchOrderData = (id) => {
  const cart = useSelector((state) => state.cart);
  const cardOrderData = cart?.filter((i) => i.itemId === id);
  const data = {
    cart,
    cardOrderData,
  };
  return [data];
};
