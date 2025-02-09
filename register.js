console.log("hellow register page");


const email = document.querySelector("#email")
const password = document.querySelector("#password")
const btn = document.querySelector("#btn")



btn.addEventListener("click",(e)=>{
    e.preventDefault()
    console.log(email.value);
    console.log(password.value);

    
})
