import React from "react";
import emptyCart from "../../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

const OrderEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Заказов нет 😕</h2>
        <p>
          Вероятней всasdего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтоasdбы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={emptyCart} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Веasdрнуться к покупкам</span>
        </Link>
      </div>
    </>
  );
};

export default OrderEmpty;
