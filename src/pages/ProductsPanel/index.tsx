import React from "react";
import { TUser, fetchAdminPosts, setPosts } from "../../redux/slices/listSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductsPanelItem from "../../components/ProductsPanelItem";
import OrderList from "../../components/OrderList.jsx";
import { setActiveOrder } from "../../redux/slices/filterSlice.js";
import { useInView } from "react-intersection-observer";
import { RootState, useAppDispatch } from "../../redux/store";
import { ICartItem } from "../../redux/slices/cartSlice";
import SkeletonOrder from "../../components/SkeletonOrder";

export type IUserPosts = {
  _id: string;
  viewsCount: number;
  user: TUser;
  products: ICartItem[];
  status: number;
  createdAt: string;
  updatedAt: string;
};

export type TPostsAdmin = {
  total: number;
  items: IUserPosts[];
};

const ProductsPanel: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const activeOrder = useSelector(
    (state: RootState) => state.filter.activeOrder
  );
  const { items, total, status } = useSelector(
    (state: RootState) => state.list.posts
  );
  const { _id } = useParams();
  const delivery = activeOrder == 0 ? "" : _id;
  const dispatch = useAppDispatch();

  const totalTrue = Boolean(total > items.length);

  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: true,
  });

  React.useEffect(() => {
    dispatch(setPosts());
    setCurrentPage(1);
  }, [activeOrder]);

  const logicFetchBurgers = async () => {
    dispatch(
      fetchAdminPosts({
        delivery,
        currentPage,
      })
    );
  };

  React.useEffect(() => {
    if (inView && totalTrue) {
      logicFetchBurgers();
      setCurrentPage((prevState) => prevState + 1);
    }
  }, [inView, totalTrue, activeOrder]);

  const onClickCategory = (i: number) => {
    dispatch(setActiveOrder(i));
  };

  // const ordersData = items.map((item) => (
  //   <ProductsPanelItem key={item._id} {...item} />
  // ));

  const skeletonData = [...new Array(8)].map((_, index) => (
    <SkeletonOrder key={index} />
  ));

  return (
    <>
      <div className="container container--cart">
        <div className="cart">
          <>
            <div className="cart__top">
              <OrderList
                activeOrder={activeOrder}
                setActiveOrder={onClickCategory}
              />
            </div>
            <div className="content__items">
              {items.map((item, index) => (
                <ProductsPanelItem key={item._id} {...item} />
              ))}
              {status !== "success" && skeletonData}
            </div>
            <div ref={ref}></div>

            <div className="cart__bottom"></div>
          </>
        </div>
      </div>
    </>
  );
};

export default ProductsPanel;
