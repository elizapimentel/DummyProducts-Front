export interface Product {

      id: number;
      title: string,
      description: string;
      discountPercentage: number;
      rating: number;
      stock: number;
      brand: string;
      category: string;
      thumbnail: string;
      price: any;
      images: Image[];
}
export interface Image {
    description: string;
    url: string;
}


/*
Se com a interface n funcionar, tentar com a classe
let arr: number[] = [];
let arr: Array<number> = [];

https://oieduardorabelo.medium.com/typescript-entendendo-a-nota%C3%A7%C3%A3o-de-tipos-9e8c1c89ef62
*/
