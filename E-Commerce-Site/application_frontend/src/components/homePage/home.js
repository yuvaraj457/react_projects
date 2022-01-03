import React from 'react'
import ProductsDataContainer from '../../containers/productsContainer/productsDataContainer'

import { NavBar } from '../../shared/navBar'
import {Carousel} from './carousel'

export default function Home() {
    return (
        <div>
            <NavBar/>
            <Carousel/>
            <h2>Deals Of The Day</h2>
            <ProductsDataContainer/>
        </div>
    )
}
