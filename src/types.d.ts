export interface LoginFormValues {
    email: string;
    password: string;
}

export interface NewsFormValues {
    id?: string
    title: string
    description: string
    source: string 
    image: string
}

export interface Player {
    id: string
    name: string;
    email: string;
    phone: string;
    pospri?: string
    userType: string;
    avatarURL: string;
    coverURL: string;
}