import React, { Component } from 'react'
import Login from '../components/loginPage/login'
import { login } from '../core/apiCalls/user';
import { loginValidation } from '../utlis/loginValidation';

export default class LoginContainer extends Component {
    constructor() {
        super();
        this.state = {
            formData: {},
            errors: {}
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
        event.preventDefault()
        const errors = loginValidation(this.state.formData)
        if(errors.isValid){
            login(this.state.formData)
            .then((res) => {
                this.setState({errors : {}})
                console.log(res.token)
            })
            .catch(() => this.setState({ errors: { authFail: 'Invaild email or password' } }))
        }
        else{
            this.setState({
                errors
            })
        }
      }

    render() {
        
        return (
            <Login onChange = {this.onChange} handleSubmit={this.handleSubmit} errors={this.state.errors}/>
        )
    }
}
