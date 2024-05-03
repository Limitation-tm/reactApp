import React from "react";
import emptyCart from "../../assets/img/empty-cart.png";

type PageEmptyProps = {
  onClickRefresh: () => void;
};

const PageEmpty: React.FC<PageEmptyProps> = ({ onClickRefresh }) => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Проверьте ваше интернет соединение 😕</h2>
        <p>
          Попробуйте обновить позже.
          <br />
          Прплвуацоалуцоы.
        </p>
        <img src={emptyCart} alt="Empty cart" />
        <a onClick={onClickRefresh} className="button button--black">
          <span>Вернуться назад</span>
        </a>
      </div>
    </>
  );
};

export default PageEmpty;
