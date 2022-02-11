import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductUpload } from '../../components/admin/productUpload';
import { productUpdate, productUpload } from '../../core/apiCalls/admin';

export const ProductUploadContainer = () => {
    const [formData, setFormData] = useState([])
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')
    const productPrice = formData.productMRP - (formData.productMRP * formData.productDiscount / 100)


    const inputHandler = (e, value, r) => {
        if (r === 'reset') {
            if (value === '') {
                return null
            }

            const name = e.target.id.split('-')[0]
            setFormData({
                ...formData,
                [name]: value
            })
        }
        else {
            setFormData({
                ...formData,
                [e.target.name]: isNaN(e.target.value)?e.target.value:Number(e.target.value)
            })
        }
    }

    const fileHandler = ({ target }) => {
        setFormData({
            ...formData,
            productImage: target.files[0]
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        formData.productPrice = productPrice
        console.log(formData)
        productUpload(formData)
            .then((res) => setMessage(res))
            .catch((err) => {
                const errors = err.response.data
                const errorLst = {}
                errors.map(item => errorLst[item.path[0]] = item.message)
                setErrors(errorLst)
            })
        setTimeout(() => setMessage(''), 2000)
    }

    return (
        <ProductUpload
            inputHandler={inputHandler}
            fileName={formData && formData.productImage ? formData.productImage.name : ''}
            productPrice={isNaN(productPrice) ? 0 : productPrice}
            fileHandler={fileHandler}
            submitHandler={submitHandler}
            errors={errors}
            message={message}
        />
    )
}
