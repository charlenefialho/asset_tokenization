export interface Token {
    id: number;
    name:string
    value: number;
    quantity: number;
  }
  
  export interface User {
    id:number;
    name: string;
    balance: number;
    tokens: Token[];
  }
  
 export interface TokenMarket {
    tokens: Token[];
  }