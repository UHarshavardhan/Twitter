import { useState } from "react";
import { Link } from "react-router-dom";

import XSvg from "../../../components/svg/x";
import { useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
	const navigate=useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [isPending, setIsPending] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsPending(true);
		setIsError(false);
		try {
			setIsPending(true);
			axios.post("http://localhost:8000/api/login", formData, {
				withCredentials: true
			});
			
			if (response.status === 200) {
				toast.success("Login successful");
				setTimeout(()=>{
					navigate("/");
				},2000)
			} else {
				throw new Error(response || "Login unsuccessful");
			
			}
		} catch (error) {
			setError(error);
			toast.error("Invalid password or username")
			setIsError(true);
		} finally {
			setIsPending(false);
		}
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className='max-w-screen-xl mx-auto flex h-screen'>
			<div className='flex-1 hidden lg:flex items-center justify-center'>
				<XSvg className='lg:w-2/3 fill-white' />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
					<XSvg className='w-24 lg:hidden fill-white' />
					<h1 className='text-4xl font-extrabold text-white'>{"Let's"} go.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='text'
							className='grow'
							placeholder='Enter your email'
							name='email'
							onChange={handleInputChange}
							value={formData.email}
						/>
					</label>

					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button className='btn rounded-full btn-primary text-white'>
						{isPending ? "Loading..." : "Login"}
					</button>
					{isError && <p className='text-red-500'>Invalid password or username</p>}
				</form>
				<div className='flex flex-col gap-2 mt-4'>
					<p className='text-white text-lg'>{"Don't"} have an account?</p>
					<Link to='/signup'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
