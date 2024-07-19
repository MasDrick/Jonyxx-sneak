import { useEffect, useState } from "react";
import styles from "./card.module.scss";

import ContentLoader from "react-content-loader";
import Skeleton from "./Skeleton";

const Card = ({
  id,
  name,
  imgSrc,
  price,
  onPlus,
  onFavorite,
  isFavorite = false,
  added = false,
  loading = false,
}) => {
  const [apply, setApply] = useState(added);
  const [favorite, setFavorite] = useState(isFavorite);

  const changeImg = () => {
    onPlus({ name, imgSrc, price, id });
    setApply(!apply);
  };
  const changeFavorite = () => {
    onFavorite({ name, imgSrc, price, id });
    setFavorite(!favorite);
  };
  return (
    <>
      <div className={styles.card}>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <div className={styles.cardCenter}>
              <div className={styles.favorite}>
                <img
                  onClick={changeFavorite}
                  src={favorite ? "/images/Like.svg" : "/images/Dislike.svg"}
                  alt="NullLike"
                />
              </div>
              <img
                className={styles.centerSneak}
                width={133}
                height={112}
                src={imgSrc}
                alt="Sneak"
              />
              <p>{name}</p>
              <div className="cardBottom d-flex justify-between">
                <div className="d-flex flex-column">
                  <span>Цена: </span>
                  <b>{price} руб.</b>
                </div>
                <button className={styles.btn}>
                  <img
                    onClick={changeImg}
                    width={32}
                    height={32}
                    src={apply ? "/images/apply.svg" : "/images/Plus.svg"}
                    alt="Plus"
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Card;
