import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'

const AdminProductCard = ({ product, handleEdit, handleDelete }) => {
    return (
        <Card className="w-full mx-auto max-w-sm">
            <div>
                <div className="relative">
                    <img src={product.image} alt={product.title} className='w-full h-[300px] object-cover rounded-t-lg' />
                </div>
            </div>

            <CardContent>
                <h2 className="text-xl font-bold mb-2 mt-2"> {product?.title} </h2>
                <div className='flex justify-between items-center mb-2'>
                    <span className={` ${product.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>
                        ₹{product?.price}
                    </span>
                    {
                        product.salePrice > 0 &&
                        <span className='text-lg font-bold'>₹{product?.salePrice}</span>
                    }
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => handleEdit(product)}>Edit</Button>
                <Button className="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(product?._id)}>Delete</Button>
            </CardFooter>
        </Card>
    )
}

export default AdminProductCard
