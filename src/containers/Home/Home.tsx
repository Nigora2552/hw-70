import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {fetchContact, getContact, removeContact} from "../../app/contacts/ContactSlice.ts";
import {isLoading, selectCreateContact, selectOneContact} from "../../app/contacts/ContactsSelectors.ts";
import {Button, CircularProgress, Paper} from "@mui/material";
import PersonCard from "../../components/PersonCard/PersonCard.tsx";
import Modal from "../../components/UI/Modal/Modal.tsx";
import type {IContact} from "../../types";
import {NavLink, useNavigate} from "react-router-dom";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import {toast} from "react-toastify";

const Home = () => {

    const dispatch = useAppDispatch();
    const loading = useAppSelector(isLoading)
    const peoples = useAppSelector(selectCreateContact);
    const item = useAppSelector(selectOneContact)
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const get = (onePerson: IContact) => {
        setShowModal(true);
        dispatch(getContact(onePerson))
    }

    useEffect(() => {
        dispatch(fetchContact())
    }, [dispatch]);

    const onDeleteContact = async (id: string) => {
        await dispatch(removeContact(id));
        toast.success('Contact will be deleted!')
        navigate('/')
    }

    return (
        <>

            {loading && <CircularProgress/>}
            {!loading && peoples && peoples.length === 0 &&
                <h1 style={{color: 'red', textAlign: 'center'}}>Contacts no yet! Please Add some contact!</h1>}
            {!loading && <>
                {peoples && peoples.map(person => (
                    <Paper key={person.id}
                           sx={{width: '50%', marginBottom: '20px', padding: '20px'}}>
                        <PersonCard person={person} open={() => get(person)}/>

                        <Modal show={showModal} close={() => setShowModal(false)}>
                            {item &&
                                <div className='d-flex  align-items-center gap-5'>

                                    {item.photo === '' ?
                                        <img
                                             src='https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-18055.jpg'
                                             alt={item.name}/> : <p style={{width: '200px'}}><img width='100%' src={item.photo} alt={item.name}/></p>}
                                    <div style={{width: '100%'}}>
                                        <h1>{item.name}</h1>
                                        <div><AddIcCallIcon fontSize='small' sx={{margin: '0 10px 0'}}/> <a
                                            href='#'>{item.phone}</a></div>
                                        <div><MarkunreadIcon fontSize='small' sx={{margin: '0 10px 0'}}/><a
                                            href='#'>{item.email}</a></div>
                                    </div>
                                </div>
                            }
                            <Button component={NavLink} to={`/${person.id}/edit-contact`} color='primary'
                                    variant="outlined">Edit</Button>
                            <Button color='error' variant="outlined"
                                    sx={{margin: '10px'}} onClick={() => onDeleteContact(person.id)}>Delete</Button>
                        </Modal>
                    </Paper>
                ))}
            </>}
        </>
    );
};

export default Home;