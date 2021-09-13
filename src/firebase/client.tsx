import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const uploadImage = (file: File) => {
  const ref = firebase.storage().ref(`images/${Date.now()}/${file.name}`);
  const task = ref.put(file);
  return task;
};

export const uploadProfilesImage = (file: File, id: string, name: string) => {
  const ref = firebase.storage().ref(`images/${id}/${name}`);
  const task = ref.put(file);
  return task;
};
export const uploadNewsImage = (file: File, id: string, name: string) => {
  const ref = firebase.storage().ref(`images/${id}/${name}`);
  const task = ref.put(file);
  return task;
};
