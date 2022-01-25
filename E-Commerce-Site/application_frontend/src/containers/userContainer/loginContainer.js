import { connect } from 'react-redux'
import React, { Component } from 'react'
import Login from '../../components/loginPage/login'
import { login } from '../../core/apiCalls/user'
import { setAuthToken } from '../../shared/authToken'

import {fetchUser} from '../../action/userAction'

class LoginContainer extends Component {
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
        login(this.state.formData)
        .then((res) => {
            setAuthToken(res.authToken)
            this.props.loginDispatch()
            this.props.navigate('/')
        })
        .catch(error => {
            const errors =  error.response.data
            const errorLst = {}
            errors.map(item => errorLst[item.path[0]] = item.message)
            this.setState({errors : errorLst})
        })
      }

    render() {
        return (
            <Login onChange = {this.onChange} handleSubmit={this.handleSubmit} errors={this.state.errors}/>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginDispatch : () => dispatch(fetchUser(true))
    }
}

export default connect(null, mapDispatchToProps)(LoginContainer)
