import axios from "axios";
import { Product } from "../types/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase/firebase";

const apiClient = axios.create({
    baseURL: 'https://fakestoreapi.com'
})

const COLLECTION_NAME = "products";
const productsRef = collection(db, COLLECTION_NAME);

export const fetchProducts = async () => {
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Product[];
}
export const fetchCategories = async () => {
    const products = await fetchProducts();
    return products.map((product: Product) => product.category);
}
export const fetchCategoriesProducts = (category: string) => apiClient.get(`/products/category/${category}`)