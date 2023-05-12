import React, { useContext } from 'react';
import { AuthContext } from '../AuthProviders/AuthProvider';

const SocialLogin = () => {
    const { google } = useContext(AuthContext)
    const handleGoogle = () => {
        google()
    }
    return (
        <>

            <div className="divider">OR</div>
            <button onClick={handleGoogle} className="btn btn-circle  text-xs mx-auto">
                Google
            </button></>

    );
};

export default SocialLogin;