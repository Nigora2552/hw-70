import {CircularProgress, Paper} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {fetchContact} from "../../app/contacts/ContactSlice.ts";
import {isLoading, selectCreateContact} from "../../app/contacts/ContactsSelectors.ts";

const PersonCard = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(isLoading)
    const peoples = useAppSelector(selectCreateContact)

    useEffect(() => {
        dispatch(fetchContact())
    }, [dispatch]);

    return (
       <>
           {loading && <CircularProgress/>}
           {!loading && <>
               {!loading && !peoples && <p>No contacts yet</p>}
               {peoples && peoples.map(person => (
                   <Paper key={person.id}>
                       <div>
                           <img src={person.photo} alt={person.name}/>
                           <p>{person.name}</p>
                       </div>
                   </Paper>
               ))}
           </>}
       </>
    );
};

export default PersonCard;