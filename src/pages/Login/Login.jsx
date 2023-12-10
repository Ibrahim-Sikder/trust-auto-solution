import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import Swal from "sweetalert2";
const Login = () => {
  const navigate = useNavigate()
  const email = useRef()
  const password = useRef()
  const handleLogin = event => {
    event.preventDefault()
    console.log(email.current.value, password.current.value)
    if (email.current.value == 'trust@gmail.com' && password.current.value == 'trust123') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login Successfully ! ',
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/dashboard')
    } else {
      Swal.fire({
        icon: "error",
        position: 'center',
 
        icon: 'error',
        title: 'Invalid Email & Password',
        showConfirmButton: false,
        timer: 1500
      })
 
        
    }
  }

  return (
    <div>
      <div className="py-5  bg-[#351E98] min-h-screen flex items-center justify-center ">
        <div>
          <h2 className="text-4xl capitalize mb-8 font-bold text-white text-center">
            Trust Auto Solution !
          </h2>
          <div className="signUnWrap">
            <form onSubmit={handleLogin}>
              <div className="signupFormWrap">
                <div className="singleSignupForm">
                  <label>Email </label>
                  <input
                    ref={email}
                    name="email"
                    placeholder="Email"
                    type="email"
                    className="inputField text-white"
                    autoComplete="off"
                  />
                </div>
                <div className="singleSignupForm">
                  <label>Password</label>
                  <input
                    ref={password}
                    name="password"
                    placeholder="Password"
                    type="password"
                    className="inputField text-white"
                    autoComplete="off"
                  />
                </div>
                <div className="singleSignupForm">
                  <button type="submit">
                    Login
                  </button>
                </div>
              </div>



              {/* <div className="my-8 signupLine"> </div> */}
              {/* <div className="text-center">
                <p>
                  Don’t have an account an account?
                  <Link to="/">
                    <b className="text-[#351E98]"> Sign Up </b>
                  </Link>
                </p>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
