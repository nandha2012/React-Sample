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
                if (filter_keys["status"] !== "" || filter_keys["payment"] !== "" || filter_keys["searchkey"] !== "") {
                    if (user["Status"].toLowerCase() === filter_keys["status"].toLowerCase()) {
                        if (user["Payment"].toLowerCase() === filter_keys["payment"].toLowerCase()) {
                            if (filter_keys["searchkey"].toLowerCase() !== "" && user["Name"].toLowerCase().startsWith(filter_keys["searchkey"])) {
                                test.push(user);
                            } else if (filter_keys["searchkey"] === "") {
                                test.push(user);
                            }
                        } else if (filter_keys["payment"] === "") {
                            console.log("no payment");
                            test.push(user);
                        }
                    }
                    else if (filter_keys["status"] === "") {
                        if (user["Payment"].toLowerCase() === filter_keys["payment"].toLowerCase()) {
                            console.log("payment");
                            test.push(user);
                        } else if (filter_keys["payment"] === "") {
                            if (filter_keys["searchkey"].toLowerCase() !== "" && user["Name"].toLowerCase().startsWith(filter_keys["searchkey"])) {
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
                            <StyledTableCell>SERVICE DETAILS</StyledTableCell>
                            <StyledTableCell>SERVICE PROVIDER</StyledTableCell>
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
                                                <StyledTableCell align="right">{row["User_ID"]}</StyledTableCell>
                                                <StyledTableCell align="right">{row["service_Id"]}</StyledTableCell>
                                                <StyledTableCell align="right">{row["Job_Date"]}</StyledTableCell>
                                                <StyledTableCell align="right">{row["Name"]}</StyledTableCell>
                                                <StyledTableCell align="right">{row["Status"]}</StyledTableCell>
                                                <StyledTableCell align="right">{row["Payment"]}</StyledTableCell>
                                                <StyledTableCell align="right">{row["Job_type"]}</StyledTableCell>
                                                <StyledTableCell align="right">{row["Status"]}</StyledTableCell>
                                                <StyledTableCell align="right">{row["Job_Description"]}</StyledTableCell>
                                            </StyledTableRow>);
                                    })}
                    </TableBody>
                </Table>
            </TableContainer >
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.data.dashBoardReducer.users.length}
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