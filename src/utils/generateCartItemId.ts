export const generateCartItemId = (
  pizzaId: string,
  selectedTypeId: number,
  selectedSizeId: number
): string => {
  return `${pizzaId}t${selectedTypeId}s${selectedSizeId}`;
};
