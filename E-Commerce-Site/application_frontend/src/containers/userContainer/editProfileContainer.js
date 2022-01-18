import React, { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import EditAddressCard from '../../components/userAccount/editAddressCard'

import { EditProfileCard } from '../../components/userAccount/editPhoneCard'
import { editAddress, editPhone } from '../../core/apiCalls/user'

export const EditProfileContainer = () => {
    const {field} = useParams()
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState({})
    const navigate = useNavigate() 

    const onChangePhone = e => {
        setPhone(e)
    }

    const onChangeAddress = e => {
        setAddress({...address,[e.target.name] : e.target.value})
    }

    const handleSubmitAddress = e => {
        e.preventDefault()
        editAddress(address)
        .then(res => navigate('/myAcoount'))
        .catch(error => console.log(error))
    }

    const handleSubmitPhone = e => {
        e.preventDefault()
        editPhone(phone)
            .then(res => navigate('/myAcoount'))
            .catch(error => console.log(error))
    }

    switch(field){
        case 'phone':
            return (
                <EditProfileCard onChangePhone={onChangePhone} handleSubmitPhone={handleSubmitPhone} />
            )
        case 'address':
            return (
                <EditAddressCard onChangeAddress={onChangeAddress} handleSubmitAddress={handleSubmitAddress} />
            )
    }
    
}
