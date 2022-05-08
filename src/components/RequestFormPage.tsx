import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from 'axios'


const theme = createTheme();

const RequestFormPage = () => {

    const [formRequest, setFormRequest] = React.useState({
        name: '',
        problem: ''
    })
    const [isFormInvalid, setIsFormInvalid] = React.useState({
        name: false,
        problem: false
    })

    const [isFormSuccessful, setIsFormSuccessful] = React.useState(false)
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(formRequest.name !== '' && formRequest.problem !== '') {
            axios.post(`http://localhost:4000/maintenance-requests  `, { 
                name: formRequest.name,
                problem: formRequest.problem 
            })
            .then(res => {
              console.log(res.data);
              setFormRequest({
                  name: '',
                  problem: ''
              })
    
              setIsFormSuccessful(true)
              setIsFormInvalid({
                  name: false,
                  problem: false
              })
              setInterval(() => {
                setIsFormSuccessful(false)
              }, 2000)
            })
        } else if (formRequest.name === '' && formRequest.problem !== '') {
            setIsFormInvalid({
                name: true,
                problem: false
            })
        } else if (formRequest.name !== '' && formRequest.problem === '') {
            setIsFormInvalid({
                name: false,
                problem: true
            })
        } else if (formRequest.name === '' && formRequest.problem === '') {
            setIsFormInvalid({
                name: true,
                problem: true
            })
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                {
                    (isFormSuccessful) ? <Alert severity="success">Request Submitted</Alert> : ''
                }
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Typography component="h1" variant="h5">
                        Maintenance Request Form
                    </Typography>
                </Box>

                <Box
                    component="form" 
                    onSubmit={handleSubmit} 
                    noValidate
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <TextField 
                        error={(isFormInvalid.name) ? true : false}
                        id="outlined-basic" 
                        label="Name" 
                        variant="outlined" 
                        margin="normal"
                        value={formRequest.name}
                        helperText={(isFormInvalid.name) && "Name cannot be empty"}
                        onChange={(event) => setFormRequest({ name: event.target.value, problem: formRequest.problem })}
                    />

                    <TextField
                        error={(isFormInvalid.problem) ? true : false}
                        id="outlined-multiline-static"
                        label="Describe the Problem"
                        multiline
                        rows={4}
                        margin="normal"
                        value={formRequest.problem}
                        helperText={(isFormInvalid.problem) && "Problem Description cannot be empty"}
                        onChange={(event) => setFormRequest({ name: formRequest.name, problem: event.target.value })}
                    />

                    <Button type="submit" variant="contained">Submit</Button>
                </Box>

            

            </Container>
        </ThemeProvider>
    )
}

export default RequestFormPage