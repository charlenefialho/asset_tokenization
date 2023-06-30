import { Token } from './interfaces';
import { TokenMarket } from './interfaces';

export class User {
  id: number
  nameUser: string;
  balance: number;
  tokens: Token[];

  constructor(id: number,nameUser: string,balance:number,tokens:Token[]){
      this.id = id;
      this.nameUser = nameUser;
      this.balance = balance;
      this.tokens = tokens;
  }
}
  
  
 
  
 export function showTransactionReport(user: User): void {
    console.log('Relatório de transação:');
    console.log(`Nome do usuário: ${user.nameUser}`);
    console.log(`Saldo restante: R$${user.balance}`);
    console.log('Tokens comprados:');
    user.tokens.forEach((token, index) => {
      console.log(`${token.nameToken}: quantidade: ${token.quantity}, Valor R$${token.value}`);
    });
  }

    


