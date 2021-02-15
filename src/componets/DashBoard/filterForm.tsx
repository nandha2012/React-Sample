import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {
    OutlinedInput,
    Typography,
    InputAdornment,
    Box,
    Select,
    IconButton,
} from '@material-ui/core';

import {
    Search,
} from '@material-ui/icons';

import {
    KeyboardDateTimePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';

import React, { useState } from 'react';
import { filterStyles } from '../../styles/dashBoard/filterFormStyles';
import { fetchFilteredVales } from '../../redux/actions/dashBoardActions'


const FilterForm: React.FC = (props: any): JSX.Element => {
    const classes = filterStyles()
    const [dateValue, setDateValue] = useState({
        fromDate: new Date(),
        endDate: new Date()
    });

    const [filter, setFilter] = useState({
        status: "",
        payment: "",
        searchkey: ""
    })
    const handleFromDate = (event: any) => {
        setDateValue(() => ({
            ...dateValue,
            fromDate: event
        }))
    }
    const handleEndDate = (event: any) => {
        setDateValue(() => ({
            ...dateValue,
            endDate: event
        }))
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement |
        HTMLTextAreaElement> |
        React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        const target: any = event.target.name;
        const value = event.target.value;
        setFilter(() => ({
            ...filter,
            [target]: value
        })
        )
    }
    const SearchClick = () => {
        props.FilterTableValues({ ...dateValue, ...filter })
        console.log(props);
    }
    return (
        <div className={classes.root}>
            <Box className={classes.inputBox}>
                <Typography>From Date</Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        variant="inline"
                        name="fromDate"
                        inputVariant="outlined"
                        format="yyyy/MM/dd HH:mm"
                        margin="normal"
                        fullWidth
                        value={null}
                        onChange={handleFromDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Box>
            <Box className={classes.inputBox}>
                <Typography>End Date</Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        variant="inline"
                        inputVariant="outlined"
                        format="yyyy/MM/dd HH:mm"
                        margin="normal"
                        fullWidth
                        value={null}
                        onChange={handleEndDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Box>
            <Box className={classes.inputBox}>
                <Typography>Status</Typography>
                <Select native variant="outlined" 
                        className={classes.selectBox} 
                        name="status" 
                        onChange={handleChange}
                        onBlur={SearchClick} 
                        >
                    <option value=""></option>
                    <option value="Available" >Available</option>
                    <option value="On Job">On Job</option>
                </Select>
            </Box>
            <Box className={classes.inputBox}>
                <Typography>Payment</Typography>
                <Select variant="outlined" 
                        className={classes.selectBox} 
                        name="payment" 
                        native 
                        onChange={handleChange}
                        onBlur={SearchClick} 
                        >
                    <option value=""></option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>

                </Select>
            </Box>
            <Box className={classes.searchBox}>
                <OutlinedInput
                    placeholder="Search…"
                    name="searchkey"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={SearchClick}>
                                <Search />
                            </IconButton>

                        </InputAdornment>
                    }
                    onChange={handleChange}
                    onBlur={SearchClick} 
                />
            </Box>
        </div>
    )
}
const mapStateToProps = (states: any) => {
    return ({
        data: states
    })
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return ({
        FilterTableValues: (FilterKeys: object) => dispatch(fetchFilteredVales(FilterKeys))
    });
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);