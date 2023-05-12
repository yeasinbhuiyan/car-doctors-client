import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProviders/AuthProvider';
import BookingRow from './BookingRow';

const Bookings = () => {
    
    const {user} = useContext(AuthContext)
    const [bookings,setBookings] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:5000/bookings?email=${user.email}`)
        .then(res => res.json())
        .then(data => setBookings(data))
    },[])

    const handleDelete =(id) =>{
        const proceed = confirm('Are You Sure Want to Delete')
        if(proceed){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method: 'DELETE'

            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                if(data.deletedCount){
                    alert('Bookmark Deleted')

                    const remaining = bookings.filter(booking => booking._id !== id)
                    setBookings(remaining)
                    
                    
                }
            })
            
        }
    }

    const handleConfirm=(id)=>{
        fetch(`http://localhost:5000/bookings/${id}`,{
            method: 'PATCH',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({status: 'confirm'})
        
        })
        .then(res=> res.json())
        .then(data => {
  
            console.log(data)
            if(data.modifiedCount > 0){
                // alert ('')
                const remaining = bookings.filter(booking => booking._id !== id)
                const updated = bookings.find (booking => booking._id === id)
                updated.status = 'confirm'
                const newBookings = [updated,...remaining]
                setBookings(newBookings)
            }
        })

    }



    
    return (
        <div>
            <h2>Your Bookings : {bookings.length}</h2>


            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Image</th>
        <th>Service</th>
        <th>Date</th>
        <th>Price</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
     
    {
        bookings.map(booking => <BookingRow handleConfirm={handleConfirm} handleDelete={handleDelete} key={booking._id} booking={booking}></BookingRow>)
    }


  
    
    </tbody>
 
  
    
  </table>
</div>
            
        </div>
    );
};

export default Bookings;