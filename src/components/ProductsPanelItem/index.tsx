import React from "react";
import userImg from "../../assets/img/user.png";
import axios from "../../axios.js";
import OrderOneItem from "../OrderOneItem/index.js";
import { setActiveOrder } from "../../redux/slices/filterSlice.js";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/authSlice.js";
import { RootState, useAppDispatch } from "../../redux/store";
import { TUser } from "../../redux/slices/listSlice";
import { ICartItem } from "../../redux/slices/cartSlice";

export type ProductsPanelItemProps = {
  _id: string;
  status: number;
  user: TUser;
  delivery?: TUser;
  products: ICartItem[];
  createdAt: string;
  numberId: number;
};

const ProductsPanelItem: React.FC<ProductsPanelItemProps> = ({
  _id,
  status,
  user,
  delivery,
  products,
  createdAt,
  numberId,
}) => {
  const fullPrice = products.reduce(
    (sum: number, obj) => obj.price * obj.quantity + sum,
    0
  );

  const statusList = ["Ожидает🤡", "Принят😎", "Доставка😵", "Доставлен😍"];
  const dispatch = useAppDispatch();
  const onSubmit = async () => {
    const fields = { status: 1 };
    try {
      await axios.patch(`/posts/${_id}`, fields);
      console.log("Заказ принят");
      alert("Вы приняли заказ");
    } catch (error) {
      console.warn(error);
    }
    dispatch(setActiveOrder(1));
  };
  const [popup, setPopap] = React.useState(false);
  const [popupOrder, setPopapOrder] = React.useState(false);
  const onClickStatus = async (obj: string, i: number) => {
    const fields = { status: i };
    try {
      await axios.patch(`/posts/${_id}`, fields);
      console.log("Заказ принят");
      alert(`Вы изменили статус на ${obj}`);
    } catch (error) {
      console.warn(error);
    }
    window.location.reload(); //Нужен повторный запрос заказов
  };
  const { data } = useSelector((state: RootState) => state.auth);
  const isAuth = useSelector(selectIsAuth);
  return (
    <>
      <div className="cart__item">
        <div className="">
          <span onClick={() => setPopapOrder(!popupOrder)}>
            #{numberId + 1} {new Date(createdAt).toDateString()}
          </span>
        </div>

        <div className="">
          {isAuth && data?.role == "Admin" && (
            <>
              {user.fullName}
              {user.avatarUrl ? (
                <img
                  className="cart__item-img"
                  width="20"
                  src={`http://localhost:4444${user.avatarUrl}`}
                  alt="UserImg"
                />
              ) : (
                <img className="cart__item-img" src={userImg} alt="UserImg" />
              )}
            </>
          )}
        </div>
        {isAuth && data?.role == "Admin" && (
          <>
            <div onClick={() => setPopap(!popup)}>{statusList[status]}</div>
            <div>
              {popup && (
                <div className="sort__popup">
                  <ul>
                    {statusList.map((obj, i) => (
                      <li
                        key={i}
                        onClick={() => onClickStatus(obj, i)}
                        className=""
                      >
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}

        <div className="cart__item-count">
          <div>{fullPrice}</div>
        </div>
        <div className="cart__item-price">
          <b>
            {isAuth &&
              (data?.role == "Admin" ? (
                delivery ? (
                  <div>Доставщик: {delivery.fullName}</div>
                ) : (
                  <>
                    <div className="button" onClick={onSubmit}>
                      Принять
                    </div>
                  </>
                )
              ) : (
                <>{statusList[status]}</>
              ))}
          </b>
        </div>
      </div>
      {popupOrder &&
        products.map((item) => (
          <OrderOneItem key={item._id + item.size + item.type} {...item} />
        ))}
    </>
  );
};

export default ProductsPanelItem;
