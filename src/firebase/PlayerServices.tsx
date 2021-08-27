import { firestore } from "./client";
import firebase from "firebase/app";

import {
  Player,
  PlayerExperience,
  PlayerInjury,
  PlayerPersonalInfo,
  PlayerTacticalInfo,
} from "../types";
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

export const updatePlayerExperience = async (
  id: string,
  {
    A,
    G,
    PJ,
    TA,
    TR,
    season,
    catTournament,
    clubName,
    countryClub,
    subPlayer,
  }: PlayerExperience,
  oldPlayerExperience: PlayerExperience | undefined
) => {
  const res = await firestore.collection("users").doc(id);
  res.get().then((doc) => {
    if (doc.exists) {
      res.update({
        clubs: firebase.firestore.FieldValue.arrayRemove(oldPlayerExperience),
      });
    }
    res.update({
      clubs: firebase.firestore.FieldValue.arrayUnion({
        A,
        G,
        PJ,
        TA,
        TR,
        catTournament,
        clubName,
        countryClub,
        season,
        subPlayer,
      }),
    });
  });
};

export const updatePlayerInjury = async (
  id: string,
  { injuryName, recoveryTime, surgery }: PlayerInjury,
  oldPlayerInjury: PlayerInjury | undefined
) => {
  const res = await firestore.collection("users").doc(id);
  res.get().then((doc) => {
    if (doc.exists) {
      res.update({
        injuries: firebase.firestore.FieldValue.arrayRemove(oldPlayerInjury),
      });
    }
    res.update({
      injuries: firebase.firestore.FieldValue.arrayUnion({
        injuryName,
        recoveryTime,
        surgery,
      }),
    });
  });
};

export const deletePlayerExperience = async (
  id: string,
  {
    A,
    G,
    PJ,
    TA,
    TR,
    season,
    catTournament,
    clubName,
    countryClub,
    subPlayer,
  }: PlayerExperience
) => {
  const res = await firestore.collection("users").doc(id);
  res.get().then((doc) => {
    if (doc.exists) {
      res.update({
        clubs: firebase.firestore.FieldValue.arrayRemove({
          A,
          G,
          PJ,
          TA,
          TR,
          season,
          catTournament,
          clubName,
          countryClub,
          subPlayer,
        }),
      });
    }
  });
};

export const deletePlayerInjury = async (
  id: string,
  { injuryName, recoveryTime, surgery }: PlayerInjury
) => {
  const res = await firestore.collection("users").doc(id);
  res.get().then((doc) => {
    if (doc.exists) {
      res.update({
        injuries: firebase.firestore.FieldValue.arrayRemove({
          injuryName,
          recoveryTime,
          surgery,
        }),
      });
    }
  });
};
