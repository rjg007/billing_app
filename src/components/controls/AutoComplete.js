import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedUser } from '../../actions/selectedUserActions'
import Input from './Input'

const AutoComplete = (props) => {

    const [suggestions, setSuggestions] = useState([])
    const [text, setText] = useState('')

    const dispatch = useDispatch()
 
    // useEffect(() => {
       
    // }, [])

    // const names = ['rob', 'jon', 'sansa', 'arya', 'bran', 'rickon']
    const {customers} = props

    const names = customers.map(ele => ele.name)

    const handleChange = (e) => {
        const result = e.target.value
        let suggestions = []
        if(result.length > 0) {
            const regex = new RegExp(`^${result}`, 'i')
            suggestions = names.sort().filter(ele => regex.test(ele))
        }
        setSuggestions(suggestions)
        setText(result)
    }

    const suggestionSelected = (value) => {
        setText(value)

        const selectedCustomer = customers.find(ele => ele.name === value)

        dispatch(setSelectedUser({
            id: selectedCustomer._id
        }))
        setSuggestions([])
    }

    const renderSuggestions = () => {
        if(suggestions.length === 0) {
            return null 
        }
        return (
            <ul>
                {
                    suggestions.map(name => {
                        return <li
                                    onClick={() =>suggestionSelected(name)}
                                    key={name}
                                > {name} </li>
                    })
                }
            </ul>
        )
    }

    return (
        <div>
            <Input 
                onChange={handleChange} 
                label='Customer Name'
                value={text}
            />
            {renderSuggestions()}
        </div>
    )
}

export default AutoComplete
