import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, MenuItem, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';


export const UserTable = ({ user, selectHandler, selectValue, userTypeSubmitHandler, message, deleteUserHandler, t, dialogOpenHandler }) => {
    const userTypes = ['user', 'superuser']

    return (
        <TableContainer component={Paper}>
            {message &&
                <Alert severity="success">{message}</Alert>}
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                    {Object.keys(user).map((field) => (
                        <TableRow
                            key={field}
                        >
                            <TableCell component="th" scope="row">
                                {field}
                            </TableCell>
                            <TableCell align="center">{user[field]}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label={t("Promote as")}
                                sx={{ width: 250 }}
                                size='small'
                                value={selectValue}
                                onChange={selectHandler}
                            >
                                {userTypes.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {t(option)}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </TableCell>
                        <TableCell align="center">
                            <Button variant="outlined" onClick={userTypeSubmitHandler}>{t('promote')}</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Button variant="outlined" color='error' onClick={dialogOpenHandler}>Delete</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
