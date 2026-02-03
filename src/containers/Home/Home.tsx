import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {fetchContact, getContact} from "../../app/contacts/ContactSlice.ts";
import {isLoading, selectCreateContact, selectOneContact} from "../../app/contacts/ContactsSelectors.ts";
import {Button, CircularProgress, Paper} from "@mui/material";
import PersonCard from "../../components/PersonCard/PersonCard.tsx";
import Modal from "../../components/UI/Modal/Modal.tsx";
import type {IContact} from "../../types";
import {NavLink} from "react-router-dom";


const Home = () => {

    const dispatch = useAppDispatch();
    const loading = useAppSelector(isLoading)
    const peoples = useAppSelector(selectCreateContact);
    const item = useAppSelector(selectOneContact)
    const [showModal, setShowModal] = useState(false);

    const get = (onePerson: IContact) => {
        setShowModal(true);
        dispatch(getContact(onePerson))
    }


    useEffect(() => {
        dispatch(fetchContact())
    }, [dispatch]);

    return (
        <>

            {loading && <CircularProgress/>}
            {!loading && <>
                {!loading && !peoples && <p>No contacts yet</p>}
                {peoples && peoples.map(person => (
                    <Paper key={person.id}
                           sx={{width: '50%', marginBottom: '20px', padding: '20px'}}>
                        <PersonCard person={person} open={() => get(person)}/>

                        <Modal show={showModal} close={() => setShowModal(false)}>
                            {item &&
                                <div className='d-flex justify-content-between align-items-center w-50 gap-5'>

                                    {item.photo === '' ?
                                        <img style={{width: '45%'}}
                                             src='https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-18055.jpg'
                                             alt={item.name}/> : <p><img src={item.photo} alt={item.name}/></p>}
                                    <div>
                                        <h3>name: {item.name}</h3>
                                        <p>phone: {item.phone}</p>
                                    </div>
                                </div>
                            }
                            <Button component={NavLink} to={`/${person.id}/edit-contact`} color='primary'
                                    variant="outlined">Edit</Button>
                            <Button onClick={() => setShowModal(false)} color='error' variant="outlined"
                                    sx={{margin: '10px'}}>Close</Button>
                        </Modal>
                    </Paper>
                ))}
            </>}</>

    );
};

export default Home;