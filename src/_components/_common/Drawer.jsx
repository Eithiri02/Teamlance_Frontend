import { React, useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
//components
import '../../assets/styles/scss/appbar_sidemenu.scss';
import menus from '../../const/Side_Bar_Menu_List';
import CUSTOM_ICON_PACK from '../../const/Icon_packs';
import Colors from '../../assets/styles/js/Color';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { authActions } from '_store';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '_store';


export { Drawer };

const Drawer = ({
    DrawerHeader,
    handleDrawerClose,
    open,
}) => {

    const drawerWidth = 250;

    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );

    const sidemenu_items = menus;
    const theme = useTheme();
    const location = (useLocation()).pathname;
    const [anchorElNav, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => dispatch(authActions.logout());

    return (
        <Drawer variant="permanent" open={open} className="drawer-container"
            PaperProps={{
                sx: {
                    backgroundColor: Colors.MainThemeColor,
                }
            }}>
            <Box>
                <DrawerHeader>
                    <Box className="drawer-title-container">
                        <Typography className="drawer-title">
                            TeamLance
                        </Typography>
                    </Box>
                    {/* <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton> */}
                </DrawerHeader>
                <List className={`list-menu-container ${open ? 'open' : ''}`}>
                    {sidemenu_items.map((text, index) => (
                        <ListItem key={index} className={`list-menu-item ${text.type === 'link' ? open ? 'open' : 'close' : ''} ${text.link === location ? 'active' : ''}`} disablePadding sx={{ display: 'block', fontWeight: 'bold', fontSize: '1rem', color: Colors.WhiteThemeColor }}>
                            <Box className="list-item-link">
                                <Link to={text.link} sx={{ display: 'flex' }}>
                                    <ListItemButton
                                        sx={{
                                            gap: '15px',
                                            minHeight: 48,
                                            px: 2.5,
                                            color: Colors.WhiteThemeColor
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: '10px',
                                                // mr: open ? 3 : 'auto',
                                                '&.css-1fqi8hc-MuiButtonBase-root-MuiListItemButton-root': {
                                                    //color: Colors.GrayThemeColor,

                                                }
                                            }}

                                        >
                                            {CUSTOM_ICON_PACK[text.icon]}
                                        </ListItemIcon>
                                        <ListItemText primary={text.title} className={`list-item-text ${open ? 'open' : ''}`} />
                                    </ListItemButton>
                                </Link>
                                {
                                    (text.title === "Projects" || text.title === "Payments") && (
                                        <ListItemIcon
                                            sx={{
                                                textAlign: 'right',
                                                alignItems: 'center',
                                            }}

                                        >
                                            {CUSTOM_ICON_PACK.downChevron}
                                        </ListItemIcon>
                                    )
                                }
                            </Box>

                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box className="user-info-box-container">
                <Box className="user-box">

                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <div className="user-img"></div>
                    </IconButton>
                    <Box className="user-info-container">
                        <Typography className="user-name">
                            {authUser.firstName} {authUser.lastName}
                        </Typography>
                        <Typography className="company-name">
                            {authUser.companyName}
                        </Typography>
                    </Box>
                </Box>

                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    PaperProps={{
                        style: {
                            border: 'none', outline: 'none'
                        }
                    }}
                >
                    <Box sx={{ float: 'end' }}>{CUSTOM_ICON_PACK.ellipse}</Box>
                </IconButton>

                <Menu
                    PaperProps={{
                        style: {
                            marginTop: '32rem',
                            marginLeft: '5rem'
                        }
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    open={Boolean(anchorElNav)}
                    onClose={handleClose}

                >
                    <MenuItem onClick={logout}>
                        <Typography textAlign="center">
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <LogoutIcon sx={{ color: Colors.GrayThemeColor }} />
                            </IconButton>
                            Logout
                        </Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Drawer>
    );
};

export default Drawer;