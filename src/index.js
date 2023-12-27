//----------------------------------------------- Firebase ----------------------------------------------------// 

import { initializeApp} from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, where, toDate, doc, Timestamp} from 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCD8gMunwymWn9SW6RE3_oL2JEP0XkmwSQ",
  authDomain: "first-firebase-6c5da.firebaseapp.com",
  databaseURL: "https://first-firebase-6c5da-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "first-firebase-6c5da",
  storageBucket: "first-firebase-6c5da.appspot.com",
  messagingSenderId: "910252511406",
  appId: "1:910252511406:web:b5a89a961d543c038b9d3f",
  measurementId: "G-9N35DGCZHC"
};

const app = initializeApp(firebaseConfig); 
const db = getFirestore();
const collec_ref = collection(db, 'chat');

//----------------------------------------------- Chat.js ----------------------------------------------------// 

// Adding new document 
class Chatroom {    // 💡class loads only when activated        
   constructor(room, username) {    //setting up properties 📑
       this.room = room;
       this.username = username;
       this.collec_ref = collec_ref; 
       this.unsub 
   }
 
 async add_Message(message) {  // ▶ Adding documents to firebase 
  addDoc(collec_ref, {
       username: this.username,
       room: this.room,
       message: message,
       createdAt: serverTimestamp()
     })
   } 

   get_Message(callback) {    // ◀ getting information back from the firebase 
     this.unsub = onSnapshot(query(collec_ref, where("room", "==", this.room),  orderBy("createdAt", "asc")), (snapshot) => {
        snapshot.docChanges().forEach((doc) => {                      //1.💡
         if (doc.type === "added") {
           callback(doc.doc.data());  //📞 ▶ information is being send to callback
         }
        })
      })
   }
  
   updateName(username) {     // updating name 🔄
    this.username = username;
    localStorage.setItem("username", "Thomas")
    console.log('Name has been updated to', username)
    
   }
   updateRoom(room) {       // updating room 🔄
    this.room = room
    if(this.unsub) {        // 1.💡 
      this.unsub()
    }
  
 }}

//----------------------------------------------- UI.js ----------------------------------------------------// 

class ChatUI { // 💡Responsbile for placing text inside the message box 📑
  constructor(list) {
   this.list = list
  }

  clear() {
    this.list.innerHTML = ``
  }
  
  render(data) {     // pushed data from 
    const now = new Date();
    let when = now
    if (data.createdAt) {
        when = new Date(data.createdAt.toDate());
    }
    const inWords = dateFns.distanceInWords(now, when, {addSuffix: true});
    const html = `
        <li class="list-group-item">
            <span class="username">${data.username}</span> <br>
            <span class="message">${data.message}</span>
            <div class="time"> ${inWords} </div>
        </li>`;
    this.list.innerHTML += html;
    } 
    }
  
  
//----------------------------------------------- Authentication ----------------------------------------------------//

class authClass {  //😀
  constructor() {
   this.email,
   this.password,
   this.auth = getAuth();
  }
  
  registerRender() {
    leftBtn.classList.add("btn-dark")  //changes buttons colours ⬜🟨
    rightBtn.classList.remove("btn-dark")

    forms.innerHTML = formHTML[0];  // renders HTML text 
    const addedClass = document.querySelector(".form-register") //grabs a from inside renderd HTML
    if(addedClass) { 
      addedClass.addEventListener("submit", (e) => { //Submit listener to a added form. 
        e.preventDefault()
        this.password = e.target.password.value  //adding password to global settings
        this.email = e.target.email.value        //adding email to global settings
        user_signUp.registerAuth() 
        })
    } else {
      console.log("Not added")
    }
  }dsds


  registerAuth() {
   createUserWithEmailAndPassword(this.auth, this.email, this.password)
   .then((registerd) => {
    container[0].classList.add("d-none")
    container[1].classList.remove("d-none")
   }).catch((err) => console.log(err))
  }

  signInRender() {  // renders submit form 📑
    forms.innerHTML = formHTML[1]
    rightBtn.classList.add("btn-dark")
    leftBtn.classList.remove("btn-dark")

    const addedClass = document.querySelector(".form-login") //activates rendered query selector 
    if(addedClass) { 
      addedClass.addEventListener("submit", (e) => {
        e.preventDefault()
        this.password = e.target.password.value  //adding password to global settings
        this.email = e.target.email.value        //adding email to global settings
        user_signUp.signInAuth() 
        })
    } else {
      console.log("N")
    }
  }

  signInAuth() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
    .then((loggedIn) => {
         container[1].classList.remove("d-none")
         container[0].classList.add("d-none")
    })
    .catch((err) => console.log(err.message))
   }

   LoggingOut() {
    signOut(this.auth).then((logOut) => {
      console.log(logOut.user, "you logged out")
    })
  }

  alreadySignedIn(email) {
    userEmail.innerHTML = email
    container[1].classList.remove("d-none")
    container[0].classList.add("d-none")
  }
  }







//----------------------------------------------- App.js ----------------------------------------------------//

const formHTML = [[`<form class="form-register">
<div class="form-group">
    <label for="Email_input">Emails Adress</label>
    <input type="email" class="form-control" id="email" required>
    </div>
    <div class="form-group">
    <label for="password">Password</label>
    <input type="current-password" class="form-control" id="password" required>
    </div>
    <button class="btn btn-outline-dark my-3 registerBtn" type="submit">Register</button></form>`],
[`<form class="form-login">
<div class="form-group">
<label for="Email_input">Emails Adress</label>
<input type="email" class="form-control" id="email" required>
</div>
<div class="form-group">
<label for="password">Password</label>
<input type="current-password" class="form-control" id="password" required>
</div>
<button class="btn btn-dark my-3 loginBtn" type="submit">Login</button>`] ]



// ---- DOM ----//

const chatList = document.querySelector('.chat-list')
const updateMssg = document.querySelector(".update-mssg")
const newChatForm = document.querySelector('.new-chat')
const newNameForm = document.querySelector(".new-name")
const chatRooms = document.querySelector(".chat-rooms")
const forms = document.querySelector(".forms")
const container = document.querySelectorAll(".container")
const signOutBtn = document.querySelector(".signOutBtn")
const leftBtn = document.querySelector("#leftBtn")
const rightBtn = document.querySelector("#rightBtn")
const userEmail = document.querySelector(".userEmail")



// --- Event Listeners ---//

// adding chat 🔄
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault()
  user_one.add_Message(e.target.message.value)
  .then(() => newChatForm.reset()).catch((err) => console.log(err));
})

// adding name 🔄
newNameForm.addEventListener("submit", (e) => {
 e.preventDefault()
 user_one.updateName(e.target.newName.value)
 updateMssg.innerText = `Your name was updated to ${e.target.newName.value}`
 setTimeout(() => updateMssg.innerText = ``, 2000);
})

//changing room 
chatRooms.addEventListener("click", (e) => {
 let roomTarget = e.target.getAttribute('id'); 
   if (roomTarget) {
    chat_UI.clear()                                      //clearing UI
    user_one.updateRoom(roomTarget)                      //changing  room & unsub 
    user_one.get_Message((chat) => chat_UI.render(chat)) //UI get's updated with anew room
   }
 })



 // Btn "right" - click 🔑 -->
rightBtn.addEventListener("click", () => {
  user_signUp.signInRender()
})


// Btn  "left" - click 🔑 <--
leftBtn.addEventListener("click", () => {
 user_signUp.registerRender()
})


// signing out 🔐
signOutBtn.addEventListener("click", () => {
  signOut(getAuth())
  .then((info) => console.log(info, "You logged out:("))
  .catch((err) => console.log(err.message))
  location.reload()
})



// --- When page loads ---//


// 1. Checking if the user has signedUp or logged in ???
onAuthStateChanged(getAuth(), (userStat) => {
  console.log(userStat.email)
  if (userStat.email) {
    console.log("user logged in", userStat)
    user_signUp.alreadySignedIn(userStat.email)
  } else {
  console.log("not logged in")
  }
}) 
 
//1.checking if the user is logged in
const user = localStorage.username? localStorage.getItem("username") : "Anonymous Users";

//2.class activation 🔌- UI.JS   
const chat_UI = new ChatUI(chatList)  

//3.class activation 🔌- Chat.js
const user_one = new Chatroom("general", user);  

//4.Signing up class activation 
const user_signUp = new authClass()
user_signUp.registerRender()

 //Reciving info from [Chatroom class], & moving to [ChatUI]
 //▶ recived callback 📞               
 user_one.get_Message((callback) => chat_UI.render(callback))