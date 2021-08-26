import { firestore } from "./client";
import {
  Club,
  ClubInstitutionalInfo,
  ClubSportsAhievements,
} from "../types";
import { USER_TYPE } from "../constants/userType";

export const listenLatestClubs = (callback: (newClubs: Club[]) => void) => {
  return firestore
    .collection("users")
    .where("userType", "==", USER_TYPE.CLUB)
    .limit(16)
    .orderBy("createdAt", "desc")
    .onSnapshot(({ docs }) => {
      const newClubs = docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return {
          ...data,
          id,
        };
      }) as Club[];
      callback(newClubs);
    });
};

export const listenAllClubs = (callback: (newClubs: Club[]) => void) => {
  return firestore
    .collection("users")
    .where("userType", "==", USER_TYPE.CLUB)
    .orderBy("createdAt", "desc")
    .onSnapshot(({ docs }) => {
      const newClubs = docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return {
          ...data,
          id,
        };
      }) as Club[];
      callback(newClubs);
    });
};

export const listeningSingleClub = (
  id: string,
  callback: (newClub: Club) => void
) => {
  return firestore
    .collection("users")
    .doc(id)
    .onSnapshot((doc) => {
      const data = doc.data();
      const id = doc.id;
      const newClub = {
        ...data,
        id,
      } as Club;
      callback(newClub);
    });
};

export const updateClubInstitutionalInfo = (
  id: string,
  { name, phone, socialName, foundation, city, country }: ClubInstitutionalInfo
) => {
  return firestore.collection("users").doc(id).update({
    name,
    phone,
    socialName,
    foundation,
    city,
    country,
  });
};

export const updateClubSportsAchievements = (
  id: string,
  {
    totalWins,
    maxIntGoal,
    maxNacGoal,
    avatarURL,
    coverURL,
  }: ClubSportsAhievements
) => {
  return firestore.collection("users").doc(id).update({
    totalWins,
    maxIntGoal,
    maxNacGoal,
    avatarURL,
    coverURL,
  });
};
