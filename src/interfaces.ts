export interface Token {
    id: number;
    nameToken:string
    value: number;
    quantity: number;
  }
  
  export interface User {
    name: string;
    balance: number;
    tokens: Token[];
  }
  
 export interface TokenMarket {
    tokens: Token[];
  }