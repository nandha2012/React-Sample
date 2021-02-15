import {
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core/styles';

export const formStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      flexGrow: 1,
      width:'500px',
      alignContent:"center"
    },
    heading:{
      alignContent:"center",
      margin:"0 0 5% 0"
    },
    dropZone:{
      width:"200px",
    }
  }),
);
