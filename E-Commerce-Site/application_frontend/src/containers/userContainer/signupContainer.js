import React, { Component } from 'react'
import { SignUp } from '../../components/signupPage/signup';
import { signup } from '../../core/apiCalls/user';
import { signupValidation } from '../../utlis/signupValidation'

export default class SignupContainer extends Component {
    constructor() {
        super();
        this.state = {
            formData: {},
            errors: []
        }
    }

    onChange = e => {
        this.setState({
            formData : {
                ...this.state.formData,
                [e.target.name] : e.target.value
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //  const errors = signupValidation(this.state.formData)
        //  this.setState({errors})
        //  if(errors.isValid){
        //      signup(this.state.formData)
             
        //  }
        signup(this.state.formData)
        .then(res => console.log(res))
        .catch( err => {
         const errors =  err.response.data
         const errorLst = {}
         errors.map(item => errorLst[item.path[0]] = item.message)
         this.setState({errors : errorLst})
        })
    }

    render() {
        
        return (
            <SignUp onChange = {this.onChange} handleSubmit={this.handleSubmit} errors={this.state.errors}/>
        )
    }
}
