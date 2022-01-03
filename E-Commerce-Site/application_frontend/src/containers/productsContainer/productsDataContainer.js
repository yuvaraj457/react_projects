import { Grid } from '@mui/material'
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
            <Grid item xs={12}>
                <Grid container justifyContent="space-around" spacing={3} sx={{ mb: 2 }}>
                    {this.props.products && this.props.products.map((item, index) => <Grid item key={index} ><ProductCard product={item}/></Grid>)}
                </Grid>
            </Grid>
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