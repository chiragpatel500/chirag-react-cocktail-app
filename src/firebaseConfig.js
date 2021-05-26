import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey:process.env.REACT_APP_API_KEY,
    authDomain: "chirag-react-cocktail.firebaseapp.com",
    databaseURL: "https://chirag-react-cocktail-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chirag-react-cocktail",
    storageBucket: "chirag-react-cocktail.appspot.com",
    messagingSenderId: "299804469165",
    appId: "1:299804469165:web:8ff44e37b67f2bd2246324"
  };


// // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
