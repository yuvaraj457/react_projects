import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCartProducts } from '../../action/cartAction';
import { fetchProducts } from '../../action/productAction';
import { ElectronicsProduct } from '../../components/products/electronicsProduct';
import { MensProduct } from '../../components/products/mensProduct';
import { WomensProduct } from '../../components/products/womensProduct';

export default function ProductFilterViewContainer() {
    const {field} = useParams()

    const { products } = useSelector(state => state.productsReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!(products.length > 0)) {
            dispatch(fetchProducts())
        }
    }, [dispatch, products])

    const addToCartHandler = (id) => {
        dispatch(addCartProducts(id))
      }

    switch(field){
        case 'Mens':
            return <MensProduct products={products} addToCartHandler={addToCartHandler}/>
        case 'Womens':
            return <WomensProduct products={products} addToCartHandler={addToCartHandler}/>
        case 'Electronics':
            return <ElectronicsProduct products={products} addToCartHandler={addToCartHandler}/>
        default:
            return <h1>Page Not Found</h1>
    }

}
