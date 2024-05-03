import { Link, useLocation } from "react-router-dom";
import logoImg from "../../public/vite.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/authSlice";
import React from "react";
import { RootState } from "../redux/store";

function Header() {
  const { totalPrice, items } = useSelector(
    (state: RootState) => state.cart.cart
  );
  const { data } = useSelector((state: RootState) => state.auth);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [items]);

  const totalQuant = items.reduce(
    (sum: number, item) => sum + item.quantity,
    0
  );
  const location = useLocation();

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoImg} alt="Pizza logo" />
            <div>
              <h1>Town & Village</h1>
              <p>Choose your style</p>
            </div>
          </div>
        </Link>

        {isAuth && data?.role === "Admin" && (
          <Link to="/product/create" className="button">
            New
          </Link>
        )}
        {window.localStorage.getItem("token") ? (
          <>
            <div>
              <Link to="/me">
                <div>{data?.fullName}</div>
              </Link>
            </div>
            <div>
              {data?.role === "Admin" ? (
                <>
                  <Link to={`/admin/productspanel/${data._id}`}>
                    <div>Orders</div>
                  </Link>
                </>
              ) : (
                <Link to="/myorders">
                  <div>My Orders</div>
                </Link>
              )}
            </div>
          </>
        ) : (
          <div>
            <Link to="/login">
              <div>Войти</div>
            </Link>
          </div>
        )}
        {location.pathname !== "/cart" && (
          <div className="header__cart">
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{totalQuant}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
