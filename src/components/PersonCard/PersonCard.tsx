import type {IContact} from "../../types";
import Box from "@mui/material/Box";
import type {MouseEventHandler} from "react";

interface Props {
    person: IContact;
    open: MouseEventHandler
}

const PersonCard: React.FC<Props> = ({person,open}) => {

    let placeholder = person.photo;

    if (person.photo === '') {
        placeholder = 'https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-18055.jpg';
    }
  
    return (
        <>
            <Box onClick={open} sx={{display: "flex", alignItems: 'center', gap: 27}}>
                <img width={'100px'} src={placeholder} alt={ person.name}/>
                <p>{person.name}</p>
            </Box>
        </>
    );
};

export default PersonCard;