import React, { Component, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SignUp } from '../../components/signupPage/signup'
import { signup } from '../../core/apiCalls/user'

// export default class SignupContainer extends Component {
//     constructor() {
//         super();
//         this.state = {
//             formData: {},
//             errors: []
//         }
//     }

//     onChange = e => {
//         this.setState({
//             formData : {
//                 ...this.state.formData,
//                 [e.target.name] : e.target.value
//             }
//         })
//     }

//     handleSubmit = (event) => {
//         event.preventDefault();
//         signup(this.state.formData)
//         .then(res => console.log(res))
//         .catch( err => {
//          const errors =  err.response.data
//          const errorLst = {}
//          errors.map(item => errorLst[item.path[0]] = item.message)
//          this.setState({errors : errorLst})
//         })
//     }
    
//     render() {
//         return (
//             <SignUp onChange = {this.onChange} handleSubmit={this.handleSubmit} errors={this.state.errors}/>
//         )
//     }
// }


export const SignupContainer= () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})

    const onChange = e => {
            setFormData ({
                ...formData,
                [e.target.name] : e.target.value
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        signup(formData)
        .then(() => navigate('/login'))
        .catch( err => {
         const errors =  err.response.data
         const errorLst = {}
         errors.map(item => errorLst[item.path[0]] = item.message)
         setErrors(errorLst)
        })
    }
    
        return (
            <SignUp onChange = {onChange} handleSubmit={handleSubmit} errors={errors}/>
        )
}