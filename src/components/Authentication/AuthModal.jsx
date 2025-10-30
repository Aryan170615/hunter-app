import React, { useRef, useState } from 'react'
import { Button } from '@mui/material'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import GoogleButton from 'react-google-button'

const AuthModal = () => {
  const [open, setOpen] = useState(false)
  const [isSignup, setIsSignup] = useState(false)

  const emailRef = useRef(null)
  const passRef = useRef(null)
  const confirmPassRef = useRef(null)
  const googleProvider = new GoogleAuthProvider()
  function signInWithGoogle(){
      signInWithPopup(auth, googleProvider).then(res=> {
      alert("signup successful")
     }).catch((error)=>{
       alert(error.message)
     })
  }

  async function handleClick() {
    if (isSignup) {
      // Check if passwords match
      if (passRef.current.value !== confirmPassRef.current.value) {
        alert('Passwords do not match')
        return
      } try {
        const result= await createUserWithEmailAndPassword(auth, emailRef.current.value, passRef.current.value)
        alert(`Signed up successfully with email: ${emailRef.current.value}`)
        setOpen(false)
      } catch (error) {
        alert(error.message)
      }
    } else {
        try {
            const result = await signInWithEmailAndPassword(auth, emailRef.current.value, passRef.current.value )
            alert(`Logged in successfully with email: ${emailRef.current.value}`)
            setOpen(false)
        } catch (error) {
            alert(error.message)
        }
    }
  }
  if (open) {
    return (
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-96 flex flex-col items-center">
          {/* Header Tabs */}
          <div className="flex justify-around w-full mb-6 border-b pb-2">
            <h1
              className={`text-lg font-semibold cursor-pointer ${
                !isSignup ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
              }`}
              onClick={() => setIsSignup(false)}
            >
              Login
            </h1>
            <h1
              className={`text-lg font-semibold cursor-pointer ${
                isSignup ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
              }`}
              onClick={() => setIsSignup(true)}
            >
              Sign Up
            </h1>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <input
              type="email"
              placeholder="Enter Email"
              className="border text-gray-500 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              ref={emailRef}
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="border text-gray-500 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              ref={passRef}
            />
            {isSignup && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="border text-gray-500 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                ref={confirmPassRef}
              />
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              {isSignup ? 'SIGN UP' : 'LOGIN'}
            </Button>
          </div>

          <h1 className="my-3 text-gray-500">OR</h1>

          <div
            className="cursor-pointer "
          >
            <GoogleButton onClick={signInWithGoogle} />
          </div>

          <button
            className="mt-6 text-sm text-gray-500 hover:underline"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <button
        className="border rounded-md px-4 py-2 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        LOGIN
      </button>
    </div>
  )
}

export default AuthModal
