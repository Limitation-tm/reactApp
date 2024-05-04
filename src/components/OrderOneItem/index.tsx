import React from "react";
import { Link } from "react-router-dom";

type OrderOneItemProps = {
  _id: string;
  title: string;
  imageUrl: string;
  type: string;
  size: string;
  quantity: number;
  price: number;
};

const OrderOneItem: React.FC<OrderOneItemProps> = ({
  _id,
  title,
  imageUrl,
  type,
  size,
  quantity,
  price,
}) => {
  return (
    <>
      <div className="cart__item">
        <div className="cart__item-img">
          <Link to={`/product/${_id}`}>
            <img
              className="pizza-block__image"
              src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
              alt="Pizza"
            />
          </Link>
        </div>
        <div className="cart__item-info">
          <Link to={`/product/${_id}`}>
            <h3>{title}</h3>
          </Link>
          <p>
            {type}, {size} см. Price: {price} {quantity} шт. Total:
            {quantity * price}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderOneItem;
