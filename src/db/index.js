import firebase from 'firebase/app';
import 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA73MA-3pCRvTYH--rARQSVl_hmSSlAt0Y",
  authDomain: "vue-estore.firebaseapp.com",
  databaseURL: "https://vue-estore.firebaseio.com",
  projectId: "vue-estore",
  storageBucket: "",
  messagingSenderId: "851538179713",
  }
  // Initialize Firebase
  const firebaseapp = firebase.initializeApp(firebaseConfig)

  export default firebaseapp.firestore();