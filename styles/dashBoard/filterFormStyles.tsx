import {
    makeStyles,
    createStyles,
    Theme,
} from '@material-ui/core/styles';
export const filterStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      display:'flex',
    },
    inputBox:{
      diplay:"block",
      marginRight:theme.spacing(3)
    },
    searchBox:{
      marginTop:theme.spacing(5)
    },
    selectBox:{
      minWidth: 150,
      marginTop:theme.spacing(2)
    }
  })
)