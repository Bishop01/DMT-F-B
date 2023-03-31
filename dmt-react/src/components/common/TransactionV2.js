import React from 'react'
import { ImDownload2 } from "react-icons/im"

const TransactionV2 = ({ transaction }) => {

    const style = {
        container: 'w-full font-semibold text-sm border-y h-16',
        image: 'p-1 w-10 h-10 rounded-full',
        name: 'flex items-center space-x-3',
        icon: 'rounded-full p-2 w-8 h-8 border hover:cursor-pointer hover:transition hover:bg-[#30D5C8] hover:text-white'
    }

    const download = e => {

    }

    return (
        <tr className={style.container}>
            <td>
                <div className='flex'>
                    <img className={style.image} src="/images/dummyProfile.jpg" />
                    <p className={style.name}>{transaction.user.id}</p>
                </div>
            </td>
            <td><div><p>{transaction.date.split(" ")[0]}</p>
                {/* <p className='font-light text-xs'>{transaction.date.split(" ")[1].split(".")[0]}</p> */}
            </div></td>
            <td>{transaction.transaction_id}</td>
            <td>{transaction.ticket.route.price} &nbsp; BDT</td>
            <td className={`${transaction.status.toLowerCase() === "paid" ? "text-green-400" : "text-orange-400"}`}>{transaction.status.toUpperCase()}</td>
            <td className=''>
                <div>
                    <ImDownload2 onClick={download} className={style.icon} />
                </div>
            </td>
        </tr>
    )
}

export default TransactionV2