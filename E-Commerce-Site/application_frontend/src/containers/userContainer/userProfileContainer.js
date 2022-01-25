import React from 'react'
import { useSelector} from 'react-redux'

import { ProfileCard } from '../../components/userAccount/profileCard'


export const UserProfileContainer = () => {
    const {userDetails} = useSelector(state => state.userReducer)

    return (
       <ProfileCard user={userDetails} />
    )
}
