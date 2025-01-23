import { useQuery, useMutation, useQueryClient } from "react-query";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../lib/firebase/products";
import { CreateProductInput, UpdateProductInput } from "../types/types";

export const useProducts = () => {
    const queryClient = useQueryClient();

    const { data: products, isLoading } = useQuery("products", getProducts);

    console.log("products: ", products);

    const createMutation = useMutation(
        (newProduct: CreateProductInput) => createProduct(newProduct),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("products");
            },
        }
    );

    const updateMutation = useMutation(
        ({ id, product }: { id: string; product: UpdateProductInput }) =>
            updateProduct(id, product),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("products");
            },
        }
    );

    const deleteMutation = useMutation((id: string) => deleteProduct(id), {
        onSuccess: () => {
            queryClient.invalidateQueries("products");
        },
    });

    return {
        products,
        isLoading,
        createProduct: createMutation.mutateAsync,
        updateProduct: updateMutation.mutateAsync,
        deleteProduct: deleteMutation.mutateAsync,
        isCreating: createMutation.isLoading,
        isUpdating: updateMutation.isLoading,
        isDeleting: deleteMutation.isLoading,
    };
};
