class User {
    name: string;
    balanceInReais: number;
    purchasedTokens: number;
    constructor(name: string, balanceInReais: number, purchasedTokens: number) {
        this.name = name;
        this.balanceInReais = balanceInReais;
        this.purchasedTokens = purchasedTokens;
      }
}

class Token {
    id: number;
    realValue:number;
    availableQuantity:number;

    constructor(id:number,realValue:number,availableQuantity:number){
        this.id = id;
        this.realValue = realValue;
        this.availableQuantity = availableQuantity;
    }    
    
    
}
