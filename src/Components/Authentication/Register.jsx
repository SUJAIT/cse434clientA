import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { AuthContext } from './ContextApi/AuthProvider'

const Register = () => {
  
// normal way  end
const navigate = useNavigate();
//react hook
const { register, handleSubmit, reset, formState: {errors},} = useForm()

const {createUser, updateUserProfile}  = useContext(AuthContext)

const onSubmit = (data)=>{
  //firbase api
  createUser(data.email, data.password)
  .then(result =>{
    const loggedUser = result.user;
    console.log(loggedUser)
    updateUserProfile(data.name, data.photoURL)
    .then(() =>{
      //data base user Information sending process start 
      const saveUser = {name:data.name, email:data.email, img:data.photoURL,phoneNumber:data.number}
fetch("http://localhost:5000/adminusers",{
  method:"POST",
  headers:{
    'content-type':'application/json'
  },
  body:JSON.stringify(saveUser)// saveUser Object send
})
.then(res =>res.json())
.then(data =>{
  if(data.insertedId){
    reset()
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'User Profile Updated Succesfully',
      showConfirmButton: false,
      timer: 1500
    });
    navigate("/")
  }
})
    })
    .catch(errors => console.log(errors))
  })
}
//react hook end


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
  <p className='mt-4 text-2xl font-semibold'>Register in to Jatri</p>
</div>

      <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
        <div className="form-control">
          <label className="label">
            <span className="label-text">User</span>
          </label>
          <input type="name"  {...register("name", { required: true })} placeholder="User Name" className="input input-bordered" required />
         {errors.name && <span className="text-red-600">This field is required</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input type="number"   {...register("number", { required: true })} placeholder="User Name" className="input input-bordered" required />
          {errors.number && <span className="text-red-600">This field is required</span>}
        </div>

        <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              {/* react-from-hook-uses */}
              <input type="text"  {...register("photoURL", { required: true })} placeholder="PhotoURL" className="input input-bordered" required />
              {errors.name && <span className="text-red-600">This field is required</span>}
            </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input  {...register("email", { required: true })} type="email" name='email' placeholder="email" className="input input-bordered" required />
          {errors.email && <span className="text-red-600">This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password"  {...register("password", {
                required: true,
  minLength:8,
  pattern : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,

              })} placeholder="password" className="input input-bordered" required />
              {/* Password1! */}
              {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 required</span>}
             
              {errors.password?.type === 'pattern' && <span className="text-red-600">At least one lowercase letter (a-z),At least one uppercase letter (A-Z),At least one digit (0-9),At least one special character from the set [@, $, !, %, *, ?, &],Minimum length of 6 characters</span>}
             
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <input className="btn btn-error aab" type="submit" value="Sign-in"/>
        </div>
     <span className='text-lg font-semibold'><span className='fontColor mr-2'>Already have an account?</span><Link className='text-sky-500' to={'/login'}>Login</Link></span>   
      </form>
    </div>
  </div>
</div>
    </div>
  )
}

export default Register


// ^ – Ensures the start of the string.
// (?=.*[a-z]) – At least one lowercase letter.
// (?=.*[A-Z]) – At least one uppercase letter.
// (?=.*\d) – At least one digit (0-9).
// (?=.*[@$!%*?&]) – At least one special character from the set [@, $, !, %, *, ?, &].
// [A-Za-z\d@$!%*?&]{6,} – Only allows valid characters and ensures the minimum length is 6.
// $ – Ensures the end of the string.

// aAA78^@?lk