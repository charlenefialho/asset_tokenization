import { Token } from './interfaces';
import { TokenMarket } from './interfaces';

export class User {
  nameUser: string;
  balance: number;
  tokens: Token[];

  constructor(nameUser: string,balance:number,tokens:Token[]){
      this.nameUser = nameUser;
      this.balance = balance;
      this.tokens = tokens;
  }
}

export function buyToken(user: User, token: Token): void {
    if (user.balance >= token.value) {
      user.tokens.push(token);
      user.balance -= token.value;
      token.quantity -= 1;
    } else {
      alert('Saldo insuficiente para comprar o token.');
    }
  }

  
  
 export function buyTokenBatch(user: User, token: Token, quantity: number, discount: number): void {
    const totalPrice = token.value * quantity * (1 - discount);
    if (user.balance >= totalPrice && token.quantity >= quantity) {
      for (let i = 0; i < quantity; i++) {
        user.tokens.push(token);
      }
      user.balance -= totalPrice;
      token.quantity -= quantity;
    } else {
      alert('Saldo insuficiente ou quantidade de tokens indisponível para comprar em lote.');
    }
  } 
  
 export function showTransactionReport(user: User): void {
    console.log('Relatório de transação:');
    console.log(`Nome do usuário: ${user.nameUser}`);
    console.log(`Saldo restante: R$${user.balance}`);
    console.log('Tokens comprados:');
    user.tokens.forEach((token, index) => {
      console.log(`Token ${index + 1}: ID ${token.id}, Valor R$${token.value}`);
    });
  }
  
 
  
export function modifyTokenValue(token: Token): void {
    const randomFactor = Math.random() * (1.2 - 0.8) + 0.8; // Valor entre 0.8 e 1.2
    const newValue = token.value * randomFactor;
    token.value = newValue;
  }
  

