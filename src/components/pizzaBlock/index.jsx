import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { addItem } from "../../redux/slices/cartSlice";
import {
  createCartItemId,
  selectCartItemsByPizzaId,
  pricingRates,
  typeNames,
} from "../../redux/slices/cartSlice";

export default function PizzaBlock({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) {
  const dispatch = useDispatch();
  const [activeTypeId, setActiveTypeId] = useState(0);
  const [activeSizeId, setActiveSizeId] = useState(0);
  const [calculatedPrice, setCalculatedPrice] = useState(price);

  const cartItemId = createCartItemId(id, activeTypeId, activeSizeId);
  const cartItemsByPizzaId = useSelector(selectCartItemsByPizzaId(id));

  useEffect(() => {
    const newPrice = Math.ceil(
      price *
        pricingRates.typeRates[activeTypeId] *
        pricingRates.sizeRates[activeSizeId]
    );
    setCalculatedPrice(newPrice);
  }, [activeTypeId, activeSizeId]);

  const addItemToCart = () => {
    const cartItem = {
      pizzaId: id,
      cartItemId: cartItemId,
      title,
      calculatedPrice,
      type: typeNames[activeTypeId],
      size: sizes[activeSizeId],
    };
    dispatch(addItem(cartItem));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt={title} />
      <Link to={`pizza/${id}`}>
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              key={typeId}
              className={typeId === activeTypeId ? "active" : ""}
              onClick={() => setActiveTypeId(typeId)}
            >
              {typeNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={size}
              className={index === activeSizeId ? "active" : ""}
              onClick={() => setActiveSizeId(index)}
            >
              {size} cm.
            </li>
          ))}
        </ul>
      </div>

      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{calculatedPrice} $</div>
        <button
          onClick={addItemToCart}
          className="button button--outline button--add"
          title="Add to cart"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add to cart</span>
          {cartItemsByPizzaId ? (
            <i>
              {cartItemsByPizzaId.reduce((sum, item) => sum + item.count, 0)}
            </i>
          ) : null}
        </button>
      </div>
    </div>
  );
}
