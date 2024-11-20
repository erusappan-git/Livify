import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {toast} from "react-toastify";
import { setUser } from "../slices/userSlice";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginApi , {isLoading}] = useLoginMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        if(email === "" || password === ""){

            alert("Please fill all the fields");

        } else {

            try{

                const res = await loginApi({ email , password }).unwrap();

                dispatch(setUser({...res}));

                navigate('/');

            } catch(err) {

                toast.error(err.data.message);

            }
        }
    }

    return (
        <div>
            <h1 className="text-4xl font-bold mb-6">Sign In</h1>
            <form className="w-full" onSubmit={submitHandler}>
                <label className="input input-bordered flex items-center gap-2 mb-5">
                    <input type="text" className="grow" onChange={(e) => setEmail(e.target.value)} placeholder="Email" value={email} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="password" className="grow" onChange={(e) => setPassword(e.target.value)} placeholder="Password" value={password} />
                </label>
                <button className="btn btn-primary mt-5" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                </button>
            </form>

        </div>
    )
}

export default Login
