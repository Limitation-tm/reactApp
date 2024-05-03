import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import { clearAllProductsFromCart } from "../redux/slices/cartSlice";
import CartEmpty from "../components/CartEmpty";
import axios from "../axios.js";
import { RootState, useAppDispatch } from "../redux/store";

const Cart: React.FC = () => {
  const { totalPrice, items } = useSelector(
    (state: RootState) => state.cart.cart
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const totalQuant = items.reduce(
    (sum: number, item) => sum + item.quantity,
    0
  );
  const onSubmit = async () => {
    try {
      const fields = { products: items };
      console.log(fields);
      await axios.post("/posts", fields);
      alert("Заказ офромлен");
      navigate("/myorders");
    } catch (error) {
      console.warn(error);
      alert("Пожалуйста зарегистрируйтесь");
    }
  };
  return (
    <>
      <div className="container container--cart">
        <div className="cart">
          {totalQuant > 0 ? (
            <>
              <div className="cart__top">
                <h2 className="content__title">Корзина</h2>

                <div className="cart__clear">
                  <span onClick={() => dispatch(clearAllProductsFromCart())}>
                    Очистить корзину
                  </span>
                </div>
              </div>
              <div className="content__items">
                {items.map((item) => (
                  <CartItem key={item._id + item.size + item.type} {...item} />
                ))}
              </div>
              <div className="cart__bottom">
                <div className="cart__bottom-details">
                  <span>
                    Всего бургеров: <b>{totalQuant} шт.</b>
                  </span>
                  <span>
                    Сумма заказа: <b>{totalPrice} ₽</b>
                  </span>
                </div>
                <div className="cart__bottom-buttons">
                  <Link
                    to="/"
                    className="button button--outline button--add go-back-btn"
                  >
                    <span>Вернуться назад</span>
                  </Link>
                  <div onClick={onSubmit} className="button pay-btn">
                    <span>Оформить сейчас</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <CartEmpty />
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
