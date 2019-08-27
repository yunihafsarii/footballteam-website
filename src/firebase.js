import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyDh-QaOb3Qux9GXELCvBi5Ksf2Egnuq1VY",
    authDomain: "m-city-9c944.firebaseapp.com",
    databaseURL: "https://m-city-9c944.firebaseio.com",
    projectId: "m-city-9c944",
    storageBucket: "m-city-9c944.appspot.com",
    messagingSenderId: "1081437053677",
    appId: "1:1081437053677:web:6cbb49581219fa2e"
  };

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');

 export {
     firebase,
     firebaseMatches,
     firebasePromotions,
     firebaseTeams,
     firebasePlayers,
     firebaseDB
 }