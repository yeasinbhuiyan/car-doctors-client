import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../AuthProviders/AuthProvider';

const BookService = () => {
    const service = useLoaderData()
    console.log(service)
    // eslint-disable-next-line no-unused-vars
    const {title,_id,price,img} = service
    const {user} = useContext(AuthContext)


    const handleBookService =(event)=>{
        event.preventDefault()
        const form = event.target 
        const name = form.name.value 
        const date = form.date.value 
        const email = form.email.value 

        const order ={
            img,
            email,
            date,
            curstomarName: name,
            service: title,
            service_id : _id,
            price: price
        }

        fetch('http://localhost:5000/bookings',{
            method : 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){

                console.log(data)
            }
        })







        console.log(order)


    }
    return (
        <div>
            <h2 className='text-center text-3xl'>Book Service: {title}</h2>
            <form onSubmit={handleBookService}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className="form-control">
                        <label className="label">
                            <span  className="label-text">Name</span>
                        </label>
                        <input defaultValue={user?.name} type="text" name='name'  className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name='date' className="input input-bordered" />
                     
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input defaultValue={user?.email} type="text" name='email'  className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text"   defaultValue={'$'+ price} className="input input-bordered" />
                     
                    </div>
                </div>
                    <div className="form-control mt-6">
                        <input className='btn btn-warning' type="submit" value="Order Confirm" />
                    </div>
            </form>


        </div>





















    );
};

export default BookService;