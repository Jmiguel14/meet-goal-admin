import { firestore } from "./client";
import firebase from 'firebase/app'
import { NewsFormValues } from "../types";

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
  
  export const listenLatestNews = (
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