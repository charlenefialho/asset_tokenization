import { User } from "./app";
import { Token, TokenMarket } from "./interfaces";

const divTokenList = document.querySelector("#tokenCards") as HTMLElement;

document.addEventListener("DOMContentLoaded", () => {
  getTokenList();
  showAvailableTokens();
  setIntervalAddNewToken();
});

setIntervalAddNewToken();

export function createToken(): Token {
  const id = Math.floor(Math.random() * 100);
  const nameToken = Math.random().toString(36).substring(7);
  const value = Math.random() * (10 - 0.01) + 0.01;
  const quantity = Math.floor(Math.random() * 100) + 1;

  const token: Token = { id, nameToken, value, quantity };
  return token;
}

export async function AddNewToken() {
  const token = createToken();

  await fetch("http://localhost:3000/tokens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Dados enviados com sucesso:", result);
    })
    .catch((error) => {
      console.error("Erro ao enviar os dados:", error);
    });
}

async function setIntervalAddNewToken() {
  const intervalInMilliseconds = 60000;
  await setInterval(AddNewToken, intervalInMilliseconds);
}

export async function getTokenList() {
  try {
    const response = await fetch("http://localhost:3000/tokens");

    if (!response.ok) {
      throw new Error("Ocorreu um erro na requisição GET.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
    throw error;
  }
}

export async function showAvailableTokens() {
  await getTokenList().then((tokenList: Token[]) => {
    for (let token in tokenList) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
          <h2>${tokenList[token].nameToken}</h2>
          <p>Valor: R$${tokenList[token].value.toFixed(2)}</p>
          <p>Quantidade disponível: ${tokenList[token].quantity}</p>
          <button class="buyButton" id="${tokenList[token].id}">Comprar</button>
        `;
      divTokenList.appendChild(card);

      const buyButton = card.querySelector(".buyButton") as HTMLButtonElement;
      buyButton.addEventListener("click", buyToken);
    }
  });
}

function checkTokenAmount(
  amountOfTokens: string | null,
  user: User,
  token: Token
) {
  if (amountOfTokens === null || amountOfTokens === "0") {
    cancelPurchase();
  } else if (!isNaN(parseInt(amountOfTokens))) {
    const numberOfTokens = parseInt(amountOfTokens);
    handleTokenAmount(numberOfTokens, user, token);
  } else {
    alert("A quantidade de tokens a serem comprados deve ser um número!!");
  }
}

function cancelPurchase() {
  alert("Compra cancelada");
}

function handleTokenAmount(numberOfTokens: number, user: User, token: Token) {
  if (numberOfTokens === 1) {
    handleSingleTokenPurchase(user, token);
  } else {
    handleBatchTokenPurchase(numberOfTokens, user, token);
  }
}

function handleBatchTokenPurchase(
  numberOfTokens: number,
  user: User,
  token: Token
) {
  if (numberOfTokens <= 20) {
    buyTokenBatch(user, token, numberOfTokens, 0.2);
  } else if (numberOfTokens >= 21 && numberOfTokens <= 50) {
    buyTokenBatch(user, token, numberOfTokens, 0.25);
  } else if (numberOfTokens >= 51 && numberOfTokens <= 100) {
    buyTokenBatch(user, token, numberOfTokens, 0.3);
  } else {
    buyTokenBatch(user, token, numberOfTokens, 0.5);
  }
}

function handleSingleTokenPurchase(user: User, token: Token) {
  if (user.balance >= token.value) {
    user.tokens.push(token);
    user.balance -= token.value;
    token.quantity -= 1;
    modifyTokenValue(token);
    updateUserTokens(user.id, user);
  } else {
    insufficientBalance();
  }
}

function insufficientBalance() {
  alert("Saldo insuficiente para comprar o token.");
}

export async function buyToken(event: Event) {
  const idToken = (event.target as HTMLElement).id;
  const token: Token = await getTokenById(parseInt(idToken));
  const user: User = await getUserById(12);

  const amountOfTokens: string | null = prompt(
    `Quantos tokens de ${token.nameToken} você quer comprar?`
  );

  checkTokenAmount(amountOfTokens, user, token);
}

export async function getUserById(idUser: number) {
  const url = `http://localhost:3001/users/${idUser}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Ocorreu um erro na requisição GET.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTokenById(idToken: number) {
  const url = `http://localhost:3000/tokens/${idToken}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Ocorreu um erro na requisição GET.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function buyTokenBatch(
  user: User,
  token: Token,
  quantity: number,
  discount: number
) {
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
  } else {
    alert(
      "Saldo insuficiente ou quantidade de tokens indisponível para comprar em lote."
    );
  }
}

export async function modifyTokenValue(token: Token) {
  const marketFactor = 1 + 0.02;
  const newValue = token.value * marketFactor;
  token.value = newValue;

  try {
    const url = `http://localhost:3000/tokens/${token.id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    });

    if (!response.ok) {
      throw new Error("Ocorreu um erro na requisição PUT.");
    }
  } catch (error) {
    alert(error);
    throw error;
  }
}

async function updateUserTokens(id: number, user: User) {
  try {
    const url = `http://localhost:3001/users/${user.id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Ocorreu um erro na requisição PUT.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
