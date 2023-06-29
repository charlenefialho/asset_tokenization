export class User {
    constructor(nameUser, balance, tokens) {
        this.nameUser = nameUser;
        this.balance = balance;
        this.tokens = tokens;
    }
}
export function buyToken(user, token) {
    if (user.balance >= token.value) {
        user.tokens.push(token);
        user.balance -= token.value;
        token.quantity -= 1;
    }
    else {
        alert('Saldo insuficiente para comprar o token.');
    }
}
export function buyTokenBatch(user, token, quantity, discount) {
    const totalPrice = token.value * quantity * (1 - discount);
    if (user.balance >= totalPrice && token.quantity >= quantity) {
        for (let i = 0; i < quantity; i++) {
            user.tokens.push(token);
        }
        user.balance -= totalPrice;
        token.quantity -= quantity;
    }
    else {
        alert('Saldo insuficiente ou quantidade de tokens indisponível para comprar em lote.');
    }
}
export function showTransactionReport(user) {
    console.log('Relatório de transação:');
    console.log(`Nome do usuário: ${user.nameUser}`);
    console.log(`Saldo restante: R$${user.balance}`);
    console.log('Tokens comprados:');
    user.tokens.forEach((token, index) => {
        console.log(`${token.nameToken}: quantidade: ${token.quantity}, Valor R$${token.value}`);
    });
}
export function modifyTokenValue(token) {
    const randomFactor = Math.random() * (1.2 - 0.8) + 0.8; // Valor entre 0.8 e 1.2
    const newValue = token.value * randomFactor;
    token.value = newValue;
}
