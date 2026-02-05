import Form from "../../components/Form/Form.tsx";
import type {IContactMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {addContact, fetchContact} from "../../app/contacts/ContactSlice.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {isLoading} from "../../app/contacts/ContactsSelectors.ts";

const AddForm = () => {
    const loading = useAppSelector(isLoading);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const onAddContact = async (item: IContactMutation) => {
        await dispatch(addContact(item));
        navigate('/')
        toast.success('Contacts added successfully!');
        await dispatch(fetchContact())
    }


    return (
        <>
            <Form addContact={onAddContact} loading={loading}/>
        </>
    );
};

export default AddForm;