import { useContext } from "react";
import AppContext from "../context";
import styles from "./Drawer/drawer.module.scss";

const Info = ({ title, description, image }) => {
  const { setCartOpened } = useContext(AppContext);

  return (
    <div className={styles.content}>
      <img src={image} alt="empty box" />
      <h3>{title}</h3>
      <p>{description}</p>
      <button
        onClick={() => setCartOpened(false)}
        className={styles.greenButtonBack}
      >
        Вернуться назад <img src="/images/arrow.svg" alt="Arrow" />
      </button>
    </div>
  );
};

export default Info;
