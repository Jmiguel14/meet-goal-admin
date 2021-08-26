import { CallData, Club } from "../types";
import { firestore } from "./client";
import firebase from "firebase/app";

export const listenLatestCalls = (callback: (newCall: CallData[]) => void) => {
  return firestore
    .collection("calls")
    .limit(16)
    .orderBy("createdAt", "desc")
    .onSnapshot(({ docs }) => {
      const newCall = docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return {
          ...data,
          id,
        };
      }) as CallData[];
      callback(newCall);
    });
};

export const listenAllCalls = (callback: (newCalls: CallData[]) => void) => {
  return firestore
    .collection("calls")
    .orderBy("createdAt", "desc")
    .onSnapshot(({ docs }) => {
      const newCalls = docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return {
          ...data,
          id,
        };
      }) as CallData[];
      callback(newCalls);
    });
};

export const listeningSingleCall = (
  id: string,
  callback: (newCall: CallData) => void
) => {
  return firestore
    .collection("calls")
    .doc(id)
    .onSnapshot((doc) => {
      const data = doc.data();
      const id = doc.id;
      const newCall = {
        ...data,
        id,
      } as CallData;
      callback(newCall);
    });
};

export const listeningCallOwner = (
  id: string,
  callback: (newOwn: Club) => void
) => {
  return firestore
    .collection("users")
    .doc(id)
    .onSnapshot((doc) => {
      const data = doc.data();
      const id = doc.id;
      const newOwn = {
        ...data,
        id,
      } as Club;
      callback(newOwn);
    });
};

export function updateCallInfo(
  id: string,
  startDate: string,
  endDate: string,
  extraDetails: string
) {
  firestore
    .collection("calls")
    .doc(id)
    .update({
      startDate: firebase.firestore.Timestamp.fromDate(new Date(startDate)),
      endDate: firebase.firestore.Timestamp.fromDate(new Date(endDate)),
      extraDetails,
    });
}

export function deleteCall(id: string | undefined) {
  firestore.collection("calls").doc(id).delete();
}
