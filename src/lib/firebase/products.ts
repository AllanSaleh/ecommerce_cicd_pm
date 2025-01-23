import { db } from "./firebase";
import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    QuerySnapshot,
    DocumentData,
} from "firebase/firestore";
import {
    Product,
    CreateProductInput,
    UpdateProductInput,
} from "../../types/types";

const COLLECTION_NAME = "products";
const productsRef = collection(db, COLLECTION_NAME);

export const getProducts = async (): Promise<Product[]> => {
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Product[];
};

export const createProduct = async (
    product: CreateProductInput
): Promise<Product> => {
    const docRef = await addDoc(productsRef, {
        ...product,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return {
        id: docRef.id,
        ...product,
    };
};

export const updateProduct = async (
    id: string,
    product: UpdateProductInput
): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
        ...product,
        updatedAt: serverTimestamp(),
    });
};

export const deleteProduct = async (id: string): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
};
