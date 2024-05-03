import React from "react";

type TOrderListProps = {
  activeOrder: number;
  setActiveOrder: (arg: number) => void;
};

const OrderList: React.FC<TOrderListProps> = ({
  activeOrder,
  setActiveOrder,
}) => {
  const catList = ["Заказы от клиентов", "Мои заказы"];
  const onClickOrder = (index: number) => {
    setActiveOrder(index);
  };

  return (
    <div className="categories">
      <ul>
        {catList.map((value, index) => (
          <li
            key={index}
            onClick={() => onClickOrder(index)}
            className={activeOrder == index ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
