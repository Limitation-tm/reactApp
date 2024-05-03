import React, { ChangeEvent } from "react";
import axios from "../../axios";
import { useParams, useNavigate } from "react-router-dom";

const NewProduct: React.FC = () => {
  const { _id } = useParams();
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [typeListIdSt, setTypeListIdSt] = React.useState<string | string[]>("");
  const [sizeListSt, setSizeListSt] = React.useState<string | string[]>("");
  console.log(title);
  React.useEffect(() => {
    if (_id) {
      axios.get(`/products/${_id}`).then(({ data }) => {
        setTitle(data.title);
        setPrice(data.price);
        setImageUrl(data.imageUrl);
        setTypeListIdSt(data.typeListId);
        setSizeListSt(data.sizeList);
        setCategory(data.category);
      });
    }
  }, []);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const isEditing = Boolean(_id);
  const typeListId = (
    typeof typeListIdSt === "string" ? typeListIdSt : typeListIdSt.toString()
  ).split(",");
  const sizeList = (
    typeof sizeListSt === "string" ? sizeListSt : sizeListSt.toString()
  ).split(",");
  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        price,
        typeListId,
        sizeList,
        imageUrl,
        category,
      };
      const { data } = isEditing
        ? await axios.patch(`/products/${_id}`, fields)
        : await axios.post("/products", fields);
      const id = isEditing ? _id : data._id;
      navigate(`/`);
      // navigate(`/product/${id}`);
    } catch (error) {
      console.warn(error);
    }
  };
  const onClickDeleteProd = async () => {
    try {
      await axios.delete(`/products/${_id}`);
      navigate("/");
    } catch (error) {
      console.warn(error);
    }
  };

  const onSubmitCopy = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        price,
        typeListId,
        sizeList,
        imageUrl,
        category,
      };
      const { data } = await axios.post("/products", fields);
      const id = isEditing ? _id : data._id;
      navigate(`/product/${id}`);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await axios.post<{ url: string }>("/upload", formData);
        setImageUrl(data.url);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2></h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        required
      />
      <h4>
        <div className="content__items">
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(e.target.value)
            }
            required
          />
        </div>
        <div className="content__items">
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCategory(e.target.value)
            }
            required
          />
        </div>
      </h4>
      {imageUrl && (
        <img
          className="pizza-block__image"
          src={`http://localhost:4444${imageUrl}`}
          alt="Pizza"
        />
      )}
      <input
        type="file"
        placeholder="ImageUrl"
        onChange={handleChangeFile}
        required
      />
      <div className="content__items">
        <input
          type="text"
          placeholder="TypeListId"
          value={typeListId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTypeListIdSt(e.target.value)
          }
          required
        />
      </div>
      <div className="content__items">
        <input
          type="text"
          placeholder="SizeList"
          value={sizeList}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSizeListSt(e.target.value)
          }
          required
        />
      </div>
      <button
        onClick={onClickDeleteProd}
        className="button button--outline button--add"
      >
        <span>Удалить продукт</span>
      </button>
      <button onClick={onSubmit} className="button button--outline button--add">
        <span>Отправить</span>
      </button>
      <button
        onClick={onSubmitCopy}
        className="button button--outline button--add"
      >
        <span>Создать копию</span>
      </button>
    </div>
  );
};

export default NewProduct;
