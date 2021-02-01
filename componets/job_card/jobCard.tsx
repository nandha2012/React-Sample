import React, { useState, useEffect } from 'react'
import {
    TextField, Grid,
    Typography, Container,
    Button, FormControlLabel,
    Checkbox,
    Snackbar,
    Box,
} from '@material-ui/core';

import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from '@material-ui/pickers';

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import DateFnsUtils from '@date-io/date-fns';
import { formStyles } from '../../styles/registrationFormStyle';
import { Autocomplete } from '@material-ui/lab';
import { JobDetails, POST_STATUS } from '../../utils/const'
import { getJobList, postJob } from '../../services/routers';

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  interface FilmOptionType {
    inputValue?: string;
    title: string;
    year?: number;
}
const Jobcard = (): JSX.Element => {
    const classes = formStyles();
    const [ selectedDate, setSelectedDate ] = useState<Date | null>(new Date());
    const [ errors ,setError ] = useState({
        nameError:false,
        typeError:false
    })
    const [jobdata ,setJobData ] = useState<any>([]);
    const [ jobDetails, setJobDetails ] = useState<JobDetails>({ name: "", jobType: "" });
    const [ snackState, setSnack ] = useState({
		successTost:false,
		failureTost:false

    });
    var jobList: any[] = [];
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJobDetails((jobDetails) => ({ ...jobDetails, [event.target.id]: event.target.value }))
    }

    const handleSubmit = () => {
        postJob({ ...jobDetails, date: selectedDate }).then(()=>{POST_STATUS ? setSnack((snackState)=>({...snackState,successTost:true})): 
									setSnack((snackState)=>({...snackState,failureTost:true}))});
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnack((snackState) =>({...snackState,
			successTost:false,
		}));
		//window.location.reload(false);
    };

    useEffect(() =>{
        const jobs = getJobList()
        jobs.then((result)=>{console.log(result.data);
            setJobData(result.data);
        })
        console.log(jobdata)
    },[])

    return (
        <Container component="main" maxWidth="sm">
            <Box style={{ marginTop: '200px', }}>
                <Typography variant="h3" align="center" className={classes.heading}>Assign Job</Typography>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <TextField variant="outlined"
                            label="Name"
                            id="name"
                            error={errors.nameError}
                            fullWidth
                            inputProps={{ maxLength: 15 }}
                            helperText={errors.nameError ? "! Required": ""}
                            onChange={handleChange}
                            onBlur = {(): void => {
                                if(jobDetails.name === ""){
                                    setError((errors)=>({...errors,nameError:true}))
                                }
                                else{
                                    setError((errors)=>({...errors,nameError:false}))
                                }    
                                }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            id="jobType"
                            options={jobdata}
                            getOptionLabel={(option): any=> {
                                return option.job_type;
                            }}
                            onChange={(event: any, newValue: any | null) => {
                                setJobDetails((jobDetails) => ({ ...jobDetails, jobType: `${newValue?.job_type}` }))
                            }}
                            fullWidth
                            renderInput={(params) =>
                                <TextField {...params} 
                                    name="jobType" 
                                    label="Combo box" 
                                    error={errors.typeError}
                                    variant="outlined"
                                    helperText={errors.typeError ? "! Required": ""}
                                    onBlur = {(): void => {
                                        if(jobDetails.jobType !== ""){
                                            setError((errors)=>({...errors,typeError:false}))
                                        }
                                        else{
                                            setError((errors)=>({...errors,typeError:true}))
                                        }    
                                        }}
                                    fullWidth />
                            }

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                                variant="inline"
                                format="yyyy/MM/dd HH:mm"
                                margin="normal"
                                fullWidth
                                disablePast
                                value={selectedDate}
                                onChange={setSelectedDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid container item xs={12} justify='center' >
                        <Button variant="contained" 
                                size="large" 
                                color="primary" 
                                onClick={handleSubmit}
                                disabled={jobDetails.name !== "" && jobDetails.jobType !== "" ? false: true}>
                            Submit
                    </Button>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar open={snackState.successTost} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                        Job Assigned successfully !
        				</Alert>
            </Snackbar>
            <Snackbar open={snackState.failureTost} onClose={handleClose}>
                <Alert onClose={() => { setSnack(() => ({ ...snackState, failureTost: false })) }} severity="error">
                     Failed To Assign Job !
        				</Alert>
            </Snackbar>
        </Container>
    )
}
export default Jobcard;