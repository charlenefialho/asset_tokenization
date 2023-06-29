import { Token } from './interfaces';
import { TokenMarket } from './interfaces';
const buyButton = document.querySelector('.buyButton') as HTMLButtonElement;
const divTokenList = document.querySelector('#tokenList') as HTMLElement;

buyButton.addEventListener("click", buyToken);
setIntervalAddNewToken();

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


export function createToken(): Token {
  const id = Math.floor(Math.random() * 100);
  const nameToken = Math.random().toString(36).substring(7);
  const value = Math.random() * (10 - 0.01) + 0.01;
  const quantity = Math.floor(Math.random() * 100) + 1;

  const token: Token = { id, nameToken, value, quantity };
  return token;
}

function setIntervalAddNewToken(){
  setInterval(makeRequestToAddNewToken, 60000);
}

export async function makeRequestToAddNewToken(){
  const data = createToken();
  await fetch('http://localhost:3000/tokens',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Dados enviados com sucesso:', result);
  })
  .catch(error => {
    console.error('Erro ao enviar os dados:', error);
  });

  
}


