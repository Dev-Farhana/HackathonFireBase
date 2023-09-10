import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const auth = getAuth();
const dataBase = getDatabase ();

console.log("start");


let signUpAuth = () => {
    const userName = document.getElementById('userName').value;
      const userEmail = document.getElementById('userEmail').value;
      const userPassword = document.getElementById('userPassword').value;
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
     .then((res) => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'User has been created',
        showConfirmButton: false,
        timer: 1500,
    });
       let userID = auth.currentUser.uid;
       let userRef = ref(dataBase,"users/"+ "("+ userName + ")");
       let userObj = { 
         Name: userName,
         Email: userEmail,
          Pass: userPassword };
        return set(userRef, userObj);
      })
      .then(() => {
        // Data has been successfully saved to the database, now change the location
       window.location.href = "./login.html";
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log();("Sorry not created" + errorMessage + errorCode);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorText,
    });
    })
  }
  const signUpBtn = document.getElementById('signUp');
  if(signUpBtn){ 
    signUpBtn.addEventListener("click", signUpAuth);
  }
  

  let LogIn = () => {
       const userEmail = document.getElementById('userEmail').value;
       const userPassword = document.getElementById('userPassword').value;
     signInWithEmailAndPassword(auth, userEmail, userPassword)
       .then((res) => {
       Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'User has been created',
        showConfirmButton: false,
        timer: 1500,
    });
       let userID = auth.currentUser.uid;
       let userNameRef = ref(dataBase, "LoginUsers/" + userID);
       onValue(userNameRef, (data) => {
         let userData = data.val().username;
         console.log(userData);
        document.getElementById("username").innerHTML = userData;
         username.innerHTML = userData;   
       })
      window.location.href = "./index.html";
     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       Swal.fire({
           icon: 'error',
           title: 'Oops...'+ errorMessage,
           text: errorCode,
        });
        console.log("Sorry an Error Came by " + errorCode + ": " + errorMessage);
     });
   
   };
   let loginBtn = document.getElementById('logIn');
   if(loginBtn) { loginBtn.addEventListener('click',LogIn);}
   



