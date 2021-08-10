import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { NewsFormValues } from "../types";

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

export const addNewsItem = ({
  title,
  description,
  source,
  image,
}: NewsFormValues) => {
  return firestore.collection("news").add({
    title,
    description,
    source,
    image,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  });
};

export const listtenLatestNews = (
  callback: (newNews: firebase.firestore.DocumentData) => void
) => {
  return firestore
    .collection("news")
    .orderBy("createdAt", "desc")
    .onSnapshot(({ docs }) => {
      const newNews = docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return {
          ...data,
          id,
        };
      });
      callback(newNews);
    });
};

export const updateNewsItem = (id: string, {
  title,
  description,
  source,
  image,
}: NewsFormValues) => {
  return firestore.collection('news').doc(id).update({
    title,
    description,
    source,
    image,
  })
}

export const deleteNewsItem = (id: string) => {
  return firestore.collection('news').doc(id).delete()
}
