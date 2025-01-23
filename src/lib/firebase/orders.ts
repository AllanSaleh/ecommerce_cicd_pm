import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Order } from "../../types/types";
const COLLECTION_NAME = "orders";
const ordersRef = collection(db, COLLECTION_NAME);

export const createOrder = async (order: Order) => {
  const docRef = await addDoc(ordersRef, order);
  return docRef.id;
};

export const getOrders = async (userId: string) => {
  const snapshot = await getDocs(
    query(ordersRef, where("userId", "==", userId))
  );
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Order[];
};

export const deleteOrder = async (orderId: string) => {
  await deleteDoc(doc(ordersRef, orderId));
};

export const getOrder = async (orderId: string) => {
  const docRef = doc(ordersRef, orderId);
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() } as Order;
};
