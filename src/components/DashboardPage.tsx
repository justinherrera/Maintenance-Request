import React from 'react'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Header from './Header'
import axios from 'axios'

const theme = createTheme();

interface MaintenanceRequest {
  id: number
  name: string
  problem: string
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const DashboardPage = () => {
  const [requests, setRequests] = React.useState([])
  const [isDeleted, setIsClosed] = React.useState(false)

  React.useEffect(() => {
    const fetchData = async () =>{
      try {
        const {data: response} = await axios.get('http://localhost:4000/maintenance-requests');
        console.log(response)
        setRequests(response);
      } catch (error) {
        // console.error(error.message);
      }
    }

    fetchData();
  }, [isDeleted]);

  const closeIssue = (id: number) => {
    console.log(id)
    axios.delete(`http://localhost:4000/maintenance-requests/${id}`).then(() => {
      setIsClosed(true)
      setInterval(() => {
        setIsClosed(false)
      }, 2000)
    })
  }
  
  return (
    <React.Fragment>
      <Header />
      <ThemeProvider theme={theme}>
        <Container component="main">
          <Typography variant="h2">
            List of Requested Issue
          </Typography>

          { (isDeleted) ? <Alert severity="success">Issue Closed</Alert> : '' }

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
          {
            requests.map((request: MaintenanceRequest) => {
              return (
                <Grid item xs={4}>
                  <Item>
                    <Typography gutterBottom variant="h6" component="div">
                      {request.name}
                    </Typography> 
                    <Typography gutterBottom variant="body1" component="div">
                      {request.problem}
                    </Typography> 
                    <Button onClick={() => { closeIssue(request.id) }} variant="text" color="error">
                      Close Issue
                    </Button>
                  </Item>
                </Grid>
              )
            })
          }
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default DashboardPage