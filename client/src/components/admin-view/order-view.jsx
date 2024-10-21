import React, { useState } from 'react';
import { DialogContent } from '../ui/dialog';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Badge } from '@/components/ui/badge';
import CommonForm from '../common/common-form';
import { useDispatch } from 'react-redux';
import { getAllOrders, updateOrderStatus } from '@/store/admin/order-slice';
import { useToast } from '@/hooks/use-toast';
import { getOrderDetail } from '@/store/shop/order-slice';

const statusFormControls = [
    {
        id: 1,
        name: "status",
        label: "Order Status",
        placeholder: "Select Status",
        componentType: "select",
        options: [
            {
                id: "pending", label: "Pending"
            },
            {
                id: "inProcess", label: "In Process"
            },
            {
                id: "inShipping", label: "In Shipping"
            },
            {
                id: "rejected", label: "Rejected"
            },
            {
                id: "delievered", label: "Delievered"
            }

        ]
    }
]

const AdminOrderView = ({ orderDetails }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const { _id, orderDate, orderStatus, userName, totalAmount, addressInfo, cartItems, paymentMethod, paymentStatus } = orderDetails;
    const { address, city, pincode, phoneNumber } = addressInfo;

    const [formData, setFormData] = useState({
        status: ""
    });

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

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateOrderStatus({ orderId: _id, status: formData.status })).then(res => {
            if (res?.payload?.status === 200) {
                toastSuccess(res?.payload?.message)
                dispatch(getOrderDetail(_id))
                dispatch(getAllOrders())
                setFormData({
                    status: ""
                })
            }
            else toastError(res?.payload)
        })
    }

    return (
        <DialogContent className="sm:max-w-[600px] p-6 border rounded-lg shadow-lg">
            <div className='grid gap-6'>
                {/* Order Summary */}
                <div className='grid gap-4'>
                    <h2 className='text-xl font-semibold text-gray-800'>Order Summary</h2>
                    <div className='grid gap-2'>
                        {[
                            { label: 'Order Id', value: _id },
                            { label: 'Order Date', value: orderDate },
                            { label: 'Order Status', value: <Badge className={`${orderStatus === "confirmed" ? 'bg-blue-500' : orderStatus === "rejected" ? 'bg-red-500' : orderStatus === "delievered" ? "bg-green-500" : "bg-gray-800"}`}>{orderStatus}</Badge> },
                            { label: 'Payment Status', value: <Badge className={`${paymentStatus === "paid" ? 'bg-green-500' : 'bg-red-500'}`}>{paymentStatus}</Badge> },
                            { label: 'Payment Method', value: paymentMethod },
                            { label: 'Order Price', value: `${totalAmount} ₹` }
                        ].map(({ label, value }) => (
                            <div className='flex items-center justify-between'>
                                <p className='font-medium text-gray-700'>{label}</p>
                                <Label className='text-gray-600'>{value}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                <Separator />

                {/* Order Details */}
                <div className='grid gap-4'>
                    <h3 className='text-lg font-semibold text-gray-800'>Order Details</h3>
                    <ul className='grid gap-3'>
                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map(cartItem => (
                                <li className='flex items-center justify-between py-2'>
                                    <span className='text-gray-700'>{cartItem.title} x {cartItem.quantity}</span>
                                    <span className='text-gray-600'>{cartItem.price} ₹</span>
                                </li>
                            ))
                        ) : (
                            <li className='text-gray-500'>No items in cart</li>
                        )}
                    </ul>
                </div>
                <Separator />

                {/* Shipping Details */}
                <div className='grid gap-4'>
                    <h3 className='text-lg font-semibold text-gray-800'>Shipping Details</h3>
                    <div className='grid gap-1 text-gray-600'>
                        <span className='font-medium'>{userName}</span>
                        <span>{address}</span>
                        <span>{city}</span>
                        <span>{pincode}</span>
                        <span>{phoneNumber}</span>
                    </div>
                </div>

                <div>
                    <CommonForm
                        handleSubmit={handleSubmit}
                        formData={formData}
                        setFormData={setFormData}
                        formControls={statusFormControls}
                        btnText={"Update Order Status"}
                    />
                </div>
            </div>
        </DialogContent>
    );
}

export default AdminOrderView;
