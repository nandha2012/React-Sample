import {
	TextField, Grid,
	Typography, Container,
	Button, FormControlLabel,
	Checkbox,
	Snackbar,
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Compressor from 'compressorjs';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import store from "../../redux/store"
import { addChange, addError, removeError, addFile, addImage } from '../../redux/actions/action'
import { formStyles } from '../../styles/registrationFormStyle';
import React, { useState } from 'react';
import { isValid } from "../../validation/form_validation";
import { postForm } from '../../services/routers';
import { POST_STATUS } from '../../utils/const';

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
const RegistrationForm: React.FC = (props: any): JSX.Element => {
	const classes = formStyles();
	const [snackState, setSnack] = useState({
		successTost:false,
		failureTost:false

	});
	const validateField = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		let field = event.target.id;
		let fieldVale = event.target.value;
		isValid(field, fieldVale, props);
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		props.addChange(event.target.id, event.target.value);
	}

	const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			props.addError("error_checked");
		}
		else {
			props.removeError("error_checked")
		}
	}
	const handleImage = (files: any): void => {
		if (files.length > 0) {
			new Compressor(files[0], {
				quality: 0.8,
				convertSize: 1000000,
				success(result) {
					props.addImage(result);
				},
				error(err) {
					console.log(err.message);
				},
			});
		}
	}
	const handleFile = (files: any) => {
		if (files.length > 0) {
			new Compressor(files[0], {
				quality: 0.8,
				convertSize: 1000000,
				success(result) {
					props.addFile(result);
				},
				error(err) {
					console.log(err.message);
				},
			});
		}
	}
	const handleSubmit = () => {
		var state = store.getState();
		if (props.state.errorReducer.error_validate) {
			const data = new FormData();
			console.log(state.fileReducer)
			data.append('data', JSON.stringify(state.formReducer));
			data.append("userImage", state.fileReducer.userImage);
			data.append("userFile", state.fileReducer.userFile);
			postForm(data).then(()=>{POST_STATUS ? setSnack((snackState)=>({...snackState,successTost:true})): 
									setSnack((snackState)=>({...snackState,failureTost:true}))})
			}
	}
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnack((snackState) =>({...snackState,
			successTost:false,
		}));
		//window.location.reload(false);
	};
	return (
		<Container component="main" maxWidth="sm" >
			<Typography variant="h3" className={classes.heading}>Create your account</Typography>
			<Grid container className={classes.root} spacing={2} >
				<Grid item xs={12}>
					<TextField variant="outlined"
						label="First Name"
						id="firstName"
						inputProps={{ maxLength: 15 }}
						fullWidth
						onChange={handleChange} />
				</Grid>
				<Grid item xs={12}>
					<TextField variant="outlined"
						label="Last Name"
						inputProps={{ maxLength: 15 }}
						id="lastName"
						onChange={handleChange}
						fullWidth />
				</Grid>
				<Grid item xs={12}>
					<TextField variant="outlined"
						label="Email Id"
						id="emailId"
						inputProps={{ maxLength: 40 }}
						error={props.state.errorReducer.error_email}
						onChange={handleChange}
						onBlur={validateField}
						helperText={props.state.errorReducer.error_email ? "Enter valid email" : ""}
						fullWidth />
				</Grid>
				<Grid item xs={12}>
					<TextField variant="outlined"
						label="Mobile Number"
						id="mobile"
						type="string"
						inputProps={{ maxLength: 10 }}
						error={props.state.errorReducer.error_mobile}
						onChange={handleChange}
						onBlur={validateField}
						helperText={props.state.errorReducer.error_mobile ? "Enter valid mobile number" : ""}
						fullWidth />
				</Grid>
				<Grid item xs={12}>
					<TextField variant="outlined"
						label="New Password"
						id="password"
						type="password"
						inputProps={{ maxLength: 15 }}
						error={props.state.errorReducer.error_password}
						helperText={props.state.errorReducer.error_password ? "strong password must have 8 letters with atleast 1 symbols" : ""}
						onChange={handleChange}
						onBlur={validateField}
						fullWidth />
				</Grid>
				<Grid item xs={12}>
					<TextField variant="outlined"
						error={props.state.errorReducer.error_Cpassword}
						label="Confirm Password"
						id="confirmPassword"
						onChange={handleChange}
						fullWidth
						inputProps={{ maxLength: 15 }}
						type="password"
						helperText={props.state.errorReducer.error_Cpassword ? "Passwords did not match" : ""}
						onBlur={validateField} />
				</Grid>
				<Grid container item xs={12}>
					<Grid item xs={6}>
						<DropzoneArea dropzoneClass={classes.dropZone}
							filesLimit={1}
							acceptedFiles={['image/*']}
							maxFileSize={5242880}
							showPreviewsInDropzone={true}
							onChange={handleImage}
							dropzoneText="Drag and drop a profile Photo here or click" />
					</Grid>
					<Grid item xs={6}>
						<DropzoneArea
							dropzoneClass={classes.dropZone}
							filesLimit={1}
							maxFileSize={2097152}
							showPreviewsInDropzone={true}
							onChange={handleFile}
							dropzoneText="Drag and drop a file  here or click" />
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								id="checkBox"
								checked={props.state.errorReducer.error_checked}
								onChange={handleCheck}
								name="checkedB"
								color="primary"
							/>
						}
						label="I accept terms and conditions"
					/>
				</Grid>
				<Grid container item xs={12} justify='center' >
					<Button variant="contained"
						type="submit"
						color='secondary'
						disabled={(props.state.errorReducer.error_validate
							&& props.state.errorReducer.error_checked) ? false : true}
						onClick={handleSubmit} >Submit</Button>
					<Snackbar open={snackState.successTost} onClose={handleClose}>
						<Alert onClose={handleClose} severity="success">
							Account successfully Created ! 
        				</Alert>
					</Snackbar>
					<Snackbar open={snackState.failureTost}  onClose={handleClose}>
						<Alert onClose={() =>{setSnack(() =>({...snackState,failureTost:false}))}} severity="error">
							Account Creation failed ! 
        				</Alert>
					</Snackbar>
				</Grid>
			</Grid>
		</Container>
	)
}
const mapStateToProps = (states: any) => {
	return {
		state: states
	}
}
const mapDispatchToProps = (dispatch: Dispatch) => { 
	return ({
		addChange: (field: any, fieldValue: string) => dispatch(addChange(field, fieldValue)),
		addError: (field: any) => dispatch(addError(field)),
		removeError: (field: any) => dispatch(removeError(field)),
		addFile: (fieldValue: any) => dispatch(addFile(fieldValue)),
		addImage: (fieldValue: any) => dispatch(addImage(fieldValue))
	});
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);