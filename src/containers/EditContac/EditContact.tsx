import Form from "../../components/Form/Form.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useNavigate, useParams} from "react-router-dom";
import {isLoading, selectOnePerson} from "../../app/contacts/ContactsSelectors.ts";
import {useEffect} from "react";
import {editContact, getOneContact} from "../../app/contacts/ContactSlice.ts";
import type {IContactMutation} from "../../types";
import {toast} from "react-toastify";


const EditContact = () => {
    const {id} = useParams<{ id: string }>()
    const loading = useAppSelector(isLoading);
    const dispatch = useAppDispatch();
    const person = useAppSelector(selectOnePerson)
    const navigate = useNavigate();


    useEffect(() => {
        if (id) dispatch(getOneContact(id));
    }, [id, dispatch]);

    const editPerson = async (item: IContactMutation) => {
        if (id) {
            await dispatch(editContact({id, item}));
            toast.success('Contact updated successfully!');
            navigate('/');
        }
    };

    return (

        <>
            {person &&
                (<Form isEdit={true} loading={loading} initialValues={person} addContact={editPerson}/>)
            }
        </>

    );
};

export default EditContact;