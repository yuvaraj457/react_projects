import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Grid, Paper } from '@mui/material';
import DebitCard from './payments/debitCard';

export default function PaymentField() {
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    let show;

    if(value == 'DebitCard'){
        show = <DebitCard/>
    }

    return (
        <Paper sx={{ p: 1, mt: 1, mr: 1, }} style={{ borderBottom: '2px solid #9c27b0', borderLeft: '8px solid #9c27b0' }}>
            <Grid container spacing={2} flexDirection={'column'} alignItems={'center'}>
                <Grid item>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Payment</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
                            <FormControlLabel value="DebitCard" control={<Radio />} label="Debit card" />
                            {show}
                            <FormControlLabel value="Netbanking" control={<Radio />} label="Netbanking" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item>
                    
                </Grid>
            </Grid>
        </Paper>

    );
}
