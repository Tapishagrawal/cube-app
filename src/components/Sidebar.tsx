import { useState } from "react";
import { CustomerDataType } from "../data/customerData";

interface SidebarProps {
    setSingleCustomer: React.Dispatch<React.SetStateAction<CustomerDataType | null>>;
    customerDatas: CustomerDataType[] | [];
}

const Sidebar: React.FC<SidebarProps> = ({ setSingleCustomer, customerDatas }) => {
    const [backColor, setBackColor] = useState(0);
    return (
        <div className="sidebar-scroll w-[25%] h-screen overflow-auto">
            {
                customerDatas &&
                customerDatas.map((data: CustomerDataType) => (
                    <div onClick={() => { setSingleCustomer(data), setBackColor(data.id) }} key={data.id} className={`cursor-pointer hover:bg-zinc-200 p-3 transition-all ${data.id === backColor && "bg-zinc-200"}`}>
                        <h3 className="text-xl font-medium">{data.title}</h3>
                        <p className="mt-1 line-clamp-3 text-[#70706f]">{data.description}</p>
                    </div>
                ))
            }
        </div>
    );
}
export default Sidebar;