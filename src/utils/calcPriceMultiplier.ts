import {
  PriceReference,
  PriceFactorMultiplier,
} from "../components/pizzaBlock";

export const calcPriceMultiplier = (
  activeTypeId: number,
  activeSizeId: number,
  priceReferenceTable: PriceReference
) => {
  const typeMultiplier =
    priceReferenceTable.type.find(
      (item: PriceFactorMultiplier) => item.typeId === activeTypeId
    )?.multiplier || 1;
  const sizeMultiplier =
    priceReferenceTable.size.find(
      (item: PriceFactorMultiplier) => item.sizeId === activeSizeId
    )?.multiplier || 1;

  return typeMultiplier * sizeMultiplier;
};
