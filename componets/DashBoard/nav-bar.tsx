import React from 'react';
import clsx from 'clsx';
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Badge,
    CssBaseline,
} from '@material-ui/core';

import {
    Menu,
    Search,
    Notifications,
    BrightnessHigh,
} from '@material-ui/icons';

import { navStyles } from '../../styles/dashBoard/nav-bar';
interface propsTypes{
    open :boolean;
    handleDrawerOpen:() => void;
}
const NavBar: React.FC<propsTypes> = (props:React.PropsWithChildren<propsTypes>): JSX.Element => {
    const classes = navStyles();

    return (
        <div >
            <CssBaseline />
            <AppBar position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]:props.open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]:props.open,
                        })}
                    >
                        <Menu />
                    </IconButton>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <Notifications />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit">
                            <BrightnessHigh />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default NavBar;
