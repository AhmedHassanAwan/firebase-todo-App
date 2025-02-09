console.log("hellow register page");

import { createUserWithEmailAndPassword }  from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";


import { auth } from "./config.js";


const email = document.querySelector("#email")
const password = document.querySelector("#password")
const btn = document.querySelector("#btn")



btn.addEventListener("click",(e)=>{
    e.preventDefault()
    console.log(email.value);
    console.log(password.value);

createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);

    window.location = "login.html"
    
    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    alert(errorMessage)
    
    // ..
  });

    
})




