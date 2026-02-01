import {Button, CircularProgress, Grid, TextField} from "@mui/material";
import {NavLink} from "react-router-dom";
import {type ChangeEvent, useState} from "react";
import type {IContactMutation} from "../../types";

interface Props {
    addContact: (contact: IContactMutation) => void;
    initialValues?: IContactMutation;
    isEdit?: boolean;
    loading?: boolean;
}

const Form: React.FC<Props> = ({isEdit=false,addContact,loading=false,initialValues={
    name: '',
    phone: '',
    email: '',
    photo: '',
}}) => {
    const [form, setForm] = useState<IContactMutation>(initialValues);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addContact({...form});

        setForm(initialValues)
    }

    const OnFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }


    return (
        <form style={{width: '70%', margin: '0 auto'}} onSubmit={onSubmit}>
            <h1>{isEdit ? 'Edit' : 'Add new'} contacts</h1>
            <Grid container spacing={2} sx={{marginY: '30px'}}>
                <Grid size={8}>
                    <TextField
                        fullWidth
                        type='text'
                        id="name"
                        label="Name"
                        variant="outlined"
                        name='name'
                        value={form.name}
                        onChange={OnFieldHandler}
                    />
                </Grid>
                <Grid size={8}>
                    <TextField
                        fullWidth
                        type='text'
                        id="phone"
                        label="Phone number"
                        variant="outlined"
                        name='phone'
                        value={form.phone}
                        onChange={OnFieldHandler}
                    />
                </Grid>
                <Grid size={8}>
                    <TextField
                        fullWidth
                        type='email'
                        id="email"
                        label="email"
                        variant="outlined"
                        name='email'
                        value={form.email}
                        onChange={OnFieldHandler}
                    />
                </Grid>
                <Grid size={8}>
                    <TextField
                        fullWidth
                        type='url'
                        id="photo"
                        label="photo"
                        variant="outlined"
                        name='photo'
                        value={form.photo}
                        onChange={OnFieldHandler}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Button type='submit' variant="contained">{isEdit ? 'Edit' : 'Save'} {loading && <CircularProgress/>}</Button>
                <Button variant="contained" component={NavLink} to='/'>Back to contacts</Button>
            </Grid>
        </form>
    );
};

export default Form;