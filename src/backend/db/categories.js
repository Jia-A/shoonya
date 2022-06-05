import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Galaxy",
  },
  {
    _id: uuid(),
    categoryName: "Planet",
  },
  {
    _id: uuid(),
    categoryName: "Nebula",
  },
  {
    _id: uuid(),
    categoryName: "Black Matter",
  },
  {
    _id: uuid(),
    categoryName: "Star",
  },
];
