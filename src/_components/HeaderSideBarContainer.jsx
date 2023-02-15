import { React, useState } from 'react';
//components
import {Header} from './_common';
import {Drawer} from './_common';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '_store';

export {HeaderSidebarContainer};

const HeaderSidebarContainer = ({ DrawerHeader }) => {

    const [open, setOpen] = useState(true);
    const [anchorElNav, setAnchorEl] = useState(null);
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const loginUser = useSelector(x => x.auth.user);

    const handleLogout = () => dispatch(authActions.logout());

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Header
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                anchorElNav={anchorElNav}
                handleClose={handleClose}
                handleLogout={handleLogout}
                loginUser={loginUser}
                handleMenu={handleMenu}
            />
            <Drawer
                open={open}
                DrawerHeader={DrawerHeader}
                handleDrawerClose={handleDrawerClose} />
        </div>
    );
};

