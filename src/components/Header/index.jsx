import { useContext } from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import AppContext from "../../context";

const Header = (props) => {
  const { cartItems } = useContext(AppContext);

  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return (
    <>
      <header className="d-flex justify-between align-center p-40">
        <Link to="/">
          <div style={{ cursor: "pointer" }} className="d-flex align-center">
            <img className="mr-15" src="/images/Logo.svg" alt="Logo" />
            <div className="headerInfo">
              <h3>Reactive John</h3>
              <p>Магазин лучших кроссовок</p>
            </div>
          </div>
        </Link>
        <ul className="d-flex">
          <li onClick={props.onClickCart} className="mr-30">
            <img className="mr-5" src="/images/Cart.svg" alt="" />
            <span>{totalPrice} руб.</span>
          </li>
          <Link to="/favorite">
            <li className="mr-30">
              <img className="mr-5" src="/images/favorite.svg" alt="heart" />
              <span>Закладки</span>
            </li>
          </Link>
          <Link to="/orders">
            <li className="">
              <img className="mr-5" src="/images/Profile.svg" alt="" />
              <span>Профиль</span>
            </li>
          </Link>
        </ul>
      </header>
    </>
  );
};

export default Header;
