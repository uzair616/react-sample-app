import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Toastify from 'toastify-js'

// CSS files.
import "toastify-js/src/toastify.css"

const Home = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = { email: email }

    axios.post('http://localhost:3000/api/send_invitation', body)
    .then((response) => {
      toast(response.data.json_content.message)
      setEmail('');
    })
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('currentUser');
  }

  const toast = (message) => {
    Toastify({
      text: message,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
  }

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    
    if (currentUser == null || !currentUser.token) {
      window.location = '/login'
    } else {
      setCurrentUser(currentUser.email)
    }
  }, [email])

  return (
    <div className='container p-5'>
      <h3>Welcome! { currentUser }</h3>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleLogout}
      >
        logout
      </Button>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Invite User
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Invite User
          </Button>
          </Box>
        </Box>
      </Grid>
    </div>
  )
}

export default Home;