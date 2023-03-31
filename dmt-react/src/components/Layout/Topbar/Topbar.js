import React from 'react'
import MenuLink from './MenuLink'
import Welcome from './Welcome'
import { IoWalletOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Topbar = () => {

    const style = {
        icon: 'w-8 h-8 p-1 rounded-full shadow-md bg-gray-100',
        container: 'flex w-full items-center',
        icon_container: 'ml-auto flex space-x-1 mr-5',
        text_container: 'tracking-wider ml-2',

    }
    const image = <img className={style.icon} src='/images/dummyProfile.jpg' />

    return (
        <div className={style.container}>
            <div className={style.text_container}>
                <Welcome name={"Khan, Al-Monaem"} />
            </div>
            <div className={style.icon_container}>
                <Link to={"profile"}><MenuLink icon={image} text="Go to Profile" k={1} /></Link>
                <Link to={"topup"}><MenuLink icon={<IoWalletOutline className={style.icon} />} text="Top-up Wallet" k={2} /></Link>
            </div>
        </div>
    )
}

export default Topbar