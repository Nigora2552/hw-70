import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";

const ToolBar = () => {
    return (
        <Box sx={{ flexGrow: 1, marginY: '20px' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to='/'
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textDecoration:'none', color: 'inherit' }}
                    >
                        Contacts
                    </Typography>
                    <Button variant="outlined" sx={{color: '#fff', border: '1px solid #000'}} component={NavLink} to='/new'>Add new contacts</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ToolBar;