import React, { useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { MetaMaskContext } from "../../context/metamask";
import { MetaMaskConnector } from "../../containers/MetaMaskConnector/MetaMaskConnector";
import Grid from '@mui/material/Grid/Grid';

const pages = ['Dashboard', 'Extrinsics', 'Tools'];

const Navbar = () => {
  const [state] = useContext(MetaMaskContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { md: 'flex', xs: 'none'  }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              color: 'inherit',
              display: { md: 'flex', xs: 'none' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              mr: 2,
              textDecoration: 'none',
            }}
          >
            EdgeSnap
          </Typography>
          { 
            state.polkadotSnap.isInstalled && <>
              <Box sx={{  display: {  md: 'none', xs: 'flex', }, flexGrow: 1, }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'bottom'
                  }}
                  keepMounted
                  transformOrigin={{
                    horizontal: 'left',
                    vertical: 'top'
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: {md: 'none', xs: 'block'},
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link style={{color:"whitesmoke", textDecoration:"none"}} to={`/${page}`}>{page}</Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          }
          <AdbIcon sx={{ display: { md: 'none', xs: 'flex'}, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              color: 'inherit',
              display: {  md: 'none', xs: 'flex'},
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              mr: 2,
              textDecoration: 'none',
            }}
          >
            EdgeSnap
          </Typography>
          { 
            state.polkadotSnap.isInstalled && <>
              <Box sx={{ display: {  md: 'flex', xs: 'none' }, flexGrow: 1, }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ color: 'white', display: 'block',my: 2, textTransform:"initial" }}
                  >
                    <Link style={{color:"whitesmoke", textDecoration:"none"}} to={`/${page}`}>{page}</Link>
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                  }}
                  keepMounted
                  transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                </Menu>
              </Box>
            </>
          }
        </Toolbar>
      </Container>
      <Grid container justifyContent={"right"}>
        {
          !state.polkadotSnap.isInstalled && <MetaMaskConnector />
        }
      </Grid>
    </AppBar>
  );
};

export default Navbar;