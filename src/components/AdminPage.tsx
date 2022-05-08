import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

interface Auth {
  username: string
  password: string
}


const theme = createTheme();

const AdminPage = () => {
  let navigate = useNavigate();
  const [isLoginInvalid, setIsLoginInvalid] = React.useState({
    username: false,
    password: false
  })
  const [user, setUser] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () =>{
      try {
        const {data: response} = await axios.get('http://localhost:4000/admin');
        console.log(response)
        setUser(response);
      } catch (error) {
        // console.error(error.message);
      }
    }

    fetchData();
  }, []);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username')
    const password = data.get('password')

    user.map((auth: Auth) => {
      if(username === auth.username && password === auth.password) {
        setIsLoginInvalid({
          username: false,
          password: false
        })
        return navigate('/dashboard')
      } else if (username === auth.username && password !== auth.password) {
        setIsLoginInvalid({
          username: false,
          password: true
        })
      } else if (username !== auth.username && password === auth.password) {
        setIsLoginInvalid({
          username: true,
          password: false
        })
      } else {
        setIsLoginInvalid({
          username: true,
          password: true
        })
      }
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error={(isLoginInvalid.username) ? true : false}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              helperText={(isLoginInvalid.username) && "Incorrect username."}
              autoFocus
            />
            <TextField
              error={(isLoginInvalid.password) ? true : false}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              helperText={(isLoginInvalid.password) && "Incorrect password."}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          <Link href="/request">Request a maintenance</Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AdminPage