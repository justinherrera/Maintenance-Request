import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HomePage = () => {
  return (
    <Box sx={{     
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <Link href="/admin">Login as an Admin</Link>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Link href="/request">Request a maintenance</Link>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage