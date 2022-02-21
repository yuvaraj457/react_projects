import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteUserAlertDialog({openDialog, deleteUserHandler, dialogCloseHandler}) {

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={dialogCloseHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteUserHandler}>yes</Button>
          <Button onClick={dialogCloseHandler} autoFocus>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
