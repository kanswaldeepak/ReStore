import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Badge, FormControlLabel, FormGroup, List, ListItem, Switch, styled } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import { useStoreContext } from '../context/StoreContext';

interface Props {
    darkMode: boolean,
    handleThemeChangeApp: () => void
}
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const midLinks = [
    { title: 'catalog', path: '/Catalog' },
    { title: 'about', path: '/About' },
    { title: 'contact', path: '/Contact' },
]

const rightLinks = [
    { title: 'login', path: '/Login' },
    { title: 'register', path: '/Register' }
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'black'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));


export default function Header({ darkMode, handleThemeChangeApp }: Props) {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { basket } = useStoreContext();
    const itemCount = basket.items.reduce((sum, item) => sum + item.quantity, 0);


    return (
        <AppBar position="sticky" sx={{ mb: 4 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6" noWrap>RE-STORE</Typography>
                    <Typography
                        variant="h6" noWrap component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2, ml: 2, display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace', fontWeight: 700,
                            letterSpacing: '.3rem', color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        <FormGroup>
                            <FormControlLabel
                                control={<MaterialUISwitch sx={{ m: 1 }}
                                    onChange={handleThemeChangeApp} />}
                                label="" />
                        </FormGroup>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large" aria-label="account of current user"
                            aria-controls="menu-appbar" aria-haspopup="true"
                            onClick={handleOpenNavMenu} color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar" anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom', horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top', horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <List>
                                {midLinks.map(({ title, path }) => (
                                    <ListItem component={NavLink}
                                        to={path} key={path} sx={navStyles}>
                                        {title.toUpperCase()}
                                    </ListItem>
                                ))
                                }
                            </List>

                            <List>
                                {rightLinks.map(({ title, path }) => (
                                    <ListItem component={NavLink}
                                        to={path} key={path} sx={navStyles}>
                                        {title.toUpperCase()}
                                    </ListItem>
                                ))
                                }
                            </List>
                            {/* {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))} */}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <List sx={{ display: 'flex' }}>
                            {midLinks.map(({ title, path }) => (
                                <ListItem component={NavLink}
                                    to={path} key={path}
                                    sx={{ color: 'inherit' }}>
                                    {title.toUpperCase()}
                                </ListItem>
                            ))
                            }
                        </List>

                        {/* {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))} */}
                    </Box>

                    <Box sx={{ flexGrow: 0, mr: '15px' }} display={'flex'} alignItems={'center'}>
                        <List sx={{ display: 'flex' }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem component={NavLink}
                                    to={path} key={path}
                                    sx={{ color: 'inherit', display: 'block' }}>
                                    {title.toUpperCase()}
                                </ListItem>
                            ))
                            }
                        </List>
                        <IconButton component={Link} to='/basket' size='large' sx={{ color: 'inherit' }}>
                            <Badge badgeContent={itemCount} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};