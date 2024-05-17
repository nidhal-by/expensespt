export interface Category {
  id: string;
  _id: string;
  name: string;
  color: string;
  icon: string;
  default: boolean,
  user: string
}

export interface Categories {
  categories: Category[];
}