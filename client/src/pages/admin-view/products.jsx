import { ProductImageUpload } from '@/components/admin-view/productImage'
import CommonForm from '@/components/common/common-form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/product-slice'
import { initialProductFormData, productFormControls } from '@/utils'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminProductCard from './productCard'

const AdminProducts = () => {
    const dispatch = useDispatch();
    const { toast } = useToast()
    const { productList } = useSelector(state => state.adminProducts);
    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
    const [formData, setFormData] = useState(initialProductFormData);
    const [imageFile, setImageFile] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [currentEditedId, setCurrentEditedId] = useState(null)
    const [loading, setLoading] = useState(false)


    const toastSuccess = (message) => {
        toast({
            variant: "success",
            title: message || "Success",
            // action: <ToastAction altText="Close">Close</ToastAction>,
        });
    };

    const toastError = (message) => {
        toast({
            variant: "destructive",
            title: message,
            // action: <ToastAction altText="Close">Close</ToastAction>,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            let res;
            if (currentEditedId) {
                res = dispatch(editProduct({ formData, id: currentEditedId }));
            } else {
                res = dispatch(addNewProduct({ ...formData, image: imageUrl }));
            }
            if (res?.payload?.status === (currentEditedId ? 200 : 201)) {
                toastSuccess(res.payload.message);
                setFormData(initialProductFormData);
                setImageUrl(null);
                setImageFile(null);
                setOpenCreateProductDialog(false);
                getAllProducts();
                setCurrentEditedId(null)
            } else {
                toastError(res.payload);
            }
        } catch (error) {
            toastError("An unexpected error occurred.");
        }
    };

    const getAllProducts = async => {
        dispatch(fetchAllProducts()).then(res => {
            if (res?.payload?.status === 200) toastSuccess(res.payload.message);
            else toastError(res.payload);
        })
    }

    const handleEdit = (product) => {
        setOpenCreateProductDialog(true)
        setCurrentEditedId(product?._id)
        setImageUrl(product?.image)
        setFormData(product)
    }

    const handleDelete = (id) => {
        try {
            dispatch(deleteProduct(id)).then(res => {
                if (res?.payload?.status === 200) {
                    toastSuccess(res.payload.message);
                    getAllProducts();
                }
            })
        }
        catch (error) {
            toastError("An unexpected error occurred.");
        }
    }





    useEffect(() => {
        getAllProducts()
    }, [])

    // if (loading) {
    //     return <div>Loading.........</div>
    // }

    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={() => setOpenCreateProductDialog(true)}>Add New Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4  max-h-[690px] overflow-y-auto">
                {
                    productList && productList.length > 0 && productList.map(product =>
                        <React.Fragment key={product._id}>
                            <AdminProductCard product={product} handleEdit={handleEdit} handleDelete={handleDelete} />
                        </React.Fragment>
                    )
                }
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                <Sheet open={openCreateProductDialog} onOpenChange={() => {
                    setCurrentEditedId(null)
                    setOpenCreateProductDialog(false)
                    setFormData(initialProductFormData)
                }}>
                    <SheetContent side="right" className="overflow-auto" >
                        <SheetHeader>{
                            currentEditedId ? "Update Product" : "Add New Product"
                        }</SheetHeader>
                        <div className="py-6">
                            <ProductImageUpload
                                imageFile={imageFile}
                                setImageFile={setImageFile}
                                imageUrl={imageUrl}
                                setImageUrl={setImageUrl}
                                loading={loading}
                                setLoading={setLoading}
                                currentEditedId={currentEditedId}
                            />
                            <CommonForm
                                formControls={productFormControls}
                                formData={formData}
                                setFormData={setFormData}
                                btnText={currentEditedId === null ? "Add Product" : "Update Product"}
                                handleSubmit={handleSubmit}
                            // isNotValid={!isValid()}

                            />
                        </div>
                    </SheetContent>
                    <div className="py-6">

                    </div>
                </Sheet>
            </div>
        </Fragment>
    )
}

export default AdminProducts