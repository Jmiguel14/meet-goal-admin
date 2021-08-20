import { firestore } from "./client";
import { Player } from "../types";
import { USER_TYPE } from "../constants/userType";

export const listenLatestPlayers = (
  callback: (newPlayers: Player[]) => void
) => {
  return firestore
    .collection("users")
    .where('userType', '==', USER_TYPE.PLAYER)
    .limit(16)
    .orderBy("createdAt", "desc")
    .onSnapshot(({ docs }) => {
      const newPlayers = docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return {
          ...data,
          id,
        };
      }) as Player[];
      callback(newPlayers);
    });
};

export const listenAllPlayers = (
    callback: (newPlayers: Player[]) => void
  ) => {
    return firestore
      .collection("users")
      .where('userType', '==', USER_TYPE.PLAYER)
      .orderBy("createdAt", "desc")
      .onSnapshot(({ docs }) => {
        const newPlayers = docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return {
            ...data,
            id,
          };
        }) as Player[];
        callback(newPlayers);
      });
  };

export const getSinglePlayer = (id: string) => {
  return firestore
  .collection("users")
  .doc(id)
  .get()
}