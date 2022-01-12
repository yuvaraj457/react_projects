import React from 'react'
import {useSelector} from 'react-redux'
import {ProfileCard} from '../../components/userProfile/profileCard'
export default function UserProfileContainer() {
    const {userDetails} = useSelector(state => state.userReducer)
    return (
       <ProfileCard user={userDetails}/>
    )
}
