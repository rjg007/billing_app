import { Paper, Grid, InputAdornment, Toolbar, makeStyles, TableBody, TableRow, TableCell} from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetCustomers, startDeleteCustomer } from '../../actions/customersActions'
import useTable from '../useTable'
import AddIcon from '@material-ui/icons/Add'
import { Search } from '@material-ui/icons'
import Input from '../controls/Input'
import Popup from '../Popup'
import Button from '../controls/Button'
import CustomersForm from './CustomersForm'
import ActionBtn from '../controls/ActionBtn'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CustomersEdit from './CustomersEdit'

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: "75%",
        marginLeft: '0px'
    }
}))

const headCells = [
    {id: 'name', label: 'Customer Name'},
    {id: 'mobile', label: 'Contact No.', disableSorting:true},
    {id: 'email', label: 'Mail ID', disableSorting: true},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const CustomersTable = (props) => {

    const classes = useStyles()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetCustomers())
    }, [])

    let customers = useSelector(state => {
        return state.customers
    })

    const [term, setTerm] = useState('')
    const [openPopUp, setOpenPopUp] = useState(false)
    const [toggleEdit, setToggleEdit] = useState(false)
    const [editItem, setEditItem] = useState(null)

    const handleSearch = (e) => {
        setTerm(e.target.value)
    }

    if(term.length > 0) {
        customers = customers.filter(customer => {
            return customer.name.toLowerCase().includes(term)
        })
    }

    const handleDelete = (id) => {
        dispatch(startDeleteCustomer(id))
    }

    const handleEdit = (item) => {
        setToggleEdit(true)
        setOpenPopUp(true)
        setEditItem(item)
    }

    const {TableContainer, TableHeadComp, TablePaging, recordsAfterPagingAndSorting} = useTable(customers, headCells)

    return (
        <div>
            <Paper className={classes.pageContent} elevation={10}>
            <Toolbar>
                    <Grid container>
                        <Grid item xs={8} align='left'>
                            <Input
                            label='Search Customers'
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment : (<InputAdornment position='start'>
                                    <Search />
                                </InputAdornment>
                            )}}
                            onChange={handleSearch}
                            value={term}
                        />
                        </Grid>
                        <Grid item xs={4} align='right'>
                            <Button
                                text='Add New Customer'
                                variant='outlined'
                                startIcon = {<AddIcon />}
                                onClick={() => {
                                    setOpenPopUp(true)
                                    setToggleEdit(false)
                                }}
                            />
                        </Grid>
                    </Grid>
                </Toolbar>
                <TableContainer>
                    <TableHeadComp />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => {
                                return (
                                    <TableRow key={item._id}>
                                        <TableCell align='left'> {item.name} </TableCell>
                                        <TableCell align='left'> {item.mobile} </TableCell>
                                        <TableCell align='left'> {item.email} </TableCell>
                                        <TableCell align='left'> 
                                            <ActionBtn color='primary' onClick={ () => {
                                                handleEdit(item)
                                            } }>
                                                <EditOutlinedIcon fontSize='small'/>
                                            </ActionBtn>
                                            <ActionBtn color='secondary' onClick={ () => {
                                                handleDelete(item._id)
                                            } }>
                                                <DeleteOutlineIcon fontSize='small'/>
                                            </ActionBtn>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </TableContainer>
                <TablePaging />
            </Paper>
            {
                toggleEdit ? (
                    <Popup 
                        title = 'Edit Customer Details'
                        openPopUp={openPopUp}
                        setOpenPopUp={setOpenPopUp}
                    > 
                        <CustomersForm editItem={editItem} toggleEdit={toggleEdit} setToggleEdit={setToggleEdit} openPopUp={openPopUp}
                        setOpenPopUp={setOpenPopUp} />
                    </Popup>
                ) : (
                    <Popup 
                        title = 'Add New Customer'
                        openPopUp={openPopUp}
                        setOpenPopUp={setOpenPopUp}
                    > 
                        <CustomersForm />
                    </Popup>
                )
            }
            
        </div>
    )
}

export default CustomersTable
