import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { addProductReview, getProductReviews } from '@/store/shop/review-slice'
import { Label } from '../ui/label'
import StarRating from '../common/star-rating'

const ProductDetails = ({ open, setOpen, product, handleCart, toastError, toastSuccess }) => {

    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth)
    const { reviewList } = useSelector(state => state.review);

    const averageRating = reviewList && reviewList.length > 0
    ? reviewList.reduce((acc, curr) => acc + curr.reviewValue, 0) / reviewList.length
    : 0;
    const [reviewMsg, setReviewMsg] = useState(null);
    const [rating, setRating] = useState(0)

    const handleRatingChange = (ratingVal) => {
        setRating(ratingVal)
    }

    const handleSubmitReview = () => {
        const payload = {
            productId: product._id,
            userId: userInfo?.id,
            userName: userInfo?.userName,
            reviewMessage: reviewMsg,
            reviewValue: rating
        }
        dispatch(addProductReview(payload)).then(res => {
            if (res.payload.status === 200) {
                setOpen(false)
                toastSuccess(res.payload.message)
                dispatch(getProductReviews(product?._id))
            }
            else toastError(res.payload)
        })
    }

    useEffect(() => {
        dispatch(getProductReviews(product?._id))
    }, [product])
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[50vw] sm:max-w[80vw] lg:max-[70vw]:" >
                <div className='relative overflow-hidden rounded-lg'>
                    <img src={product?.image} className='aspect-square w-full object-cover' width={600} height={600} alt={product?.title} />
                </div>
                <div>
                    <h1 className='text-3xl font-extrabold'>
                        {product?.title}
                    </h1>
                    <p className='text-muted-foreground text-md mb-5 mt-4'>
                        {product?.description}
                    </p>
                    <div className="flex items-center gap-2">
                        <div className='flex items-center gap-0.5'>
                            <StarRating rating={averageRating} />
                        </div>
                        <span className='text-muted-foreground'>({averageRating.toFixed(1)})</span>
                    </div>



                    <div className='mt-5'>
                        {
                            product.totalStock == 0 ?
                                <Button className="w-full bg-red-600 hover:bg-red-600">Out Of Stock</Button>
                                :
                                <Button className="w-full" onClick={() => handleCart(product._id, product.totalStock)}>Add To Cart</Button>
                        }

                    </div>

                    <Separator className="mt-5" />
                    <div className='max-h-[300px] overflow-auto'>
                        <h2 className='text-xl font-bold mb-4'>
                            Reviews
                        </h2>
                        <div className='grid gap-6'>

                            {
                                reviewList && reviewList.length > 0 && reviewList.map(review =>
                                    <div className='flex gap-4'>
                                        <Avatar className="w-10 h-10 border">
                                            <AvatarFallback >
                                                {
                                                    review?.userName?.slice(0, 1).toUpperCase()
                                                }
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='grid gap-1'>
                                            <div className='flex items-center gap-2'>
                                                <h3 className='font-bold'>{review.userName}</h3>
                                            </div>
                                            <div className='flex items-center gap-0.5'>
                                                <StarRating rating={review.reviewValue} />
                                            </div>
                                            <p className='text-muted-foreground'>
                                               {review.reviewMessage}
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        <div className="mt-10 gap-2 flex flex-col">
                            <Label>Write A Review</Label>
                            <div className='flex gap-1'>
                                <StarRating rating={rating} handleRatingChange={handleRatingChange} />
                            </div>
                            <Input value={reviewMsg} onChange={e => setReviewMsg(e.target.value)} placeholder="Write Your reviews" />
                            <Button disabled={reviewMsg == null || reviewMsg.trim == ""}
                                onClick={handleSubmitReview}
                            >Submit</Button>
                        </div>
                    </div>

                </div>

            </DialogContent>
        </Dialog>
    )
}

export default ProductDetails