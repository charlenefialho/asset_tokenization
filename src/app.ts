import { Token, TokenMarket } from "./interfaces";

export class User {
  id: number;
  nameUser: string;
  balance: number;
  tokens: Token[];

  constructor(id: number, nameUser: string, balance: number, tokens: Token[]) {
    this.id = id;
    this.nameUser = nameUser;
    this.balance = balance;
    this.tokens = tokens;
  }
}

export function showTransactionReport(
  user: User,
  purchasedTokens: TokenMarket
) {
  alert(`Relatório de transação:\n 
  Nome do usuário: ${user.nameUser}\n
  Saldo restante: R$${user.balance.toFixed(2)}\n
  `);

  purchasedTokens.tokens.forEach((token) => {
    alert(`Tokens comprados:  \n
    ${token.nameToken}: quantidade: ${
      purchasedTokens.tokens.length
    }, \nValor R$${token.value.toFixed(2)}`);
  });
}
