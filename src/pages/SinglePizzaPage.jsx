import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const typeNames = ["traditional", "thin"];

export default function SinglePizzaPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pizzaDataById, setPizzaDataById] = useState();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://63f517193f99f5855dbd4193.mockapi.io/items/${id}`
        );
        setPizzaDataById(data);
      } catch (error) {
        alert("Error occured while trying to get pizza info");
        navigate(-1);
      }
    };

    fetchPizza();
  }, [id]);

  if (!pizzaDataById) return <div>Loading data...</div>;

  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={pizzaDataById.imageUrl}
        alt={pizzaDataById.title}
      />
      <h4 className="pizza-block__title">{pizzaDataById.title}</h4>
      <p>
        Ingridients:
        {pizzaDataById.ingridients.map((ingridient, index) => (
          <span key={index}>{ingridient}</span>
        ))}
      </p>
      <p>
        This pizza is available with different dough types:
        {pizzaDataById.types.map((type) => (
          <span key={type}>{typeNames[type]}</span>
        ))}
      </p>
      <p>
        This pizza is available in different sizes:
        {pizzaDataById.sizes.map((size) => (
          <span key={size}>{size} cm.</span>
        ))}
      </p>
      <button
        onClick={() => navigate(-1)}
        className="button button--outline button--add go-back-btn"
      >
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 13L1 6.93015L6.86175 1"
            stroke="#D3D3D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Go back</span>
      </button>
    </div>
  );
}
