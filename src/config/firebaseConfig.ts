import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDR9jMyh32jyww54wAn2G4vHMEhSEAeqsY",
  authDomain: "ebuddy-test.firebaseapp.com",
  projectId: "ebuddy-test",
  storageBucket: "ebuddy-test.appspot.com",
  messagingSenderId: "860914138673",
  appId: "1:860914138673:web:548fd76d01382109d0df10",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
