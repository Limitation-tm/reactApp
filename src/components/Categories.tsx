import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../redux/slices/filterSlice";

type CategoriesProps = {
  activeCat: number;
  setActiveCat: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ activeCat, setActiveCat }) => {
  const catList = [
    "All",
    "Burgers",
    "Limonades",
    "Snacks",
    "Ice Cream",
    "Roles",
  ];
  const dispatch = useDispatch();
  const onClickCat = (index: number) => {
    setActiveCat(index);
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="categories">
      <ul>
        {catList.map((value, index) => (
          <li
            key={index}
            onClick={() => onClickCat(index)}
            className={activeCat == index ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
