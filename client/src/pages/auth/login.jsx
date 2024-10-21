import CommonForm from '@/components/common/common-form'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { userAuth, userLogin } from '@/store/auth-slice'
import { initialLoginData, loginFormControls } from '@/utils'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Login = () => {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const [loginFormData, setLoginFormData] = useState(initialLoginData);

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(userLogin(loginFormData)).then(res => {
      if (res?.payload?.status === 200) {
        toast({
          variant: "success",
          title: res.payload.message || "User login Successfull.",
        })
      }
      else {
        toast({
          variant: "destructive",
          title: res.payload || "Something Went Wrong",
        })
      }
    })

  }



  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className="text-center">
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign In</h1>
        <p className='mt-2'>Don't have an account ?
          <Link to="/auth/register" className='ml-2 text-blue-500 font-medium text-primary hover:underline' >Register Now</Link>
        </p>

      </div>
      <CommonForm
        formControls={loginFormControls}
        setFormData={setLoginFormData}
        formData={loginFormData}
        handleSubmit={handleLogin}
        btnText={"Sign In"}
      />
    </div>
  )
}

export default Login