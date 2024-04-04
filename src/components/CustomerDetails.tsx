import { useEffect, useMemo, useState } from "react";
import { CustomerDataType } from "../data/customerData"

interface CustomerDetailsProps {
    singleCustomer: CustomerDataType | null;
}
interface ImageType {
    src: {
        medium: string;
    };
    alt: string;
}
const CustomerDetails: React.FC<CustomerDetailsProps> = ({ singleCustomer }) => {
    const [images, setImages] = useState([]);
    const fetchImagesData = async () => {

        try {
            const res = await fetch(`https://api.pexels.com/v1/search?query=glass&per_page=80`, {
                headers: {
                    Authorization: `XPZSUjA1mV5YUaEMlW5s8zlJ361IAE7DCybydneNshkcmAYwY27CkLRl`
                }
            });
            if (!res.ok) {
                throw new Error(`Failed to fetch    : ${res.status} ${res.statusText}`);
            }
            const data = await res.json()
            setImages(data.photos)
        } catch (err) {
            console.log(err)
        }
    }

    const shuffleImages = useMemo(() => {

        for (let i = images.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [images[i], images[j]] = [images[j], images[i]];
        }
        return images;
    }, [images]);


    useEffect(() => {
        fetchImagesData();
    }, []);
    
    useEffect(() => {
        setInterval(() => {
            setImages(shuffleImages);
        }, 10000);

    }, [shuffleImages]);
    return (
        <div className="bg-[#f9f9f6] h-screen w-[75%] overflow-auto py-16">
            {
                singleCustomer &&
                <div>
                    <div className="w-[50%] m-auto text-center">
                        <h1 className="text-2xl font-medium mb-3">{(singleCustomer as CustomerDataType).title}</h1>
                        <p className="text-[#70706f]">{(singleCustomer as CustomerDataType).description}</p>
                    </div>
                    <div className="grid grid-flow-row grid-cols-3 w-[90%] m-auto mt-10 gap-8">
                        {
                            shuffleImages.slice(0, 9)?.map((img: ImageType) => (
                                <img className={`w-full h-[200px] overflow-hidden object-cover object-center rounded-md shadow-[0px_13px_27px_-5px_rgba(50,50,93,0.25),0px_8px_16px_-8px_rgba(0,0,0,0.3)]`} src={img.src.medium} alt={img.alt} />
                            ))
                        }
                    </div>
                </div>

            }
        </div>
    )
}

export default CustomerDetails