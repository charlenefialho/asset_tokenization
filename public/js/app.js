export class User {
    constructor(id, nameUser, balance, tokens) {
        this.id = id;
        this.nameUser = nameUser;
        this.balance = balance;
        this.tokens = tokens;
    }
}
export function showTransactionReport(user, purchasedTokens) {
    alert(`Relatório de transação:\n 
  Nome do usuário: ${user.nameUser}\n
  Saldo restante: R$${user.balance.toFixed(2)}\n
  `);
    purchasedTokens.tokens.forEach((token) => {
        alert(`Tokens comprados:  \n
    ${token.nameToken}: quantidade: ${purchasedTokens.tokens.length}, \nValor R$${token.value.toFixed(2)}`);
    });
}
