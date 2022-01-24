import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from "react-router-dom"
import { fetchUser } from '../../action/userAction'

import { EditProfileCard } from '../../components/userAccount/editPhoneCard'
import { editAddress, editPhone } from '../../core/apiCalls/user'
import { EditAddressContainer } from './editAddressContainer'

export const EditProfileContainer = () => {
    const {field} = useParams()
    const [phone, setPhone] = useState('')
    const navigate = useNavigate() 

    const onChangePhone = e => {
        setPhone(e)
    }

    const onChangeAddress = e => {
        setAddress({...address,[e.target.name] : e.target.value})
    }

    const handleSubmitPhone = e => {
        e.preventDefault()
        editPhone(phone)
            .then(() => navigate('/MyAccount'))
            .catch(error => console.log(error))
    }

    switch(field){
        case 'phone':
            return (
                <EditProfileCard onChangePhone={onChangePhone} handleSubmitPhone={handleSubmitPhone} />
            )
        case 'address':
            return (
                <EditAddressContainer navigate={navigate}/>
            )
    }
}
