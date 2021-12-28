import React, { Component } from 'react'
import SignUp from '../components/signupPage/signup'
import { signupValidation } from '../utlis/signupValidation';

export default class SignupContainer extends Component {
    constructor() {
        super();
        this.state = {
            formData: {},
            errors: {}
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        this.setState({
          formData : {
              firstName : data.get('firstName'), 
              lastName : data.get('lastName'),
              email: data.get('email'), 
              password: data.get('password'),
              confirmPassword : data.get('cofirmPassword')
            }
        });
         const errors = signupValidation(data)
         console.log(errors)
      };
    render() {
        console.log(this.state)
        return (
            <SignUp handleSubmit={this.handleSubmit}/>
        )
    }
}
