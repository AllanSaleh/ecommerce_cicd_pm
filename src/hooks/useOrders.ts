import { useMutation, useQuery, useQueryClient } from "react-query"
import { createOrder, deleteOrder, getOrders, getOrder } from "../lib/firebase/orders"
import { Order } from "../types/types"

export const useOrders = (userId: string) => {
    return useQuery("orders", () => getOrders(userId))
}

export const useCreateOrder = () => {
    const queryClient = useQueryClient()
    return useMutation((order: Order) => createOrder(order), {
        onSuccess: () => {
            queryClient.invalidateQueries("orders")
        }
    })
}

export const useGetOrder = (orderId: string) => {
    return useQuery("order", () => getOrder(orderId))
}

export const useDeleteOrder = () => {
    const queryClient = useQueryClient()
    return useMutation((orderId: string) => deleteOrder(orderId), {
        onSuccess: () => {
            queryClient.invalidateQueries("orders")
        }
    })
}