import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Divider } from '@material-ui/core';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/kshired">
        Kshired
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({ history }) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [zipcode, setZipcode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/users/signup`, {
        username,
        password,
        city,
        street,
        zipcode,
      });
      history.push('/signin');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            autoFocus
            onChange={({ target: { value } }) => {
              setUsername(value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <Divider />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="city"
            label="city"
            type="text"
            id="city"
            value={city}
            onChange={({ target: { value } }) => setCity(value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="street"
            label="street"
            type="text"
            id="street"
            value={street}
            onChange={({ target: { value } }) => setStreet(value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="zipcode"
            label="zipcode"
            type="text"
            id="zipcode"
            value={zipcode}
            onChange={({ target: { value } }) => setZipcode(value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href={'/signin'}>{'Do you have an account? Sign In'}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
