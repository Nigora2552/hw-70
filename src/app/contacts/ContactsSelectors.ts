import type {RootState} from "../store.ts";

export const selectCreateContact = (state: RootState) => state.contacts.contacts;
export const selectOnePerson = (state: RootState) => state.contacts.oneContact;
export const selectOneContact = (state: RootState) => state.contacts.item;

export const isLoading = (state: RootState) => state.contacts.loading;
