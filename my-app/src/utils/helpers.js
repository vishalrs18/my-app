import { cartData } from "../store/store";

export const getImageUrl = (imgPath) => {
    return new URL(imgPath, import.meta.url).href
}

  export const cartHandler = (e, id, action = "add", data, dispatch, price) => {
    e.stopPropagation();
    e.preventDefault();
    let newOrderArr = structuredClone(data?.cart);
    if (newOrderArr?.length) {
      const idx = data.cart.findIndex((i) => i.itemId === id);
      if (idx != -1) {
        newOrderArr[idx].quantity =
          action === "add"
            ? newOrderArr[idx].quantity + 1
            : newOrderArr[idx].quantity - 1;
        newOrderArr[idx].price = newOrderArr[idx].quantity * price;
        if (newOrderArr[idx].quantity === 0) {
          const filter = newOrderArr.filter((i) => i.itemId !== id);
          newOrderArr = filter;
        }
      } else {
        if (action === "add") {
          newOrderArr.push({
            orderId: 1,
            itemId: id,
            quantity: 1,
            price: +price,
          });
        }
      }
    } else {
      newOrderArr = [{ orderId: 1, itemId: id, quantity: 1, price: +price }];
    }
    dispatch(cartData(newOrderArr));
  };
