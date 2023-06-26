"use strict";
class User {
    constructor(name, balanceInReais, purchasedTokens) {
        this.name = name;
        this.balanceInReais = balanceInReais;
        this.purchasedTokens = purchasedTokens;
    }
}
class Token {
    constructor(id, realValue, availableQuantity) {
        this.id = id;
        this.realValue = realValue;
        this.availableQuantity = availableQuantity;
    }
}
