export interface Lot {
    slug: string;
    name: string;
    desc: string;
    price: number;
    img: string;
    exchangePrice: number;
    [key: string]: any;
}

export class DEFAULT_LOT {
    slug: string;
    name: string;
    desc: string;
    price: number;
    img: string;
    exchangePrice: number;

    constructor() {
        this.slug = "";
        this.name = "";
        this.desc = "";
        this.price = 0;
        this.img = "";
        this.exchangePrice = 0;
    }

};
