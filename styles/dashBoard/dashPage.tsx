import {
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core/styles';

const drawerWidth = 240;

export const pageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
          },
        listText:{
            fontSize:'3rem',
            fontWeight:900
          },
        drawerStyles: {
            background: 'linear-gradient(to right,#edf2f0, #edf2f0 , #7ddbb6)',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap'
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        iconButton:{
            marginTop:theme.spacing(2),
            marginBottom:theme.spacing(2)
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(2),
          }
    })
)