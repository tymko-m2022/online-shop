export interface CartItem {
    slug: string;
    name: string;
    price: number;
    quantity: number;
    img: string;
    exchangePrice: number;
}

export const DEFAULT_CART_ITEM: CartItem = {
    slug: "",
    name: "",
    price: 0,
    quantity: 0,
    img: "",
    exchangePrice: 0,
};