import React,{ useState } from 'react'
import { Table, TableHead, TableRow, TableCell, makeStyles, TablePagination, TableSortLabel } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    table : {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: "#4a47a3",
            backgroundColor: '#ccf2f4'
        },
        '& tbody td' : {
            fontWeight: '300'
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor:'pointer'
        }
    }
}))

export default function useTable(records, headCells) {

    const classes = useStyles()

    const pages = [5, 10, 25] 
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()

    const TableContainer = (props) => {
        return (
            <Table className={classes.table}>
                {props.children}
            </Table>
        )
    }

    const TableHeadComp = (props) => {

        const handleSort = (cellId) => {

            const isAscending = ( orderBy === cellId && order === 'asc' )
            setOrder(isAscending ? 'desc' : 'asc')
            setOrderBy(cellId)
        }

        return (
            <TableHead>
                <TableRow>
                    {
                        headCells.map(headCell => {
                            return (
                                <TableCell key={headCell.id}
                                    sortDirection={orderBy === headCell.id ? order : false}
                                    align='left'
                                >
                                    {headCell.disableSorting? headCell.label :
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            onClick = {() => handleSort(headCell.id)}
                                            direction={orderBy === headCell.id ? order:'asc'}
                                        >
                                            {headCell.label}
                                        </TableSortLabel>
                                    }
                                </TableCell>
                            )
                        })
                    }
                </TableRow>
            </TableHead>
        )
    }

    const handleChangePage = (e, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10))
        setPage(0)
    }

    const TablePaging = () => {
        return (
            <TablePagination
                component='div'
                page={page}
                rowsPerPageOptions={pages}
                rowsPerPage={rowsPerPage}
                count={records.length}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        )
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index])
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0])
            if(order !== 0) return order
            return a[1] - b[1] 
        })
        return stabilizedThis.map((el) => el[0])
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }

    const recordsAfterPagingAndSorting = () => {
        return stableSort(records, getComparator(order, orderBy)).slice(page*rowsPerPage, (page+1)*rowsPerPage)
    }

    return {
        TableContainer,
        TableHeadComp,
        TablePaging,
        recordsAfterPagingAndSorting
    }
}