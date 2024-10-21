import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

const ShoppingProductTile = ({ productItem, getProductDetails, handleCart }) => {
    return (
        <Card className="w-full max-w-sm mx-auto" >
            <div>
                <div className='relative' onClick={() => getProductDetails(productItem._id)}>
                    <img
                        src={productItem.image}
                        alt={productItem.title}
                        className='w-full h-[300px] object-cover rounded-t-lg'
                    />
                    {
                        productItem?.salePrice > 0 ?
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                Sale
                            </Badge>
                            : null
                    }
                    {
                        productItem?.totalStock <= 5 && productItem.totalStock > 0 ?
                            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                                {`Only ${productItem.totalStock} left`}
                            </Badge>
                            : null
                    }
                </div>
                <CardContent className="p-4">
                    <h2 className='text-l font-bold mb-2 mt-2'>{productItem.title}</h2>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-sm text-muted-foreground
                        capitalize
                        '>
                            {productItem.category}
                        </span>
                        <span className='text-sm text-muted-foreground capitalize'>
                            {productItem.brand}
                        </span>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                        <span className={`${productItem.salePrice > 0 && "line-through"} text-lg font-semibold text-primary`}>
                            {productItem.price}&nbsp;₹
                        </span>
                        {
                            productItem.salePrice > 0 &&
                            <span className='text-lg font-semibold text-primary'>
                                {productItem.salePrice}&nbsp;₹
                            </span>
                        }
                    </div>
                </CardContent>
                <CardFooter>
                    {
                        productItem.totalStock == 0 ?
                            <Button className="w-full bg-red-600 hover:bg-red-600">Out Of Stock</Button>
                            :
                            <Button className="w-full" onClick={() => handleCart(productItem._id, productItem.totalStock)}>Add To Cart</Button>
                    }
                </CardFooter>
            </div>
        </Card>
    )
}

export default ShoppingProductTile