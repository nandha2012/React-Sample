import * as React from 'react'
import * as _ from 'lodash'
import { Snackbar, SnackbarProps } from '@mui/material'
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert'

interface IsnackBarProps extends SnackbarProps {
  messageString: string
  severity: AlertColor
  handleClose: any
}
// eslint-disable-next-line react/display-name
const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
))

export default function CustomizedSnackbars(props: IsnackBarProps) {
  const { open, autoHideDuration, messageString, severity, handleClose } = props

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {messageString}
      </Alert>
    </Snackbar>
  )
}
