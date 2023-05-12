import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../AuthProviders/AuthProvider';
import SocialLogin from '../../Shared/SocialLogin';



const Login = () => {
    const { loginUser } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const handleLogin = (event) => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value


        const from = location?.state?.from?.pathname || '/'


        loginUser(email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                navigate(from, { replace: true })



                const loggedUser = {
                    email: user.email
                }

                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        localStorage.setItem('car-access-token',data.token)
                    })



            })
            .catch(error => {
                console.log(error.message)
            })

    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left  me-60 w-1/2">
                    <img src={img} alt="" />

                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-5xl text-center font-bold">Login </h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="text" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' type="text" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-warning" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='font-semibold text-sm'>New To Car Doctors <Link className='text-bold text-orange-500' to='/signUp' state={location.state}>Sign Up</Link></p>
                        {/* <p>Have an account? </p> */}
                <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;