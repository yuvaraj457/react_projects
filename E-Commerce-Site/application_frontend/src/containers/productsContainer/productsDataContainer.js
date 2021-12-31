import React, { Component } from 'react'
import {connect} from 'react-redux'

import {fetchProducts} from '../../action/productAction'
import ProductCard from '../../components/products/productCard'

 class ProductsDataContainer extends Component {

    componentDidMount(){
        console.log(this.props)
        this.props.productsDispatch()
    }

    render() {
        console.log(this.props.products)
        return (
            this.props.products && this.props.products.map((item, index) => <ProductCard product={item} />)
        )
    }
}

const mapStateToProps = state =>  ({products : state.products})
    
const mapDispatchToProps = (dispatch) => {
    return {
        productsDispatch : () => dispatch(fetchProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDataContainer)