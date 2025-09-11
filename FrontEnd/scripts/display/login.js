import { initTokenWithExpiration } from "../tools/token.js";

const apiUrl = "http://127.0.0.1:5678/api";
const loginForm = document.querySelector(".login-form");
const errorMessage = document.querySelector(".error-message");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleLogin();
});


export async function handleLogin() {
  const emailInput = document.querySelector("input[type='email']");
  const passwordInput = document.querySelector("input[type='password']");

  try {
    const response = await fetch(`${apiUrl}/users/login`, {
    	method: "POST",
    	headers: {
    	  "Content-Type": "application/json",
  	  },
	    body: JSON.stringify({ email: emailInput.value, password: passwordInput.value })
    });

    if (!response.ok) {
      throw new Error(`Error : ${response.status}`);
    }

    const data = await response.json();
    console.log(`Reponse: ${data}`);

    initTokenWithExpiration(data.token);
    window.location.replace("/");

  } catch (error) {
    passwordInput.value = "";
    errorMessage.innerText = "Erreur dans l’identifiant ou le mot de passe";
    console.error(`Error while sending request : ${error.message}`);
  }
}