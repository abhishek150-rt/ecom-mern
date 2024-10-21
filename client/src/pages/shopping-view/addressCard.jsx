import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'


const AddressCard = ({ addressInfo, handleDeleteAddress, handleEditAddress, currentSelectedAddress, setCurrentSelectedAddress }) => {
    return (
        <Card className={`shadow rounded cursor-pointer ${currentSelectedAddress?._id == addressInfo?._id ? "bg-slate-100" : ""}`} onClick={() => setCurrentSelectedAddress ? setCurrentSelectedAddress(addressInfo) : null}>
            <CardContent className="grid p-4 gap-4">
                <Label>
                    Address: {addressInfo.address}
                </Label>
                <Label>
                    City:  {addressInfo.city}
                </Label>
                <Label>
                    Pincode:  {addressInfo.pincode}
                </Label>
                <Label>
                    Phone Number:  {addressInfo.phoneNumber}
                </Label>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
                <Button onClick={() => handleDeleteAddress(addressInfo?._id)}>Delete</Button>
            </CardFooter>
        </Card>
    )
}

export default AddressCard