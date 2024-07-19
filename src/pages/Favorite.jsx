import { useContext } from "react";
import Card from "../components/Card";
import AppContext from "../context";
import { Link } from "react-router-dom";

const Favorite = ({ onAddToFavorite }) => {
  const { favorites } = useContext(AppContext);

  return (
    <>
      <div className="content p-40">
        <div className="d-flex align-center mb-40">
          <Link to="/">
            <img className="mr-20" src="/public/images/backBtn.svg" alt="" />
          </Link>
          <h1>Мои закладки</h1>
        </div>

        <div className="d-flex flex-wrap justify-between">
          {favorites.map((item, index) => (
            <Card
              {...item}
              key={index}
              isFavorite={true}
              onFavorite={onAddToFavorite}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Favorite;
