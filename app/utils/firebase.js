import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyC5gQsto4hejiH1kVRwWpI6X74wq9Kb3ds",
    authDomain: "tenedores-dab60.firebaseapp.com",
    projectId: "tenedores-dab60",
    storageBucket: "tenedores-dab60.appspot.com",
    messagingSenderId: "285704149850",
    appId: "1:285704149850:web:28f35861de69e7ed85b163"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig);