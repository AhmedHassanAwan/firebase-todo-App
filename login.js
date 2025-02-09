console.log("hellow world");



const email = document.querySelector("#email")
const password = document.querySelector("#password")
const btn = document.querySelector("#btn")



btn.addEventListener("click",(e)=>{
    e.preventDefault()
    console.log(email.value);
    console.log(password.value);


    window.location = "index.html"

    
})
