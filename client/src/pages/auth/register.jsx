import CommonForm from '@/components/common/common-form'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { userRegistration } from '@/store/auth-slice'
import { initialRegisterData, registerFormControls } from '@/utils'
// import { title } from 'process'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [registerFormData, setRegisterFormData] = useState(initialRegisterData);

    const handleRegister = (e) => {
        e.preventDefault()
        dispatch(userRegistration(registerFormData)).then(res => {
            if (res?.payload?.status === 201) {
                toast({
                    variant: "success",
                    title: res.payload.message || "User Registration Successfull.",
                    action: <ToastAction altText="Close">Close</ToastAction>,
                })
                navigate("/auth/login")
            }
            else {
                toast({
                    variant: "destructive",
                    title: res.payload,
                    action: <ToastAction altText="Close">Close</ToastAction>,
                })
            }
        })
    }
    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className="text-center">
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
                <p className='mt-2'>Already have an account ?
                    <Link to="/auth/login" className='ml-2 text-blue-500 font-medium text-primary hover:underline' >Login Now</Link>
                </p>

            </div>
            <CommonForm
                formControls={registerFormControls}
                setFormData={setRegisterFormData}
                formData={registerFormData}
                handleSubmit={handleRegister}
                btnText={"Create Account"}
            />
        </div>
    )
}

export default Register