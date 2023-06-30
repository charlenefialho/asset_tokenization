export class User {
    constructor(id, nameUser, balance, tokens) {
        this.id = id;
        this.nameUser = nameUser;
        this.balance = balance;
        this.tokens = tokens;
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
