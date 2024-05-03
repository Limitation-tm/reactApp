import { useState } from "react";
import { addingProductsToCart } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";

type TFullPizzaBlockProps = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizeList: string[];
  typeListId: string[];
};

const FullPizzaBlock: React.FC<TFullPizzaBlockProps> = ({
  _id,
  title,
  price,
  imageUrl,
  sizeList,
  typeListId,
}) => {
  const [sizeCount, setSizeCount] = useState(0);
  const [typeCount, setTypeCount] = useState(0);
  const typeList = ["Thin", "Tradition"];
  const onClickSize = (i: number) => {
    setSizeCount(i);
  };
  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.cart.items.find(
      (obj) =>
        obj._id === _id &&
        obj.type === typeList[typeCount] &&
        obj.size === sizeList[sizeCount]
    )
  );
  const addedCount = cartItem ? cartItem.quantity : 0;

  const onClickAddToCart = () => {
    const item = {
      _id,
      title,
      price,
      quantity: 0,
      imageUrl,
      type: typeList[typeCount],
      size: sizeList[sizeCount],
    };
    dispatch(addingProductsToCart(item));
  };

  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={`http://localhost:4444${imageUrl}`}
        alt="Pizza"
      />
      <Link to={`/product/${_id}/edit`}>
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
          />
        </svg>
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {typeListId.map((_, i) => (
            <li
              key={i}
              onClick={() => setTypeCount(i)}
              className={typeCount == i ? "active" : ""}
            >
              {typeList[i]}
            </li>
          ))}
        </ul>
        <ul>
          {sizeList.map((size, i) => (
            <li
              key={i}
              onClick={() => onClickSize(i)}
              className={sizeCount == i ? "active" : ""}
            >
              {size} cm
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">From {price} ₽</div>

        <button
          className="button button--outline button--add"
          onClick={onClickAddToCart}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default FullPizzaBlock;
