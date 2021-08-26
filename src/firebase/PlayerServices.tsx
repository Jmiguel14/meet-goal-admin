import { firestore } from "./client";
import { Player, PlayerPersonalInfo, PlayerTacticalInfo } from "../types";
import { USER_TYPE } from "../constants/userType";

export const listenLatestPlayers = (
  callback: (newPlayers: Player[]) => void
) => {
  return firestore
    .collection("users")
    .where("userType", "==", USER_TYPE.PLAYER)
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

export const listenAllPlayers = (callback: (newPlayers: Player[]) => void) => {
  return firestore
    .collection("users")
    .where("userType", "==", USER_TYPE.PLAYER)
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

export const listeningSinglePlayer = (
  id: string | undefined,
  callback: (newPlayer: Player) => void
) => {
  return firestore
    .collection("users")
    .doc(id)
    .onSnapshot((doc) => {
      const data = doc.data();
      const id = doc.id;
      const newPlayer = {
        ...data,
        id,
      } as Player;
      callback(newPlayer);
    });
};

export const updatePlayerTacticalInfo = (
  id: string,
  {
    pospri,
    possec,
    firstAttribute,
    secondAttribute,
    thirdAttribute,
    fourthAttribute,
    coverURL,
    avatarURL,
  }: PlayerTacticalInfo
) => {
  return firestore.collection("users").doc(id).update({
    pospri,
    possec,
    firstAttribute,
    secondAttribute,
    thirdAttribute,
    fourthAttribute,
    coverURL,
    avatarURL,
  });
};

export const updatePlayerPersonalInfo = (
  id: string,
  { name, phone, city, country, birth, category, contract }: PlayerPersonalInfo
) => {
  return firestore.collection("users").doc(id).update({
    name,
    phone,
    city,
    country,
    birth,
    category,
    contract,
  });
};
