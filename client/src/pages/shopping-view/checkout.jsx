import React, { useEffect, useState } from 'react'
import mainBanner from "../../assets/banner4.jpg"
import Address from './address'
import { useDispatch, useSelector } from 'react-redux'
import CartContent from '@/components/shopping-view/cart-content'
import { Button } from '@/components/ui/button'
import { createNewOrder } from '@/store/shop/order-slice'
import { useToast } from '@/hooks/use-toast'
const ShoppingCheckout = () => {
  const dispatch = useDispatch();
  const { toast } = useToast()
  const { cartItems } = useSelector(state => state.cartItems);
  const { userInfo } = useSelector(state => state.auth)
  const { approvalUrl } = useSelector(state => state.order);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const items = cartItems && cartItems.items && cartItems?.items.map(item => ({
    productId: item.productId._id,
    ...item.productId, // Spread the productId properties into the item
    quantity: item.quantity
  }));

  const totalAmount = items && items.length > 0 && items.reduce((total, item) => {
    const price = item.salePrice > 0 ? item.salePrice * item.quantity : item.price * item.quantity;
    return total + price;
  }, 0);

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

  const handleInitiatePaypal = () => {
    if (currentSelectedAddress === null) {
      toastError("Please select address to proceed");
      return
    }

    if (items === null || items === undefined || items.length === 0) {
      toastError("Cart is empty");
      return
    }

    const orderData = {
      userId: userInfo?.id,
      userName: userInfo?.userName,
      cartId: cartItems?._id,
      cartItems: items && items.map(val => ({
        productId: val.productId,
        title: val.title,
        image: val.image,
        price: val.salePrice > 0 ? val.salePrice : val.price,
        quantity: val.quantity
      })),
      addressInfo: currentSelectedAddress ? {
        addressId: currentSelectedAddress._id,
        address: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        pincode: currentSelectedAddress.pincode,
        phoneNumber: currentSelectedAddress.phoneNumber,
        additionalNotes: currentSelectedAddress.additionalNotes,
      } : null,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentId: "",
      paymentStatus: "pending",
      totalAmount: totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      payerId: "",
    }
    try {
      setIsLoading(true)
      dispatch(createNewOrder(orderData)).then(res => {
        if (res?.payload?.status === 201) {
          toastSuccess(res?.payload?.message);
          setIsPaymentStart(true)
          setIsLoading(false)
          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
        else {
          toastError(res?.payload)
          setIsPaymentStart(false)
          setIsLoading(false)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (approvalUrl) {
      // window.location.href = approvalUrl
    }
  }, [approvalUrl])

  return (
    <div className='flex flex-col'>
      {
        isLoading ?
          <>
            <div className='h-screen w-full flex justify-center items-center'>
              <h1>
                Proccessing Payment...
              </h1>
            </div>
          </> :
          <>
            <div className="relative overflow-hidden h-[300px] w-full">
              <img src={mainBanner} alt="checkout" className='h-full w-full object-cover object-center' />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5'>
              <Address setCurrentSelectedAddress={setCurrentSelectedAddress}
                currentSelectedAddress={currentSelectedAddress}
              />
              <div className='flex flex-col gap-4'>
                {
                  items && items.length > 0 && items.map(cartItem => <>
                    <CartContent cartItem={cartItem} />

                  </>)
                }
                <div className='mt-8 space-y-4'>
                  <div className='flex justify-between'>
                    <span className='font-bold'>
                      Total
                    </span>
                    <span className='font-bold'>
                      {totalAmount && totalAmount.toFixed(2)}&nbsp;₹
                    </span>
                  </div>
                </div>
                <div className='mt-4'>
                  <Button onClick={handleInitiatePaypal} className="w-full">Checkout with Paypal</Button>
                </div>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default ShoppingCheckout