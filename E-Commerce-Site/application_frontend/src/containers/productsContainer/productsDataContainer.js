import React, { Component } from 'react'
import { getProducts } from '../../core/apiCalls/products';

export default class ProductsDataContainer extends Component {
    constructor() {
        super();
        this.state = {
            products : []
        }
    }

    componentDidMount(){
        getProducts()
        .then((res) => this.setState({products : res}))
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
