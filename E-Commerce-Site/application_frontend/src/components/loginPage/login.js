import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { GoogleOauthLogin } from '../../services/oauthService';

const theme = createTheme();

export default function Login({onChange, handleSubmit, errors}) {

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            marginBottom : 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login in
          </Typography>
          <Box component="form" onSubmit={e => handleSubmit(e)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {e => onChange(e)}
              error = {!errors.email ? false : true}
              helperText= {!errors.email ? '' : errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {e => onChange(e)}
              error = {!errors.password ? false : true}
              helperText= {!errors.password ? '' : errors.password}
            />
            {
              errors.authFail && <Alert severity="error">{errors.authFail}</Alert>
            }
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3}}
            >
              Sign In
            </Button>
            <Grid container flexDirection={'column'} alignItems={'center'}>
              <h4>OR</h4>
              <Grid item><GoogleOauthLogin /></Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link to=''>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/signup'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}