import type {IContact, IContactAPI, IContactMutation} from "../../types";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";

interface ContactSlice {
    contacts: IContact[] | null;
    item: IContact | undefined;
    oneContact: IContactMutation | null;
    loading: boolean;
}

const initialState: ContactSlice = {
    contacts: [],
    item:undefined,
    oneContact: null,
    loading: false,
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        getContact: (state, action:PayloadAction<IContact | undefined>) => {
            const onePerson = action.payload;

                if (onePerson) {
                    state.item = onePerson
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContact.pending, (state) => {
            state.loading = true;
            state.oneContact = null;
        });
        builder.addCase(fetchContact.fulfilled, (state, action) => {
            state.loading = false;
            state.contacts = action.payload;
        });
        builder.addCase(fetchContact.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(getOneContact.pending, (state) => {
            state.loading = true;
            state.oneContact = null;
        });
        builder.addCase(getOneContact.fulfilled, (state, action) => {
            state.loading = false;
            state.oneContact = action.payload;
        });
        builder.addCase(getOneContact.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(editContact.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(editContact.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(editContact.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(createContact.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createContact.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(createContact.rejected, (state) => {
            state.loading = false;
        })
    }
});

export const fetchContact = createAsyncThunk<IContact[], void>('contact/fetchContact',
    async () => {
        const response = await axiosApi.get<IContactAPI | null>(`contacts.json`);
        const contacts = response.data;

        if (contacts) {
            return Object.keys(contacts).map(key => {
                return {
                    ...contacts[key],
                    id: key
                }
            });
        }
        return [];
    });

export const getOneContact = createAsyncThunk<IContactMutation | null, string>('contact/getOneContact',
    async (id) => {
        const response = await axiosApi.get<IContactMutation | null>(`contacts${id}.json`);
        return response.data;
    });

export const editContact = createAsyncThunk<void, { id: string; item: IContactMutation }>('contacts/editContact',
    async ({id, item}) => {
        await axiosApi.put<IContactMutation | null>(`contacts${id}.json`, item);
    })

export const createContact = createAsyncThunk<void, IContactMutation>('contact/createContact',
    async (item) => {
        await axiosApi.post('contacts.json', item);
    })


export const {getContact} = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;