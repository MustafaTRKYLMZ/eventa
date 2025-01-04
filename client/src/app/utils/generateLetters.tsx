import { DraggableItem } from "../components/types";

export const generateLetters = (newItems: DraggableItem[]) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const usedLetters = newItems
    .filter((item) => item?.type === "row" && item.name.includes("("))
    .map((item) => {
      const match = item.name.match(/\((.*?)\)/);
      return match ? match[1] : null;
    })
    .filter(Boolean);

  const generateNextLetter = () => {
    const allLetters = [];

    for (const letter of alphabet) {
      allLetters.push(letter);
    }

    for (const first of alphabet) {
      for (const second of alphabet) {
        allLetters.push(`${first}${second}`);
      }
    }

    for (const letter of allLetters) {
      if (!usedLetters.includes(letter)) {
        return letter;
      }
    }

    return "";
  };

  const updatedItems = newItems.map((item) => {
    if (item?.type === "row") {
      if (!item.name.includes("(")) {
        const newName = `(${generateNextLetter()})`;
        return { ...item, name: newName };
      }
    }
    return item;
  });

  return updatedItems;
};
