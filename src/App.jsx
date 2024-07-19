import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import AppContext from "./context";
import { useEffect, useState } from "react";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // mokky.dev работает через google аккаунт (не гитхаб)

  useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get(
        "https://e374e2036901d3bf.mokky.dev/cart"
      );

      const favoritesResponse = await axios.get(
        "https://e374e2036901d3bf.mokky.dev/favorites"
      );

      const itemsResponse = await axios.get(
        "https://e374e2036901d3bf.mokky.dev/items"
      );

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);

      setIsLoading(false);
    }
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  // useEffect(() => {
  //   axios.get("https://e374e2036901d3bf.mokky.dev/cart").then((res) => {
  //     setCartItems(res.data);
  //   });
  // }, [cartOpened]);

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://e374e2036901d3bf.mokky.dev/cart/${obj.id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios.post("https://e374e2036901d3bf.mokky.dev/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://e374e2036901d3bf.mokky.dev/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://e374e2036901d3bf.mokky.dev/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось подгрузить избранное");
    }
  };

  const onRemoveItem = (id) => {
    console.log(id);
    axios.delete(`https://e374e2036901d3bf.mokky.dev/cart/${id}`);
    setCartItems((prev) => prev.filter((cartItem) => cartItem.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id - 1) === Number(id));
  };

  return (
    <>
      <AppContext.Provider
        value={{
          items,
          cartItems,
          favorites,
          isItemAdded,
          setCartOpened,
          setCartItems,
        }}
      >
        <div className="wrapper clear">
          {
            <Drawer
              items={cartItems}
              onCloseCart={() => setCartOpened(false)}
              onRemove={onRemoveItem}
              cartOpened={cartOpened}
            />
          }

          <Header onClickCart={() => setCartOpened(true)} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  items={items}
                  cartItems={cartItems}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onChangeSearchInput={onChangeSearchInput}
                  onAddToCart={onAddToCart}
                  onAddToFavorite={onAddToFavorite}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/favorite"
              element={<Favorite onAddToFavorite={onAddToFavorite} />}
            />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
