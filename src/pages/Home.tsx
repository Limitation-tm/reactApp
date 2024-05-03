import React from "react";
import { useSelector } from "react-redux";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import BurgerBlock from "../components/BurgerBlock";
import Skeleton from "../components/BurgerBlock/Skeleton";
import { setActiveCat, setCurrentPage } from "../redux/slices/filterSlice";
import { fetchBurgers } from "../redux/slices/listSlice";
import PageEmpty from "../components/PageEmpty";
import { Pagination } from "../components/Pagination";
import Search from "../components/Search";
import { RootState, useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeCat, sortChoose, currentPage, searchData } = useSelector(
    (state: RootState) => state.filter
  );
  const { items, total, status } = useSelector(
    (state: RootState) => state.list.products
  );

  const [orderProp, setOrderProp] = React.useState(false);
  const sortProp = sortChoose.prop;

  const burgersData = items.map((obj) => (
    <BurgerBlock key={obj._id} {...obj} />
  ));
  const skeletonData = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const logicFetchBurgers = async () => {
    const categoryProp = activeCat > 0 ? `&category=${activeCat}` : "";
    const searchProp = searchData ? `&search=${searchData}` : "";
    dispatch(
      fetchBurgers({
        categoryProp,
        searchProp,
        orderProp,
        sortProp,
        currentPage,
      })
    );
  };

  React.useEffect(() => {
    logicFetchBurgers();
  }, [sortProp, activeCat, orderProp, searchData, currentPage]);

  const onClickCategory = React.useCallback((i: number) => {
    dispatch(setActiveCat(i));
  }, []);

  const onClickRefresh = () => {
    logicFetchBurgers();
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo(0, 0);
  };

  const roundPage = total / 12;

  const pageTotal = Math.ceil(roundPage);

  return (
    <>
      <div className="content__top">
        <Categories activeCat={activeCat} setActiveCat={onClickCategory} />
        <Search />
        <Sort orderProp={orderProp} setOrderProp={setOrderProp} />
      </div>
      <h2 className="content__title">All Products</h2>
      <div className="content__items">
        {status == "error" ? (
          <PageEmpty onClickRefresh={onClickRefresh} />
        ) : (
          <>{status == "loading" ? skeletonData : burgersData}</>
        )}
      </div>
      {pageTotal > 1 && (
        <Pagination
          pageTotal={pageTotal}
          currentPage={currentPage}
          onChangePage={onChangePage}
        />
      )}
    </>
  );
};

export default Home;
