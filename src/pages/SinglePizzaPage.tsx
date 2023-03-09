import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../redux/store";
import { fetchPizzaById } from "../features/pizzaItem/fetchPizzaItem";
import { selectPizza } from "../features/pizzaItem/selectors";
import { Status } from "../features/pizzaList/types";
import { GoBackButton } from "../UI/GoBackButton";

const typeNames = ["traditional", "thin"];

const SinglePizzaPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { pizzaData, status } = useSelector(selectPizza);

  useEffect(() => {
    id && dispatch(fetchPizzaById(id));
  }, [id]);

  if (status === Status.PENDING) {
    return <div>{Status.PENDING}</div>;
  }

  if (status === Status.REJECTED) {
    return <div>{Status.REJECTED}</div>;
  }

  return (
    pizzaData && (
      <div className="container container--full-pizza">
        <div className="content__full-pizza">
          <section className="full-pizza-block">
            <img
              className="full-pizza-block__image"
              src={pizzaData.imageUrl}
              alt={pizzaData.title}
            />
            <h4 className="full-pizza-block__title">{pizzaData.title}</h4>
            <p className="full-pizza-block__ingridients">
              <h4>Ingridients:</h4>
              <ul>
                {pizzaData.ingridients?.map((ingridient, index) => (
                  <li key={index}>{ingridient}</li>
                ))}
              </ul>
            </p>
            <p className="full-pizza-block__dough">
              <h4> Available types of pizza dough:</h4>
              {pizzaData.types.map((type) => (
                <span key={type}>{typeNames[type]}</span>
              ))}
            </p>
            <p className="full-pizza-block__sizes">
              <h4>Available sizes:</h4>
              {pizzaData.sizes.map((size) => (
                <span key={size}>{size} cm.</span>
              ))}
            </p>
          </section>
        </div>
        <div className="full-pizza-block__bottom">
          <GoBackButton onClick={() => navigate(-1)}>Go Back</GoBackButton>
        </div>
      </div>
    )
  );
};

export default SinglePizzaPage;
