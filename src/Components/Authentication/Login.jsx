import React, { useContext} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Register.css'
import { AuthContext } from './ContextApi/AuthProvider'
import Swal from 'sweetalert2';


const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"



  //firbase (sign/Login) api call
  const {signIn} = useContext(AuthContext)


  const handeLogin = event =>{
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = {email,password}
    console.log(user)
    signIn(email,password)
    .then(result=>{
      const user = result.user;
      console.log(user)
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Login Successful',
        showConfirmButton: false,
        timer: 1500
      })
      navigate(from,{replace:true});
    })
  }


  return (
    <div>
 
    <div className="w2 regParent">
    <div className='regLogo'>
          <img src="https://www.jatri.co/_nuxt/jatri-logo.19582a96.svg" alt="" />
   </div>
 <div className="hero-content flex-col lg:flex-row-reverse">
   <div className="text-center lg:text-left">
   </div>
   <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    
<div>
  <p className='mt-4 text-2xl font-semibold'>Log in to Jatri</p>
</div>

     <form onSubmit={handeLogin} className="card-body ">
     
       <div className="form-control">
         <label className="label">
           <span className="label-text">Email</span>
         </label>
         <input name='email' type="email" placeholder="email" className="input input-bordered" required />
       </div>
       <div className="form-control">
         <label className="label">
           <span className="label-text">Password</span>
         </label>
         <input name='password' type="password" placeholder="password" className="input input-bordered" required />
         <label className="label">
           <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
         </label>
       </div>
       <div className="form-control mt-6">
       <input className="btn btn-error aab" type="submit" value="Login"/>
       </div>
    
    <span className='text-lg font-semibold'><span className='fontColor mr-2'>Create a new account?</span><Link className='text-sky-500' to={'/register'}>Register</Link></span>   
     </form>
   </div>
 </div>
</div>
   </div>
  )
}

export default Login
