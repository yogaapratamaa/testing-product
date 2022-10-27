import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import formatDate from '@helper_date';
import useStyles from '@modules/orders/pages/view/components/style';

const StatusHistory = (props) => {
    const {
        data,
    } = props;
    const classes = useStyles();

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(even)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);
    return (
        <div className={classes.content}>
            <div>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table aria-label="collapsible table" size="small">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell>Notes</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.length === 0
                                ? (
                                    <StyledTableRow>
                                        <StyledTableCell rowSpan={3} />
                                        <StyledTableCell>
                                            <div className={classes.loadingFetch}>
                                                No records to display
                                            </div>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                                : data.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row" style={{ width: '30%' }}>
                                            {formatDate(row.timestamp, 'MMM DD, YYYY h:mm:ss A') || '-'}
                                        </StyledTableCell>
                                        <StyledTableCell>{row.state.split('_').join(' ')}</StyledTableCell>
                                        <StyledTableCell>{row.remark}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};
export default StatusHistory;
