import React, { useEffect, useState } from 'react'
import InfoCard from '../../common/InfoCard'
import { FaUsers } from "react-icons/fa"
import { TbCurrencyTaka } from "react-icons/tb"
import LineChart from '../../common/LineChart'
import { useAuth } from '../../../Auth/AuthContext'
import Loader from "../../common/Loader"
import BarChartCompare from '../../common/BarChartCompare'

const AdminDashboard = () => {

    const style = {
        btn: 'rounded-lg px-4 py-1 border-b hover:bg-gray-200 hover:transition',

    }

    const [selected, setSelected] = useState(0);
    const [users, setUsers] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const [revenue, setRevenue] = useState(null)
    const [loading, setLoading] = useState(true);
    const { getUsers, getTransactions, getRevenues } = useAuth();

    const [userData, setUserData] = useState(null);
    const [transactionData, setTransactionData] = useState(null);
    const [revenueData, setRevenueData] = useState(null)

    const loadData = async e => {
        debugger
        const u = await getUsers();
        setUsers(u)

        const t = await getTransactions();
        setTransactions(t);

        const r = await getRevenues();
        setRevenue(r.revenues)

        // filterData()
        // filterRevenue()
        // filterTransactions()

        setLoading(false)
    }

    const getLabel = (year, month) => {
        let str = "";
        switch (month) {
            case "01":
                str = "Jan"
                break
            case "02":
                str = "Feb"
                break
            case "03":
                str = "Mar"
                break
            case "04":
                str = "Apr"
                break
            case "05":
                str = "May"
                break
            case "06":
                str = "Jun"
                break
            case "07":
                str = "Jul"
                break
            case "08":
                str = "Aug"
                break
            case "09":
                str = "Sep"
                break
            case "10":
                str = "Oct"
                break
            case "11":
                str = "Nov"
                break
            case "12":
                str = "Dec"
                break
            default:
                break
        }
        str += `-${year.slice(-2)}`
        return str
    }

    const filterData = e => {
        debugger
        console.log(users)

        if (users) {
            let l = []
            let count = []

            let x = []

            users.map((u) => {
                let date = u.registrationDate
                let year = date.split(" ")[0].split("-")[0]
                let month = date.split(" ")[0].split("-")[1]

                let label = getLabel(year, month)
                //console.log(label)
                if (l.includes(label)) {
                    let index = l.indexOf(label)
                    count[index] += 1
                }
                else {
                    l.push(label)
                    count.push(1)
                }
            })

            l.map((ll, index) => {
                x.push({ date: ll, count: count[index] })
            })
            x = x.sort((a, b) => {
                let x = a.date.split("-")[0] + "-" + "20" + a.date.split("-")[1]
                let y = b.date.split("-")[0] + "-" + "20" + b.date.split("-")[1]
                return new Date(x) - new Date(y);
            })
            l = []
            let c = []

            x.map((obj) => {
                l.push(obj.date)
                c.push(obj.count)
            })

            setUserData({
                labels: l,
                datasets: [{
                    label: "Users Registered",
                    data: c,
                }]
            })
        }
    }

    const filterRevenue = e => {
        debugger
        if (revenue) {
            let l = []

            let revenue_app_dataset = []
            let revenue_manual_dataset = []

            revenue.map((r) => {
                let date = r.date
                let year = date.split("-")[0]
                let month = date.split("-")[1]
                let day = date.split("-")[2]
                let label = getLabel(year, month) + "-" + day

                l.push(label)
                revenue_app_dataset.push(r.revenue_app)
                revenue_manual_dataset.push(r.revenue_manual)
            })

            setRevenueData({
                labels: l,
                datasets: [
                    {
                        label: "Revenue by app",
                        data: revenue_app_dataset,
                        backgroundColor: "#60B1EE"
                    },
                    {
                        label: "Revenue manual",
                        data: revenue_manual_dataset,
                        backgroundColor: "#30D5C8",
                    }]
            })
        }
    }

    const filterTransactions = e => {
        debugger
        if (transactions) {
            let l = []
            let dataset = []

            transactions.count.map((r) => {

                let date = r.date
                let year = date.split("-")[0]
                let month = date.split("-")[1]
                let day = date.split("-")[2]
                let label = day + "-" + getLabel(year, month)
                l.push(label)

                dataset.push(r.amount)
            })

            setTransactionData({
                labels: l,
                datasets: [{
                    label: "Transaction amount",
                    data: dataset,
                }]
            })
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        filterData()
        filterRevenue()
        filterTransactions()
    }, [users, revenue, transactions])

    return (
        loading ? <Loader /> :
            <div className='flex flex-col bg-[#f6f8fa] w-full h-full'>
                <div className='flex items-center justify-between mx-24 mt-10'>
                    <div>
                        <InfoCard header={"User Count"} value={"10,365"} icon={<FaUsers />} url={"/images/assets/line-chart-1.png"} />
                    </div>
                    <div>
                        <InfoCard header={"Transactions Made"} value={"50,654"} icon={<FaUsers />} url={"/images/assets/pie-chart-1.png"} />
                    </div>
                    <div>
                        <InfoCard header={"Revenue Total"} value={`1,654,135`} bottomIcon={<TbCurrencyTaka />} icon={<FaUsers />} url={"/images/assets/combo-chart-1.png"} />
                    </div>
                </div>
                <div className='relative p-3 w-full h-full mt-5 flex px-14 my-10'>
                    <div className='flex flex-col w-full h-full bg-white pl-20'>
                        <div className='w-full space-x-3 mt-5 ml-2 pt-5'>
                            <button onClick={() => setSelected(0)} className={`${style.btn} ${selected == 0 ? "font-semibold border-b-[#30D5C8] border-b-2" : ""}`}>Users</button>
                            <button onClick={() => setSelected(1)} className={`${style.btn} ${selected == 1 ? "font-semibold border-b-[#30D5C8] border-b-2" : ""}`}>Transactions</button>
                            <button onClick={() => setSelected(2)} className={`${style.btn} ${selected == 2 ? "font-semibold border-b-[#30D5C8] border-b-2" : ""}`}>Revenue</button>
                        </div>
                        <div className='w-[50%] h-full pt-10'>
                            {selected == 0 && userData && <LineChart chartData={userData} />}
                            {selected == 1 && transactionData && <LineChart chartData={transactionData} />}
                            {selected == 2 && revenueData && <BarChartCompare chartData={revenueData} />}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default AdminDashboard