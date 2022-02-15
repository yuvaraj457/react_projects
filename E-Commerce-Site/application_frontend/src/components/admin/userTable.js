import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, MenuItem, TextField } from '@mui/material';


export const BasicTable = ({ user, selectHandler, selectValue, userTypeSubmitHandler}) => {
    const userTypes = ['user', 'superuser']

    return (
        <TableContainer component={Paper}>
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
                                label="Promote as"
                                sx={{ width: 250 }}
                                size='small'
                                value={selectValue}
                                onChange={selectHandler}   
                            >
                                {userTypes.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </TableCell>
                        <TableCell align="center">
                                <Button variant="outlined" onClick={userTypeSubmitHandler}>promote</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
