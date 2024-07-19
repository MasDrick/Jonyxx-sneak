import { useContext, useState } from "react";
import axios from "axios";

import Info from "../Info";
import styles from "./drawer.module.scss";
import AppContext from "../../context";

const Drawer = ({ onCloseCart, onRemove, cartOpened, items = [] }) => {
  const { cartItems, setCartItems } = useContext(AppContext);

  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const onClickOrder = async () => {
    try {
      const { data } = await axios.post(
        "https://e374e2036901d3bf.mokky.dev/orders",
        { items: cartItems }
      );
      axios.patch("https://e374e2036901d3bf.mokky.dev/cart", []);
      setOrderId(data.id);

      setIsOrderComplete(true);
      setCartItems([]);
    } catch (error) {
      alert("Произошла ошибка!");
    }
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${
          cartOpened ? styles.overlayVisible : ""
        }`}
      >
        <div className={styles.drawer}>
          <h2 className="d-flex justify-between">
            Корзина
            <img
              onClick={onCloseCart}
              className={`cu-p ${styles.removeBtn}`}
              src="/images/btnRemove.svg"
              alt="Remove"
            />
          </h2>

          {items.length > 0 ? (
            <div className={styles.cartFill}>
              <div className={styles.items}>
                {items.map((obj, index) => (
                  <div
                    key={index}
                    className={`d-flex align-center mb-15 ${styles.cartItem}`}
                  >
                    <div
                      style={{ backgroundImage: `url(${obj.imgSrc})` }}
                      className={styles.cartItemImg}
                    ></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.name}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img
                      onClick={() => onRemove(obj.id)}
                      className={styles.removeBtn}
                      src="/images/btnRemove.svg"
                      alt="Remove"
                    />
                  </div>
                ))}
              </div>

              <div className={styles.cartTotalBlock}>
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>
                      {items.price}
                      {totalPrice} руб.
                    </b>
                  </li>
                  <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>{Math.round(totalPrice * 1.05)} руб.</b>
                  </li>
                </ul>
                <button onClick={onClickOrder} className={styles.greenButton}>
                  Оформить заказ <img src="/images/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </div>
          ) : (
            <Info
              title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
              description={
                isOrderComplete
                  ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                  : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
              }
              image={
                isOrderComplete ? "/images/order.svg" : "/images/cartEmpty.svg"
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Drawer;
