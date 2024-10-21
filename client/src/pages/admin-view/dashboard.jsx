import { ProductImageUpload } from "@/components/admin-view/productImage"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { addSlide, getAllSlides } from "@/store/admin/slider-slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function AdminDashboard() {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const { slideList } = useSelector(state => state.slider);

    const [imageFile, setImageFile] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [loading, setLoading] = useState(false)

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

    useEffect(() => {
        dispatch(getAllSlides())
        if (imageUrl) {
            dispatch(addSlide({ image: imageUrl })).then(res => {
                if (res?.payload?.status === 201) {
                    toastSuccess(res?.payload?.message)
                    setImageFile(null)
                    setImageUrl(null)
                    dispatch(getAllSlides())
                }
                else toastError(res?.payload)
            })
        }
    }, [imageUrl])
    return (
        <div>
            <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                loading={loading}
                setLoading={setLoading}
                currentEditedId={null}
            />
            <div>
                {
                    slideList && slideList.length > 0 && slideList.map(slide =>
                        <div className="relative my-4">
                            <img src={slide.image} alt={slide.image} className='w-full h-[300px] object-cover rounded-t-lg' />
                        </div>
                    )
                }
            </div>

        </div>
    )
}