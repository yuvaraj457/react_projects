import React, { useState, useEffect } from 'react';
import { ProductUpload } from '../../admin/productUpload';

export const ProductUploadContainer = () => {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const [fileName, setFileName] = useState('')

    useEffect(() => {
        if(formData.productMRP && formData.productDiscount){
            setFormData ({
                ...formData,
                productPrice : formData.productMRP-(formData.productMRP * formData.productDiscount/100)
            })
        }
    },[])
    
    const onChange =( e, value, r )=> {
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
        setFileName(target.files[0].name)
        // console.log(target.files[0].name)
    }
    console.log(formData)
  return <ProductUpload onChange={onChange} fileName={fileName}  fileHandler={fileHandler}/>
}
