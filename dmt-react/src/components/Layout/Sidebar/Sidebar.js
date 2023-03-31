import SidebarLinks from './SidebarLinks'
import SidebarAD from './SidebarAD/SidebarAD'
import { useState } from 'react'
import LoaderAnim from '../../common/LoaderAnim'
import { useAuth } from '../../../Auth/AuthContext'

const Sidebar = () => {

    const [loading, setLoading] = useState(false)
    const { logout, currentUser } = useAuth()

    const onClick = (e) => {
        e.preventDefault()
        setLoading(true)
        logout()
        setLoading(false)
    }

    return (
        loading ? <LoaderAnim /> :
            <div className='flex flex-col h-full'>
                <div className='border-b flex items-center justify-center'>
                    <img className='h-24' src='/dmt-logo.png' />
                </div>
                <div className="p-5">
                    <SidebarLinks onClick={onClick} />
                </div>
                {currentUser.role == 0 &&
                    <div className='mt-auto mb-10 py-2 mx-3 shadow-lg rounded-lg bg-[#30D5C8]'>
                        <SidebarAD size={{ h: "h-24", w: "w-full" }} />
                    </div>}
            </div>
    )
}

export default Sidebar