console.log("hellow home Page");

import { onAuthStateChanged ,signOut }  from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

import { collection, addDoc , getDocs , query, where ,  deleteDoc, doc ,updateDoc   } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

import { auth ,db} from "./config.js";


const title = document.querySelector("#title");
const description = document.querySelector("#description");
const btn = document.querySelector("#btn");
const div = document.querySelector("#card");
const logout = document.querySelector("#signout");

logout.addEventListener("click",()=>{
    console.log("hellow logout Page");
    
    signOut(auth).then(() => {
        alert("Sign-out successful.")

        window.location = "login.html"
        
      }).catch((error) => {
        console.log(error);
        alert(error)
        

      });
      
})



onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);

  } else {
    window.location = "login.html"
   
  }
});


btn.addEventListener("click",async(e)=>{
    e.preventDefault()
    console.log(title.value);
    console.log(description.value);

    
    try {
      const docRef = await addDoc(collection(db, "todo"),{
        title : title.value,
        description : description.value,
        uid: auth.currentUser.uid   
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    data()
    
})



async function data() {
    const arrray = []
    const q = query(collection(db, "todo"),  where("uid", "==", auth.currentUser.uid));
    // console.log(uid);
    console.log(auth.currentUser.uid);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // arrray.push(doc.data())
    arrray.push({...doc.data(), DocID : doc.id})

});
console.log(arrray);



div.innerHTML =""
for (let index = 0; index < arrray.length; index++) {

    div.innerHTML += `
         <div class="card">
  <div class="card-header">
    Todo
  </div>
  <div class="card-body">
    <p><strong>Title:</strong> ${arrray[index].title}</p>
    <p><strong>Description:</strong> ${arrray[index].description}</p>
      <button type="button" class="btn btn-danger deletebtn" data-id="${arrray[index].DocID}">Delete</button>
    <button type="button" class="btn btn-info editbtn" editbtn data-id="${arrray[index].DocID}">Edit</button>
  </div>
</div> </br>`    
}
deletebtn() 
editbtn()
    
}





function deletebtn() {
    console.log("delete fun");
    const deletebtns = document.querySelectorAll(".deletebtn");
  
    deletebtns.forEach((btn1) => {
      btn1.addEventListener("click", async () => {
        const docID = btn1.getAttribute("data-id");
        console.log("Document ID:", docID);
  
        try {
          await deleteDoc(doc(db, "todo", docID));  
          console.log("Document deleted successfully");
          data();  
        } catch (error) {
          console.log("Error deleting document:", error);
        }
        
        console.log("Hello Ahmed");
      });
    });
  }




//   editbtn



function editbtn() {
    console.log("edit fun");
    const editbtn = document.querySelectorAll(".editbtn");

    editbtn.forEach((btn1)=>{
        btn1.addEventListener("click",async()=>{
            const docid = btn1.getAttribute("data-id")
            console.log(docid);
            
            const newtitle = prompt("enter new title")
            const newdescription = prompt("enter new description")

            console.log(docid);


            if(newdescription && newtitle){

                const Ref = doc(db, "todo", docid);

                await updateDoc(Ref, {

                    title : newtitle,
                    description : newdescription,
                    // capital: true
                  });
                  data()
            }
            
            console.log("hellow ahmed hassan awan");
            
        })
    })



    
    
}







