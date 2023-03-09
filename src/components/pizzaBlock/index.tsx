import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { addItem } from "../../features/cart/cartSlice";
import { CartItem } from "../../features/cart/types";
import { selectCartItemsByPizzaId } from "../../features/cart/selectors";
import { generateCartItemId } from "../../utils/generateCartItemId";
import { calcPriceMultiplier } from "../../utils/calcPriceMultiplier";

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

type PriceFactor = "type" | "size";

export type PriceFactorMultiplier = {
  [key: string]: number;
  multiplier: number;
};

export type PriceReference = Record<PriceFactor, PriceFactorMultiplier[]>;

const priceReferenceTable: PriceReference = {
  type: [
    { typeId: 0, multiplier: 1 },
    { typeId: 1, multiplier: 1.1 },
  ],
  size: [
    { sizeId: 0, multiplier: 1 },
    { sizeId: 1, multiplier: 1.3 },
    { sizeId: 2, multiplier: 1.8 },
  ],
};

const typeNames = ["traditional", "thin"];

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();
  const [activeTypeId, setActiveTypeId] = useState<number>(0);
  const [activeSizeId, setActiveSizeId] = useState<number>(0);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(price);

  const cartItemId = generateCartItemId(id, activeTypeId, activeSizeId);
  const cartItemsByPizzaId = useSelector(selectCartItemsByPizzaId(id));

  useEffect(() => {
    const calculatedPrice = Math.ceil(
      price *
        calcPriceMultiplier(activeTypeId, activeSizeId, priceReferenceTable)
    );
    setCalculatedPrice(calculatedPrice);
  }, [activeTypeId, activeSizeId]);

  const addItemToCart = () => {
    const cartItem: CartItem = {
      pizzaId: id,
      cartItemId: cartItemId,
      title,
      calculatedPrice,
      imageUrl,
      type: typeNames[activeTypeId],
      size: sizes[activeSizeId],
      count: 0,
    };

    dispatch(addItem(cartItem));
  };

  return (
    <div className="pizza-block">
      <Link to={`pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt={title} />
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
              {cartItemsByPizzaId.reduce(
                (sum: number, item: any) => sum + item.count,
                0
              )}
            </i>
          ) : null}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
