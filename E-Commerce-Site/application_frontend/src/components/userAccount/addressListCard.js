import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import Radio from '@mui/material/Radio';

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

export default function AutoGridNoWrap() {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  }

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>

      <Paper sx={{ maxWidth: 400, my: 1, mx: 'auto', p: 2 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
          <Radio {...controlProps('a')} />
          </Grid>
          <Grid item xs>
            <Typography>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ maxWidth: 400, my: 1, mx: 'auto', p: 2 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
          <Radio {...controlProps('b')} />
          </Grid>
          <Grid item xs>
            <Typography>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* <Box component="form" noValidate onSubmit={e => handleSubmitAddress(e)}
            sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <h4>Enter the address</h4>
            <Grid container xs={6} spacing={2}>
                <Grid item xs={12} >
                    <TextField
                        autoComplete="no"
                        name="No"
                        required
                        fullWidth
                        id="firstName"
                        label="Plot No/House No"
                        onChange = {e => onChangeAddress(e)}
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        required
                        fullWidth
                        id="Area"
                        label="Area"
                        name="Area"
                        autoComplete="address"
                        onChange = {e => onChangeAddress(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="locality"
                        label="locality"
                        name="locality"
                        autoComplete="locality"
                        onChange = {e => onChangeAddress(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="state"
                        label="state"
                        id="state"
                        onChange = {e => onChangeAddress(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="pincode"
                        label="pincode"
                        id="pincode"
                        onChange = {e => onChangeAddress(e)}
                    />
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, ml:2 }}
                >
                    update
                </Button>
            </Grid>
        </Box> */}
    </Box>
  );
}
