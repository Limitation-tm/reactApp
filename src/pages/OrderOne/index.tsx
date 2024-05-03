import React from "react";
import { useSelector } from "react-redux";
import { fetchUserPosts } from "../../redux/slices/listSlice";
import ProductsPanelItem from "../../components/ProductsPanelItem";
import { RootState, useAppDispatch } from "../../redux/store.js";
import SkeletonOrder from "../../components/SkeletonOrder";
import OrderEmpty from "../../components/OrderEmpty";

const OrderOne: React.FC = () => {
  const { items, status, total } = useSelector(
    (state: RootState) => state.list.posts
  );
  const dispatch = useAppDispatch();

  const logicFetchBurgers = async () => {
    dispatch(fetchUserPosts());
  };

  React.useEffect(() => {
    logicFetchBurgers();
  }, []);

  const skeletonData = [...new Array(8)].map((_, index) => (
    <SkeletonOrder key={index} />
  ));

  return (
    <div className="container">
      <h1>Мои заказы</h1>
      <div>Total: </div>
      <div className="cart__clear">
        <span>Статус: </span>
      </div>
      {status !== "success" ? (
        skeletonData
      ) : (
        <>
          {total == 0 ? (
            <OrderEmpty />
          ) : (
            <div>
              {items.map((item) => (
                <ProductsPanelItem key={item._id} {...item} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderOne;
