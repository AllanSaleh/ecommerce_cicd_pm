export interface Product {
    id?: string;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    quantity?: number; // optional for managing quantity in cart
    createdAt: Date;
    updatedAt: Date;
}

export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProductInput = Partial<CreateProductInput>;

export type CartItem = Product & { quantity: number };


export type Order = {
    id?: string;
    userId: string;
    products: CartItem[];
    total: number;
    createdAt: Date;
    updatedAt: Date;
}