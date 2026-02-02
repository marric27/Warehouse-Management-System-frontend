import { Category } from "../../common/category.enum";

export interface Product {
    id: number;
    name: string;
    code: string;
    category: Category;
}