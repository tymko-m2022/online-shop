export interface CartItem {
    slug: string;
    name: string;
    desc: string;
    price: number;
    quantity: number;
    img: string;
}

export const DEFAULT_CART_ITEM: CartItem = {
    slug: "",
    name: "",
    desc: "",
    price: 0,
    quantity: 0,
    img: ""
};