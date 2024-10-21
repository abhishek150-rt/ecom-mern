import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import CartContent from './cart-content'
import { useNavigate } from 'react-router-dom'

const CartWrapper = ({ cartItems, setOpenCartModal }) => {

    const navigate = useNavigate()

    const totalAmount = cartItems && cartItems.length > 0 && cartItems.reduce((total, item) => {
        const price = item.salePrice > 0 ? item.salePrice * item.quantity : item.price * item.quantity;
        return total + price;
    }, 0);

    return (
        <SheetContent className="sm:max-w-md">
            <SheetHeader>
                <SheetTitle>
                    Your Cart
                </SheetTitle>
            </SheetHeader>
            <div className='mt-8 space-y-4'>
                {
                    cartItems && cartItems.length > 0 && cartItems.map(item => (
                        <CartContent key={item.id} cartItem={item} />
                    ))
                }
            </div>
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
            <Button onClick={() => {
                navigate("/shopping/checkout")
                setOpenCartModal(false)
            }} className="w-full mt-5">Checkout</Button>
        </SheetContent>
    )
}

export default CartWrapper;
