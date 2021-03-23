import React, {useState, useEffect} from 'react' //useEffect t
import { useDispatch, useSelector } from 'react-redux' //t
import { Grid, makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core'
import { startGetProducts, startDeleteProduct } from '../../actions/productsActions' // t
import useTable from '../useTable'
import Input from '../controls/Input'
import Button from '../controls/Button'
import { Search } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'
import Popup from '../Popup'
import Form from './Form'
import ActionBtn from '../controls/ActionBtn'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

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
    {id:'name', label:'Product Name'},
    {id:'price', label:'Price'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const Table = (props) => {

    const dispatch = useDispatch()    

    const classes = useStyles()

    const [term, setTerm] = useState('')
    const [openPopUp, setOpenPopUp] = useState(false)
    const [toggleEdit, setToggleEdit] = useState(false)
    const [editItem, setEditItem] = useState(null)

    useEffect(() => {
        dispatch(startGetProducts())
    }, [])

    let products = useSelector(state => { 
        return state.products
    })

    const handleSearch = (e) => {
        setTerm(e.target.value)
    }

    if(term.length > 0) {
        products = products.filter(product => {
            return product.name.toLowerCase().includes(term)
        })
    }

    const handleDelete = (id) => {
        dispatch(startDeleteProduct(id))
    }

    const handleEdit = (item) => {
        setToggleEdit(true)
        setOpenPopUp(true)
        setEditItem(item)
    }

    const {TableContainer, TableHeadComp, TablePaging, recordsAfterPagingAndSorting} = useTable(products, headCells)

    return (
        <div>
            <Paper className={classes.pageContent} elevation={10} >
                <Toolbar>
                    <Grid container>
                        <Grid item xs={8} align='left'>
                            <Input
                            label='Search Products'
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
                                text='Add New Product'
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
                                        <TableCell align='left'> {item.price} </TableCell>
                                        <TableCell align='left'> 
                                            <ActionBtn color='primary' onClick={ () => {
                                                handleEdit(item)
                                            }} >
                                                <EditOutlinedIcon fontSize='small'/>
                                            </ActionBtn>
                                            <ActionBtn color='secondary' onClick={  () => {
                                                handleDelete(item._id)
                                            }}>
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
                        title = 'Edit Product Details'
                        openPopUp={openPopUp}
                        setOpenPopUp={setOpenPopUp}
                    > 
                        <Form editItem={editItem} toggleEdit={toggleEdit} setToggleEdit={setToggleEdit} openPopUp={openPopUp}
                        setOpenPopUp={setOpenPopUp} />
                    </Popup>
                ) : (
                    <Popup 
                        title = 'Add New Product'
                        openPopUp={openPopUp}
                        setOpenPopUp={setOpenPopUp}
                    > 
                        <Form />
                    </Popup>
                )
            }
        </div>
    )
}

export default Table