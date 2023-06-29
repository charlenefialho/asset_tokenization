import * as module from './app';
import { Token } from './interfaces';
import { TokenMarket } from './interfaces';

const buyButton = document.querySelector('.buyButton') as HTMLButtonElement;

const divTokenList = document.querySelector('#tokenList') as HTMLElement;

buyButton.addEventListener("click", buyToken);

//Erro de evento click quando tem o load
window.addEventListener('load',showAvailableTokens); 


function buyToken() {
      let answer : boolean;
      answer= confirm("Deseja comprar mais tokens?");
  }

async function getTokenList() {
    return await fetch('http://localhost:3000/tokens')
    .then(Response => Response.json())
}

  export function showAvailableTokens(): void {
   
    getTokenList().then((tokenList: any[])=>{
      for(let i in tokenList){
        divTokenList.innerHTML += `<div class="card">
          <h2>${tokenList[i].nameToken}</h2>
          <p>Valor: R$${tokenList[i].value.toFixed(2)}</p>
          <p>Quantidade disponível: ${tokenList[i].quantity}</p>
          <button class="buyButton">Comprar</button>
        </div>`;
      }
    })
}


