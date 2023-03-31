//import Logo from '/images/assets/subway.jpg'
import Store from "./Store"

const SidebarAD = ({ size }) => {
    return (
        <div className="w-full space-y-2">
            <div className="p-3">
                <img className={`${size.h} ${size.w} rounded-lg`} src="/images/assets/subway.jpg" />
            </div>
            <div className="text-sm text-white flex flex-col justify-center items-center font-semibold">
                <div>Download our App</div>
                <div>for easy access!</div>
            </div>
            <Store />
        </div>
    )
}

export default SidebarAD