import { useState } from 'react'
import CustomerDetails from '../components/CustomerDetails'
import Sidebar from '../components/Sidebar';
import { customerData, CustomerDataType } from "../data/customerData"

export default function Home() {
    const [singleCustomer, setSingleCustomer] = useState<CustomerDataType | null>(null)
    const [customerDatas] = useState<CustomerDataType[] | []>(customerData)
    
    return (
        <div className='flex'>
            <Sidebar setSingleCustomer={setSingleCustomer} customerDatas={customerDatas} />
            <CustomerDetails singleCustomer={singleCustomer} />
        </div>
    )
}
