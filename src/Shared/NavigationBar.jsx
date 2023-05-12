import { Link } from "react-router-dom";
import logo from '../assets/logo.svg'
import { useContext } from "react";
import { AuthContext } from "../AuthProviders/AuthProvider";

const NavigationBar = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
        localStorage.removeItem('car-access-token')
    }


    // eslint-disable-next-line no-unused-vars
    const navigationLink =
        <>
            <li><Link to='/' className="me-7 font-semibold">Home</Link></li>
            <li><Link className="font-semibold me-7">About</Link></li>
            {user ?  <>
            <li>
            <Link to='bookings' className="font-semibold me-7">Bookings</Link></li>
            <li>
                <button className="font-semibold" onClick={handleLogOut} >Logout</button>
                </li></>
            
            
            
            : 
             <li><Link to='/login' className="font-semibold">Login</Link></li> 
                
            }


        </>


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navigationLink}

                    </ul>


                </div>
                <Link to='/'><img className="w-9/12" src={logo} alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu-horizontal px-1">
                    {navigationLink}
                </ul>


            </div>
            <div className="navbar-end">
                <a className="btn">Get started</a>
            </div>
        </div>
    );
};

export default NavigationBar;