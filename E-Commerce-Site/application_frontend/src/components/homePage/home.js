import React, { useState } from 'react'
import SmartToyIcon from '@mui/icons-material/SmartToy';

import {ProductsDataContainer} from '../../containers/productsContainer/productsDataContainer'

import {Carousel} from './carousel'
import { Chatbot } from '../chatBot/chatBot';
import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

export default function Home() {
    const [show, setShow] = useState(false)
    return (
        <div>
            <Carousel/>
            <h2>Deals Of The Day</h2>
            <ProductsDataContainer/>
            {show && <Chatbot/>}
            <Avatar onClick={() => setShow(!show)} sx={{ width: 60, height: 60, bgcolor: deepPurple[500] }}><SmartToyIcon/></Avatar>
        </div>
    )
}
