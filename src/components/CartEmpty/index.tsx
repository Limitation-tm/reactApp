import React from "react";
import emptyCart from "../../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Корзина пустая 😕</h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={emptyCart} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Вернуться к покупкам</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
