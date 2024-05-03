import React from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useParams } from "react-router-dom";
import FullPizzaBlock from "../components/FullPizzaBlock";
import { IProdItem } from "../redux/slices/listSlice";
import Skeleton from "../components/BurgerBlock/Skeleton";

const FullBurger: React.FC = () => {
  const [data, setData] = React.useState<IProdItem>();
  const { _id } = useParams();
  React.useEffect(() => {
    async function fetchBurger() {
      try {
        const { data } = await axios.get<IProdItem>(`/products/${_id}`);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.warn(error);
        alert("Error product");
      }
    }
    fetchBurger();
  }, []);

  const [isLoading, setIsLoading] = React.useState(true);

  if (!data || isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="container">
      <div className="content__items">
        {isLoading ? (
          <>Загрузка...</>
        ) : (
          <FullPizzaBlock
            title={data.title}
            price={data.price}
            imageUrl={data.imageUrl}
            _id={data._id}
            sizeList={data.sizeList}
            typeListId={data.typeListId}
          />
        )}
      </div>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullBurger;
