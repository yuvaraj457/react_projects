import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const AlertDialogSlide = ({ open, handleClose }) => {

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Login/Signup"}</DialogTitle>
            
                <DialogContentText id="alert-dialog-slide-description" mx={2}>
                    Please Login, if already have an account&nbsp;
                    <Link to='/login'>login</Link>
                </DialogContentText>
            
            <DialogActions sx={{ justifyContent: 'center', flexDirection:'column' }}>
                <p>OR</p>
                <Link to='/signup'style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="success">
                    Signup
                </Button>
                </Link>
            </DialogActions>
        </Dialog>
    );
}
