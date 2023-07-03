var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const divTokenList = document.querySelector('#tokenCards');
document.addEventListener('DOMContentLoaded', () => {
    getTokenList();
    showAvailableTokens();
    setIntervalAddNewToken();
});
setIntervalAddNewToken();
export function createToken() {
    const id = Math.floor(Math.random() * 100);
    const nameToken = Math.random().toString(36).substring(7);
    const value = Math.random() * (10 - 0.01) + 0.01;
    const quantity = Math.floor(Math.random() * 100) + 1;
    const token = { id, nameToken, value, quantity };
    return token;
}
export function AddNewToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const token = createToken();
        yield fetch('http://localhost:3000/tokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(token)
        })
            .then(response => response.json())
            .then(result => {
            console.log('Dados enviados com sucesso:', result);
        })
            .catch(error => {
            console.error('Erro ao enviar os dados:', error);
        });
    });
}
function setIntervalAddNewToken() {
    return __awaiter(this, void 0, void 0, function* () {
        yield setInterval(AddNewToken, 60000);
    });
}
export function getTokenList() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/tokens');
            if (!response.ok) {
                throw new Error("Ocorreu um erro na requisição GET.");
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            alert(error);
            throw error;
        }
    });
}
export function showAvailableTokens() {
    return __awaiter(this, void 0, void 0, function* () {
        yield getTokenList().then((tokenList) => {
            for (let i in tokenList) {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
          <h2>${tokenList[i].nameToken}</h2>
          <p>Valor: R$${tokenList[i].value.toFixed(2)}</p>
          <p>Quantidade disponível: ${tokenList[i].quantity}</p>
          <button class="buyButton" id="${tokenList[i].id}">Comprar</button>
        `;
                divTokenList.appendChild(card);
                const buyButton = card.querySelector('.buyButton');
                buyButton.addEventListener('click', buyToken);
            }
        });
    });
}
function checkTokenAmount(amountOfTokens, user, token) {
    if (amountOfTokens === null || amountOfTokens === '0') {
        cancelPurchase();
    }
    else if (!isNaN(parseInt(amountOfTokens))) {
        const numberOfTokens = parseInt(amountOfTokens);
        handleTokenAmount(numberOfTokens, user, token);
    }
    else {
        alert('A quantidade de tokens a serem comprados deve ser um número!!');
    }
}
function cancelPurchase() {
    alert('Compra cancelada');
}
function handleTokenAmount(numberOfTokens, user, token) {
    if (numberOfTokens === 1) {
        handleSingleTokenPurchase(user, token);
    }
    else {
        handleBatchTokenPurchase(numberOfTokens, user, token);
    }
}
function handleBatchTokenPurchase(numberOfTokens, user, token) {
    if (numberOfTokens <= 20) {
        buyTokenBatch(user, token, numberOfTokens, 0.2);
    }
    else if (numberOfTokens >= 21 && numberOfTokens <= 50) {
        buyTokenBatch(user, token, numberOfTokens, 0.25);
    }
    else if (numberOfTokens >= 51 && numberOfTokens <= 100) {
        buyTokenBatch(user, token, numberOfTokens, 0.3);
    }
    else {
        buyTokenBatch(user, token, numberOfTokens, 0.5);
    }
}
function handleSingleTokenPurchase(user, token) {
    if (user.balance >= token.value) {
        user.tokens.push(token);
        user.balance -= token.value;
        token.quantity -= 1;
        modifyTokenValue(token);
        updateUserTokens(user.id, user);
    }
    else {
        insufficientBalance();
    }
}
function insufficientBalance() {
    alert('Saldo insuficiente para comprar o token.');
}
export function buyToken(event) {
    return __awaiter(this, void 0, void 0, function* () {
        const idToken = event.target.id;
        const token = yield getTokenById(parseInt(idToken));
        const user = yield getUserById(12);
        const amountOfTokens = prompt(`Quantos tokens de ${token.nameToken} você quer comprar?`);
        checkTokenAmount(amountOfTokens, user, token);
    });
}
export function getUserById(idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `http://localhost:3001/users/${idUser}`;
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error("Ocorreu um erro na requisição GET.");
            }
            const result = yield response.json();
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
export function getTokenById(idToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `http://localhost:3000/tokens/${idToken}`;
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error("Ocorreu um erro na requisição GET.");
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
export function buyTokenBatch(user, token, quantity, discount) {
    const totalPrice = token.value * quantity * (1 - discount);
    if (user.balance >= totalPrice && token.quantity >= quantity) {
        for (let i = 0; i < quantity; i++) {
            user.tokens.push(token);
            modifyTokenValue(token);
        }
        user.balance -= totalPrice;
        token.quantity -= quantity;
        modifyTokenValue(token);
        updateUserTokens(user.id, user);
    }
    else {
        alert('Saldo insuficiente ou quantidade de tokens indisponível para comprar em lote.');
    }
}
export function modifyTokenValue(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const marketFactor = Math.random() * (1.2 - 0.8) + 0.8;
        const newValue = token.value * marketFactor;
        token.value = newValue;
        try {
            const url = `http://localhost:3000/tokens/${token.id}`;
            const response = yield fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(token)
            });
            if (!response.ok) {
                throw new Error('Ocorreu um erro na requisição PUT.');
            }
        }
        catch (error) {
            alert(error);
            throw error;
        }
    });
}
function updateUserTokens(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `http://localhost:3001/users/${user.id}`;
            const response = yield fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if (!response.ok) {
                throw new Error('Ocorreu um erro na requisição PUT.');
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
