import * as React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Grid } from '@mui/material';

function Row({ row, user }) {
    let profile = '';
    if (row === 'My Profile') {
        profile = user
        delete profile['cartProducts']
        delete profile['emailVerified']
        delete profile['googleUser']
    }

    const { cartProductDetails } = useSelector(state => state.cartReducer)

    const selectedOption = (option) => {
        if (option === 'My Profile') {
            const data = <>
                <TableBody>
                    {Object.keys(profile).map((key, index) =>
                        <TableRow key={index}>
                            {(key !== 'address') &&
                                <>
                                    <TableCell align="center">
                                        <b>{key.toUpperCase()}</b>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Grid container justifyContent={'space-between'}>
                                            <Grid item>
                                                {profile[key]}
                                            </Grid>
                                            <Grid item>
                                                {(key === 'phone' || key === 'activeAddress') && <Link to={`/editProfile/${key}`}>Edit</Link>}
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </>
                            }
                        </TableRow>
                    )}
                </TableBody>
            </>
            return data
        }

        else if (option === 'My Cart') {
            const data = cartProductDetails.length > 0 ? <>
                <TableHead>
                    <TableRow>
                        <TableCell>Products</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartProductDetails.map((item, index) =>
                        <TableRow key={index}>
                            <TableCell align="center">
                                {item.productName.toUpperCase()}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </>
                :
                <TableBody>
                    <TableRow>
                        <TableCell align="center">
                            <h4>Cart is empty</h4>
                        </TableCell>
                    </TableRow>
                </TableBody>
            return data
        }

        else if (option === 'Security') {
            const data = <TableBody>
                <TableRow>
                    <TableCell>
                        <Link to={`/security/changePassword`}>Change Password</Link>
                    </TableCell>
                </TableRow>
            </TableBody>
            return data
        }
    }

    const [open, setOpen] = React.useState(false);
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    {row}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1, padding: 3 }}>

                            <Table aria-label="purchases">
                                {
                                    selectedOption(row)
                                }
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const rows = [
    'My Profile', 'My Cart', 'Security'
];

export const ProfileCard = ({ user }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableBody>
                    {rows.map((row) => (
                        !(user.googleUser && row === 'Security') && <Row key={row} row={row} user={user} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
