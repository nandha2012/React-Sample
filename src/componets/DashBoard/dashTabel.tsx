import React, { useEffect } from 'react';
import {
    TableContainer,
    TableHead,
    Table,
    TableBody,
    TablePagination,
    Button
} from '@material-ui/core';
import { StyledTableCell, StyledTableRow } from '../../styles/dashBoard/DashboardTabelStyle';
import { getJobDetails } from '../../services/routers';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { fetchTableValues } from '../../redux/actions/dashBoardActions';
import { ThunkDispatch } from 'redux-thunk';

function DashBoardTabel(props: any): JSX.Element {
    const [rows, setRows] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    useEffect((): void => {
        props.fetchTableValues();
    }, [])
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const filterFunction = () => {
        const filter_keys = props.data.FilterReducer.filterKeys;
        const users = props.data.dashBoardReducer.users;
        let test: { [x: string]: any; }[] = []
        users.map(
            (user: { [x: string]: any; }) => {
                if (filter_keys["status"] !== "" || filter_keys["payment"] !== "" || filter_keys["searchkey"] !== "") 
                {
                    console.log(">>test");
                    if (user["userStatus"].toLowerCase() === filter_keys["status"].toLowerCase()) 
                    {
                        if (user["paymentStatus"].toLowerCase() === filter_keys["payment"].toLowerCase()) 
                        {
                            if (filter_keys["searchkey"].toLowerCase() !== "" && user["userName"].toLowerCase().startsWith(filter_keys["searchkey"])) 
                            {
                                test.push(user);
                            } else if (filter_keys["searchkey"] === "") 
                            {
                                test.push(user);
                            }
                        } else if (filter_keys["payment"] === "") 
                        {
                            console.log("no payment");
                            test.push(user);
                        }
                    }
                    else if (filter_keys["status"] === "") 
                    {
                        if (user["paymentStatus"].toLowerCase() === filter_keys["payment"].toLowerCase()) {
                            console.log("payment");
                            test.push(user);
                        } else if (filter_keys["payment"] === "") {
                            if (filter_keys["searchkey"].toLowerCase() !== "" && user["userName"].toLowerCase().startsWith(filter_keys["searchkey"])) {
                                test.push(user);
                            } else if (filter_keys["searchkey"] === "") {
                                test.push(user);
                            }
                        }
                    }
                }
                else {
                    test.push(user)
                }
            }
        )
        return test
    }
    const dateFunction = (date:any) =>{
        let newDate  = new Date(date);
        let formatDate=newDate.toLocaleString([], { hour12: true})
        console.log(newDate);
        return formatDate;
    }
    return (
        <div>
            <TableContainer >
                <Table style={{ height: 400, width: '100%' }}>
                    <TableHead>
                        <StyledTableRow >
                            <StyledTableCell>S.NO</StyledTableCell>
                            <StyledTableCell>SERVICE ID</StyledTableCell>
                            <StyledTableCell>DATE</StyledTableCell>
                            <StyledTableCell>USER</StyledTableCell>
                            <StyledTableCell>STATUS</StyledTableCell>
                            <StyledTableCell>PAYMENT</StyledTableCell>
                            <StyledTableCell>JOB STATUS</StyledTableCell>
                            <StyledTableCell>ASSIGNED TO</StyledTableCell>
                            <StyledTableCell>PAYMENT STATUS</StyledTableCell>
                            <StyledTableCell>ACTIONS</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody  >
                        {
                            filterFunction().slice(
                                page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                                    (row: {
                                        [x: string]: boolean |
                                        React.ReactChild |
                                        React.ReactFragment |
                                        React.ReactPortal |
                                        null | undefined;
                                    }
                                    ): JSX.Element => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                                        return (
                                            <StyledTableRow hover={true} key={props.data.dashBoardReducer.users.indexOf(row)}>
                                                <StyledTableCell align="right">{props.data.dashBoardReducer.users.indexOf(row)+1}</StyledTableCell>
                                                <StyledTableCell align="right">{row["jobCardId"]}</StyledTableCell>
                                                <StyledTableCell align="right">{dateFunction(row["JobDate"])}</StyledTableCell>
                                                <StyledTableCell align="right">{row["userName"]}</StyledTableCell>
                                                <StyledTableCell align="right">{row["userStatus"]}</StyledTableCell>
                                                <StyledTableCell align="right">{row["paymentType"]}</StyledTableCell>
                                                <StyledTableCell align="right">{row["jobStatus"]}</StyledTableCell>
                                                <StyledTableCell align="right">{row["jobDescription"]}</StyledTableCell>
                                                <StyledTableCell align="right">{row["paymentStatus"]}</StyledTableCell>
                                                <StyledTableCell align="right">{row["job_description"]}</StyledTableCell>
                                            </StyledTableRow>);
                                    })}
                    </TableBody>
                </Table>
            </TableContainer >
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filterFunction().length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div >
    )
}
const mapStateToProps = (states: any) => {
    return ({
        data: states
    })
}
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    return ({
        fetchTableValues: (data: any) => dispatch(fetchTableValues())
    });
}
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardTabel);