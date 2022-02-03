import React, { useState, useEffect } from 'react';
import { ProductUpload } from '../../admin/productUpload';
import { productUpload } from '../../core/apiCalls/admin';

export const ProductUploadContainer = () => {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})

    const productPrice = formData.productMRP-(formData.productMRP * formData.productDiscount/100)
    // console.log(productPrice)
    // useEffect(() => {
        
    //     // if(formData.productMRP && formData.productDiscount){
    //         setFormData ({
    //            ...formData,
    //            productPrice : formData.productMRP-(formData.productMRP * formData.productDiscount/100)
    //        })
    // //    }
    // },[])

    const onChange = ( e, value, r )=> {
        // console.log(formData.productMRP, formData.productDiscount)
        if(r =='reset'){
            const name = e.target.id.split('-')[0]
            setFormData ({
                ...formData,
                [name] : value
            })
        }
        else{
            setFormData ({
                ...formData,
                [e.target.name] : e.target.value
            })
        }     
    }
    

    const fileHandler = ({ target }) => {
        setFormData ({
            ...formData,
            productImage : target.files[0]
        })
    }

    const submitHandler= (e) => {
        e.preventDefault()
        formData.productPrice = productPrice
        productUpload(formData)
        .then((res) => console.log(res))
    }

    console.log(formData)
  return <ProductUpload 
            onChange={onChange} 
            fileName={formData && formData.productImage ? formData.productImage.name : ''} 
            productPrice={productPrice && productPrice}  
            fileHandler={fileHandler}
            submitHandler={submitHandler}
            />
}
