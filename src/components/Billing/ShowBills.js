import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { startGetBills } from '../../actions/billsActions'
import useTable from '../useTable'

const headCells = [
    {id: 'date', label: 'Date'},
    {id:'name', label: 'Customer Name'},
    {id: 'amount', label: 'Amount'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const ShowBills = (props) => {

    const dispatch = useDispatch()

    const bills = useSelector(state => {
        return state.bills
    })

    const {TableContainer, TableHeadComp, TablePaging, recordsAfterPagingAndSorting} = useTable(bills, headCells)

    useEffect(() => {
        dispatch(startGetBills())
    }, [])
    
    return (
        <div>
            <h1> ShowBills </h1>
        </div>
    )
}

export default ShowBills


