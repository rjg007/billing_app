import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core'
import { startGetProducts } from '../../actions/productsActions' 
import useTable from '../useTable'
import ActionBtn from '../controls/ActionBtn'
import { Search } from '@material-ui/icons'
import Input from '../controls/Input'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: "100%",
        marginLeft: '0px'
    }
}))

const headCells = [
    {id:'name', label:'Product Name'},
    {id:'price', label:'Price in ₹'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const BillsTable = (props) => {

    const { addProduct } = props
    const dispatch = useDispatch()
    const classes = useStyles()
    const [term, setTerm] = useState('')

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

    const {TableContainer, TableHeadComp, TablePaging, recordsAfterPagingAndSorting} = useTable(products, headCells)

    return (
        <div>
            <h1> Table </h1>
            <Grid className={classes.pageContent}>
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
                                                addProduct(item)
                                            } } >
                                                <AddIcon fontSize='small'/>
                                            </ActionBtn>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                    <TablePaging />
                </TableContainer>
            </Grid>
                    </div>
    )
}

export default BillsTable
