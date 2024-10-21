import CommonForm from '@/components/common/common-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { addAddress, deleteAddress, editAddress, fetchAllAddress } from '@/store/shop/address-slice'
import { addressFormControls, initialaddressFormData } from '@/utils'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddressCard from './addressCard'

const Address = ({ setCurrentSelectedAddress, currentSelectedAddress }) => {
    const dispatch = useDispatch()

    const { addressList } = useSelector(state => state.address);

    const { userInfo } = useSelector(state => state.auth)
    const [formData, setFormData] = useState(initialaddressFormData)
    const [currentAddressId, setCurrentAddressId] = useState(null)
    const { toast } = useToast()

    const toastSuccess = (message) => {
        toast({

            variant: "success",
            title: message || "Success",
        });
    };

    const toastError = (message) => {
        toast({
            variant: "destructive",
            title: message,
        });
    };

    const getAllAddress = () => {
        dispatch(fetchAllAddress({ userId: userInfo.id })).then(res => {
            if (res?.payload?.status === 200) {
                toastSuccess(res.payload.message)
            }
            else toastError(res.payload)
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (currentAddressId) {
            const payload = {
                ...formData,
                userId: userInfo?.id,
                addressId: currentAddressId
            }
            dispatch(editAddress(payload)).then(res => {
                if (res?.payload?.status === 200) {
                    toastSuccess(res.payload.message)
                    setFormData(initialaddressFormData)
                    setCurrentAddressId(null)
                    getAllAddress()
                }
                else toastError(res.payload)
            })
        }
        else {
            if (addressList.length === 3) {
                toastError("Can not add more than 3 address")
                setFormData(initialaddressFormData)
                return;
            }
            const payload = {
                ...formData,
                userId: userInfo.id
            }
            dispatch(addAddress(payload)).then(res => {
                if (res?.payload?.status === 201) {
                    toastSuccess(res.payload.message)
                    setFormData(initialaddressFormData)
                    getAllAddress()
                }
                else toastError(res.payload)
            })
        }
    }

    const handleDeleteAddress = addressId => {
        const payload = {
            userId: userInfo.id, addressId
        }
        dispatch(deleteAddress(payload)).then(res => {
            if (res?.payload?.status === 200) {
                toastSuccess(res.payload.message)
                setFormData(initialaddressFormData)

                getAllAddress()
            }
            else toastError(res.payload)
        })
    }

    const handleEditAddress = addressInfo => {
        setCurrentAddressId(addressInfo?._id)
        setFormData({
            address: addressInfo.address,
            city: addressInfo.city,
            pincode: addressInfo.pincode,
            phoneNumber: addressInfo.phoneNumber,
            additionalNotes: addressInfo.additionalNotes
        })
    }

    useEffect(() => {
        if (userInfo && userInfo.id) {
            getAllAddress()
        }
    }, [userInfo])

    return (
        <Card>
            <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2
            md:grid-cols-3 lg:grid-cols-4 gap-2
            '>
                {
                    addressList && addressList.length > 0 && addressList.map(address =>
                        <AddressCard addressInfo={address}
                            handleDeleteAddress={handleDeleteAddress}
                            handleEditAddress={handleEditAddress}
                            currentSelectedAddress={currentSelectedAddress}
                            setCurrentSelectedAddress={setCurrentSelectedAddress}
                        />)
                }

            </div>
            <CardHeader>
                <CardTitle className="mb-4">
                    {
                        currentAddressId ? "Edit Address" : " Add New Address"
                    }

                </CardTitle>
                <CardContent className="space-y-3">
                    <CommonForm
                        formControls={addressFormControls}
                        formData={formData}
                        setFormData={setFormData}
                        btnText={currentAddressId ? "Edit Address" : "Save Address"}
                        handleSubmit={handleSubmit}
                    />
                </CardContent>
            </CardHeader>
        </Card>
    )
}

export default Address