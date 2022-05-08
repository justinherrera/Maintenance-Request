import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            You are now logged in as an Admin!
          </Typography>
          <Button color="inherit" onClick={() => window.location.href="/"}>
              Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header