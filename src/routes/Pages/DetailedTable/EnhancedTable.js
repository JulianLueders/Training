import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

function createData(id, sumAll, busy, unanswered, voicebox, wqAbort, sumNoSuccess, direct, redirected, wqSuccess, sumSuccess, q1, callbacksOutgoing, q2, callbacksIncoming, q3) {
    return { id, sumAll, busy, unanswered, voicebox, wqAbort, sumNoSuccess, direct, redirected, wqSuccess, sumSuccess, q1, callbacksOutgoing, q2, callbacksIncoming, q3 };
}
const headCells = [
    { id: 'id', numeric: false, color: '#0275d8', disablePadding: true, label: 'Gruppe' },
    { id: 'sumAll', numeric: true, color: '#0275d8', disablePadding: false, label: 'Summe' },
    { id: 'busy', numeric: true, color: '#d9534f', disablePadding: false, label: 'Besetzt' },
    { id: 'unanswered', numeric: true, color: '#d9534f', disablePadding: false, label: 'Unbeantwortet' },
    { id: 'voicebox', numeric: true, color: '#d9534f', disablePadding: false, label: 'VoiceBox' },
    { id: 'wqAbort', numeric: true, color: '#d9534f', disablePadding: false, label: 'WQ erfolglos' },
    { id: 'sumNoSuccess', numeric: true, color: '#d9534f', disablePadding: false, label: 'Summe' },
    { id: 'direct', numeric: true, color: '#5cb85c', disablePadding: false, label: 'Direkt' },
    { id: 'redirected', numeric: true, color: '#5cb85c', disablePadding: false, label: 'RUL' },
    { id: 'wqSuccess', numeric: true, color: '#5cb85c', disablePadding: false, label: 'WQ erfolgreich' },
    { id: 'sumSuccess', numeric: true, color: '#5cb85c', disablePadding: false, label: 'Summe' },
    { id: 'q1', numeric: true, color: '#5cb85c', disablePadding: false, label: 'Q1 [%]' },
    { id: 'callbacksOutgoing', color: '#5cb85c', numeric: true, disablePadding: false, label: 'R in 2h' },
    { id: 'q2', numeric: true, color: '#5cb85c', disablePadding: false, label: 'Q2 [%]' },
    { id: 'callbacksIncoming',  color: '#5cb85c', numeric: true, disablePadding: false, label: 'W in 2h' },
    { id: 'q3', numeric: true, color: '#5cb85c', disablePadding: false, label: 'Q3 [%]' },




];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    style={{fontWeight: 800, color: headCell.color}}>
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
                    Auswertungen
                </Typography>
            )}

        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable({data}) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    let rows = [];
    for (let i = 0; i < data.length; i++) {
        rows.push(createData(data[i].id,
            data[i].sumAll,
            data[i].busy,
            data[i].unanswered,
            data[i].voicebox,
            data[i].wqAbort,
            data[i].sumNoSuccess,
            data[i].direct,
            data[i].redirected,
            data[i].wqSuccess,
            data[i].sumSuccess,
            data[i].q1,
            data[i].callbacksOutgoing,
            data[i].q2,
            data[i].callbacksIncoming,
            data[i].q3))
    }
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell style={{color: '#0275d8', fontWeight: 700}} component="th" id={labelId} scope="row" padding="none">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="right">{row.sumAll}</TableCell>
                                            <TableCell align="right">{row.busy}</TableCell>
                                            <TableCell align="right">{row.unanswered}</TableCell>
                                            <TableCell align="right">{row.voicebox}</TableCell>
                                            <TableCell align="right">{row.wqAbort}</TableCell>
                                            <TableCell align="right">{row.sumNoSuccess}</TableCell>
                                            <TableCell align="right">{row.direct}</TableCell>
                                            <TableCell align="right">{row.redirected}</TableCell>
                                            <TableCell align="right">{row.wqSuccess}</TableCell>
                                            <TableCell align="right">{row.sumSuccess}</TableCell>
                                            <TableCell align="right">{row.q1}</TableCell>
                                            <TableCell align="right">{row.callbacksOutgoing}</TableCell>
                                            <TableCell align="right">{row.q2}</TableCell>
                                            <TableCell align="right">{row.callbacksIncoming}</TableCell>
                                            <TableCell align="right">{row.q3}</TableCell>



                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    labelRowsPerPage="Datensätze per Seite"
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Verdichtete Zellen"
            />
        </div>
    );
}