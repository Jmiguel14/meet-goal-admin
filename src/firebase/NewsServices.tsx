import { firestore } from "./client";
import firebase from "firebase/app";
import { NewsFormValues } from "../types";

export const addNewsItem = ({
  id,
  title,
  description,
  source,
  image,
}: NewsFormValues) => {
  return firestore
    .collection("news")
    .doc(id)
    .set({
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
    .limit(15)
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

export const updateNewsItem = (
  id: string,
  { title, description, source, image }: NewsFormValues
) => {
  return firestore.collection("news").doc(id).update({
    title,
    description,
    source,
    image,
  });
};

export const updateNewsCover = (id: string, image: string) => {
  return firestore.collection("news").doc(id).update({
    image,
  });
};

export const deleteNewsItem = (id: string) => {
  return firestore.collection("news").doc(id).delete();
};
