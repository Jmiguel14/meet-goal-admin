export interface LoginFormValues {
  email: string;
  password: string;
}

export interface NewsFormValues {
  id?: string;
  title: string;
  description: string;
  source: string;
  image: string;
}

export interface Player {
  id: string;
  name: string;
  email: string;
  phone: string;
  birth: string;
  city: string;
  country: string;
  category: string;
  contract: string;
  pospri?: string;
  possec: string;
  userType: string;
  avatarURL: string;
  coverURL: string;
  attributes?: string[];
  firstAttribute: string;
  secondAttribute: string;
  thirdAttribute: string;
  fourthAttribute: string;
  clubs: PlayerExperience[]
}

export interface PlayerPersonalInfo {
  id?: string;
  name: string;
  email?: string;
  phone: string;
  birth: string | moment.Moment;
  city: string;
  country: string;
  category: string;
  contract: string;
}

export interface PlayerTacticalInfo {
  id?: string;
  pospri?: string;
  possec: string;
  avatarURL: string;
  coverURL: string;
  attributes?: string[];
  firstAttribute: string;
  secondAttribute: string;
  thirdAttribute: string;
  fourthAttribute: string;
}

export interface CallData {
  id?: string;
  ageRequired: string | undefined;
  posRequired: string;
  startDate: firebase.firestore.Timestamp;
  endDate: firebase.firestore.Timestamp;
  extraDetails: string;
  clubId?: string;
  postulatedPlayers?: any;
  postulatedPlayersId?: Array;
  isClosed?: boolean;
}

export interface Club {
  id: string;
  name: string;
  email: string;
  phone: string;
  foundation: string;
  city: string;
  country: string;
  maxIntGoal: string;
  maxNacGoal: string;
  socialName: string;
  totalWins: string;
  userType: string;
  avatarURL: string;
  coverURL: string;
}

export interface ClubInstitutionalInfo {
  id?: string;
  name: string;
  email?: string;
  phone: string;
  foundation: string;
  city: string;
  country: string;
  socialName: string;
}

export interface ClubSportsAhievements {
  id?: string;
  maxIntGoal: string;
  maxNacGoal: string;
  totalWins: string;
  avatarURL: string;
  coverURL: string;
}

export interface PlayerExperience {
  A: number
  G: number
  PJ: number 
  TA: number
  TR: number
  season: number
  catTournament: string
  clubName: string
  countryClub: string
  subPlayer: string
}