import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/userSlice';
import { useDispatch } from 'react-redux';

const Header = () => {

    const { cartItem } = useSelector((state) => (state.cart));

    const { userInfo } = useSelector((state) => (state.user));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApi] = useLogoutMutation();

    const logoutHandler = async() =>{

        try{

            await logoutApi();
            dispatch(logout());
            navigate('/login');            

        }catch(err){
            console.log(err);
        }

    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl">LiviFy</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to='/cart'>Cart ({`${cartItem.length}`})</Link></li>
                    <li>
                        {userInfo ? (<details>
                            <summary>{userInfo.name}</summary>
                            <ul className="bg-base-100 rounded-t-none p-2">
                                <li><a>Light</a></li>
                                <li><a>Profile</a></li>
                                <li onClick={logoutHandler}><a>Logout</a></li>
                            </ul>
                        </details>) : (<li>
                            <Link to="/login">Sign in</Link>
                        </li>)}

                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header
