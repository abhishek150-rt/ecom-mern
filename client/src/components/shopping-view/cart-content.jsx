import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { deleteCart, fetchCartItems, updateCart } from '@/store/shop/cart-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '@/hooks/use-toast'

const CartContent = ({ cartItem }) => {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cartItems);
    const { productList } = useSelector(state => state.shopProducts);

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


    const handleCartQuantity = (productId, mode) => {
        const product = productList?.find(val => val._id === productId);
        const totalStock = product?.totalStock;

        const items = cartItems?.items?.map(item => ({
            productId: item.productId._id,
            ...item.productId,
            quantity: item.quantity
        })) || [];

        if (mode === "add") {
            const indexOfCurrItem = items.findIndex(item => item.productId === productId);
            if (indexOfCurrItem > -1) {
                const getQuantity = items[indexOfCurrItem].quantity;
                if (getQuantity + 1 > totalStock) {
                    toastError(`Only ${totalStock} quantity can be added to cart`);
                    return;
                }
            }
        }

        const quantity = mode === "add" ? cartItem.quantity + 1 : cartItem.quantity - 1;

        dispatch(updateCart({ userId: userInfo?.id, productId, quantity, mode }))
            .then(res => {
                if (res?.payload?.status === 200) {
                    toastSuccess(res.payload.message);
                    dispatch(fetchCartItems(userInfo?.id));
                } else {
                    toastError(res.payload);
                }
            });
    };


    const removeCart = (productId) => {
        dispatch(deleteCart({ userId: userInfo?.id, productId, })).then(res => {
            if (res?.payload?.status === 200) {
                toastSuccess(res.payload.message);
                dispatch(fetchCartItems(userInfo?.id))
            }
            else toastError(res.payload);
        })
    }

    const price = cartItem?.salePrice > 0 ? cartItem.salePrice : cartItem.price;
    return (
        <div className='flex items-center space-x-4' >
            <img src={cartItem.image} alt={cartItem.title} className='w-20 h-20 rounded object-cover' />
            <div className='flex-1 '>
                <h3 className="font-extrabold">
                    {cartItem.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleCartQuantity(cartItem.productId, "minus")}>
                        <Minus className='h-5 w-4' />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className='font-semibold'>{cartItem.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleCartQuantity(cartItem.productId, "add")}>
                        <Plus className='h-5 w-4' />
                        <span className="sr-only">Increade</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-semibold">
                    {
                        (price * cartItem.quantity).toFixed(2)
                    }&nbsp;₹
                </p>
                <Trash onClick={() => removeCart(cartItem.productId)} className='cursor-pointer mt-2 text-red-600' size={20} />
            </div>
        </div>
    )
}

export default CartContent