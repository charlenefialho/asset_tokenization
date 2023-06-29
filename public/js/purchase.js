var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const buyButton = document.querySelector('.buyButton');
const divTokenList = document.querySelector('#tokenList');
buyButton.addEventListener("click", buyToken);
window.addEventListener('load', showAvailableTokens);
function buyToken() {
    let answer;
    answer = confirm("Deseja comprar mais tokens?");
}
function getTokenList() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch('http://localhost:3000/tokens')
            .then(Response => Response.json());
    });
}
export function showAvailableTokens() {
    getTokenList().then((tokenList) => {
        for (let i in tokenList) {
            divTokenList.innerHTML += `<div class="card">
          <h2>${tokenList[i].nameToken}</h2>
          <p>Valor: R$${tokenList[i].value.toFixed(2)}</p>
          <p>Quantidade disponível: ${tokenList[i].quantity}</p>
          <button class="buyButton">Comprar</button>
        </div>`;
        }
    });
}
