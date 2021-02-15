import { TableCell, TableRow } from '@material-ui/core';
import {
    makeStyles,
    createStyles,
    Theme,
    withStyles
} from '@material-ui/core/styles';

export const useStyles = makeStyles({
  table:{
    minWidth:700,
  },
});

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      color: theme.palette.common.white,
      backgroundColor:theme.palette.common.black,
      border:'1px solid white'
    },
    body: {
      fontSize: 14,
      border:'1px solid black'
    },
    root:{
      textAlign:'center'
    }
  }),
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      hover:{
        backgroundColor: theme.palette.action.hover,
    }
    },
  }),
)(TableRow);
