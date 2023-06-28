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
        console.log('Saldo insuficiente ou quantidade de tokens indisponível para comprar em lote.');
    }
}
export function showTransactionReport(user) {
    console.log('Relatório de transação:');
    console.log(`Nome do usuário: ${user.name}`);
    console.log(`Saldo restante: R$${user.balance}`);
    console.log('Tokens comprados:');
    user.tokens.forEach((token, index) => {
        console.log(`Token ${index + 1}: ID ${token.id}, Valor R$${token.value}`);
    });
}
export function createToken(tokenMarket) {
    const id = Math.floor(Math.random() * 100);
    const nameToken = Math.random().toString(36).substring(7);
    const value = Math.random() * (10 - 0.01) + 0.01;
    const quantity = Math.floor(Math.random() * 100) + 1;
    const token = { id, nameToken, value, quantity };
    tokenMarket.tokens.push(token);
    return token;
}
export function modifyTokenValue(token) {
    const randomFactor = Math.random() * (1.2 - 0.8) + 0.8; // Valor entre 0.8 e 1.2
    const newValue = token.value * randomFactor;
    token.value = newValue;
}
/*const tokens: Token[] = []; // Mercado de tokens vazio

// Criar alguns tokens no mercado
const token1: Token = { id: 123, nameToken:'token1',value: 10.5, quantity: 20 };
const token2: Token = { id: 30, nameToken:'token1',value: 8.2, quantity: 15 };
const token3: Token = { id: 20, nameToken:'token1',value: 5.9, quantity: 10 };

tokens.push(token1, token2, token3);

let tokenMarket: TokenMarket ={
  tokens: tokens
};


// Criar um usuário
const user: User = {
  name: 'João',
  balance: 100,
  tokens: []
};

// Comprar um token
buyToken(user, token1);

// Mostrar relatório de transação
showTransactionReport(user);

// Modificar o valor dos tokens no mercado
modifyTokenValue(token1);
modifyTokenValue(token2);
modifyTokenValue(token3);

// Mostrar os tokens disponíveis no mercado
showAvailableTokens(tokenMarket);*/
