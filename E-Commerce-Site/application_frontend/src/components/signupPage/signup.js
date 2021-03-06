import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import MuiPhoneNumber from "material-ui-phone-number";
import { Link } from 'react-router-dom';
import { AlertTitle } from '@mui/material';


export const SignUp = ({onChange, handleSubmit, errors, emailVerifyHandler, message}) => {
  return (
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom : 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={e => handleSubmit(e)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange = {e => onChange(e)}
                  autoFocus
                  error = {!errors.firstName ? false : true}
                  helperText= {!errors.firstName ? '' : errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange = {e => onChange(e)}
                  error = {!errors.lastName ? false : true}
                  helperText= {!errors.lastName ? '' : errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange = {e => onChange(e)}
                  error = {!errors.email ? false : true}
                  helperText= {!errors.email ? '' : errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button onClick={emailVerifyHandler}>verify</Button>
              </Grid>
              
              {
              message &&
              <Grid item xs={12}>
                <Alert severity='success'>{message}</Alert>
              </Grid>
              }

              <Grid item xs={12}>
                <MuiPhoneNumber
                      required
                      fullWidth
                      name="phone"
                      label="Phone Number"
                      data-cy="user-phone"
                      defaultCountry={"in"}
                      onChange = {(value) => {
                        const e = {
                          target : {
                            name : 'phone',
                            value  
                          }
                        }
                        return onChange(e)
                      }}
                      error = {!errors.phone ? false : true}
                  helperText= {!errors.phone ? '' : errors.phone}
                    />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange = {e => onChange(e)}
                  error = {errors.password && !errors.isStrongPassword? true : false}
                  helperText= {errors.password && errors.password !== 'Password is strong' ? errors.password : ''}
                />
                {
                  errors.isStrongPassword && <Alert severity="success">{errors.password}</Alert>
                }
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  onChange = {e => onChange(e)}
                  error = {errors.confirmPassword && errors.confirmPassword !== 'Password Matched'? true : false}
                  helperText= {!errors.confirmPassword ? '' : errors.confirmPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" >
                  Already have an account? Login in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}