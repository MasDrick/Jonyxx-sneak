import { useContext, useEffect, useState } from "react";
import axios from "axios";

import Card from "../components/Card";
import AppContext from "../context";
import { Link } from "react-router-dom";

const Orders = () => {
  const {} = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { data } = axios.get("https://e374e2036901d3bf.mokky.dev/orders");
  }, []);

  return (
    <>
      <div className="content p-40">
        <div className="d-flex align-center mb-40">
          <Link to="/">
            <img className="mr-20" src="/public/images/backBtn.svg" alt="" />
          </Link>
          <h1>Мои заказы</h1>
        </div>

        <div className="d-flex flex-wrap justify-between align-center flex-column">
          <h2 style={{ margin: "0 auto" }}>Пока в разработке ⚙️</h2>
          <img
            style={{ marginTop: "20px" }}
            src="/images/update.gif"
            alt="обизяна"
          />
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            <p style={{ fontSize: "10px", color: "#d0d0d0" }}>
              P.S. Кликни на меня
            </p>
          </a>
        </div>
      </div>
    </>
  );
};

export default Orders;
