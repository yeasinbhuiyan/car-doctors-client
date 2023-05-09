import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    // eslint-disable-next-line no-unused-vars
    const [services,setServices] = useState([])
    useEffect(()=>{
        fetch('services.json')
        .then(res => res.json())
        .then(data=> setServices(data))
    },[])
    console.log(services);
    return (
        <div>
            <div className='text-center'>
                <h3 className='text-3xl text-orange-600'>Our Services</h3>
                <h2 className='text-5xl'>Our Service Area  </h2>
                <p>Lorem ipsum dolor sit amet conse  <br /> ctetur adipisicing elit. Maiores, eaque?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{
    services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard> )
}
            </div>
        </div>
    );
};

export default Services;