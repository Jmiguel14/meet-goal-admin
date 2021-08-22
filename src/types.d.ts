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
