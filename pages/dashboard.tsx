import React from 'react';
import clsx from 'clsx';
import {
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    useTheme,
    MuiThemeProvider,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import {
    EmojiPeople,
    ChevronLeft,
    HomeWork,
    ChevronRight,
    DashboardOutlined,
    LocalAtm
} from '@material-ui/icons';

import DashBoardTabel from '../componets/DashBoard/dashTabel';
import NavBar from '../componets/DashBoard/nav-bar';
import { pageStyles } from '../styles/dashBoard/dashPage';
import FilterForm from '../componets/DashBoard/filterForm';

function Dashboard(): JSX.Element {
    const classes = pageStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const icons = [<DashboardOutlined style={{ color: '#0be678' }} />,
    <HomeWork style={{ color: '#0be678', fontSize: 30 }} />,
    <LocalAtm style={{ color: '#0be678', fontSize: 30 }} />,
    <EmojiPeople style={{ color: '#0be678', fontSize: 30 }} />,
    <LocalAtm style={{ color: '#0be678', fontSize: 30 }} />
    ]
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = (): void => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                        [classes.drawerStyles]: open
                    }),
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Dashboard', 'Services', 'Dispatcher pannel', 'Service boy', 'Tansactions'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon className={classes.iconButton} >{index < icons.length ? icons[index] : " "}</ListItemIcon>
                            <ListItemText className={classes.listText} primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.drawerHeader} />
                <MuiThemeProvider theme={theme}>
                    <FilterForm />
                    <DashBoardTabel />
                </MuiThemeProvider>
            </main>
        </div>
    )
}
export default Dashboard;