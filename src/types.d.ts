export interface IContact {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo: string;
}

export interface IContactMutation {
    name: string;
    phone: string;
    email: string;
    photo: string;
}

export  interface IContactAPI {
    [key: string]: IContactMutation;
}