import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { File, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'

export const ProductImageUpload = ({ imageFile, setImageFile, imageUrl, setImageUrl, loading, setLoading, currentEditedId }) => {
    const inputRef = useRef(null)

    const handleFileUpload = e => {
        const file = e?.target?.files[0]
        if (file) setImageFile(file)
    }

    const handleRemoveFile = () => {
        setImageFile(null)
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const droppedFile = e?.dataTransfer?.files[0]
        if (droppedFile) setImageFile(droppedFile)
    }

    async function uploadImageToCloudinary() {
        const data = new FormData()
        data.append("file", imageFile)
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/admin/products/upload-image`, data);
            if (response?.data?.status === 200) {
                const url = response?.data?.result?.url
                setImageUrl(url)
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (imageFile) {
            uploadImageToCloudinary()
        }
    }, [imageFile]);


    return (
        <div className={`w-full mx-auto my-3 max-w-md`}>
            <div className={`${currentEditedId ? "hidden" : "visible"}`}>
                {
                    loading ? <Skeleton className="h-10 bg-gray-100 flex justify-center items-center"> <h1 className='text-xl text-blue-600 text-center'>Uploading.....</h1></Skeleton> :
                        <>
                            <Label className="text-lg mb-2 font-semibold block">Upload Image</Label>
                            <div className='border-2 border-dashed rounded-lg p-4' onDragOver={handleDragOver} onDrop={handleDrop}>
                                <Input type="file" id="image-upload" className="hidden" ref={inputRef} onChange={e => handleFileUpload(e)} />
                                {
                                    !imageFile ?
                                        <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer">
                                            <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' ></UploadCloudIcon>
                                            <span>Drag & drop or click to upload image</span>
                                        </Label>

                                        : <div className='flex items-center justify-between'>
                                            <div className="flex items-center">
                                                <File className='w-7 h-8 text-primary mr-2' />
                                            </div>
                                            <p className='text-sm font-medium'>{imageFile.name}</p>
                                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"
                                                onClick={() => handleRemoveFile()}
                                            >
                                                <XIcon className='w-4 h-4' />
                                                <span className='sr-only'>Remove File</span>
                                            </Button>
                                        </div>
                                }
                            </div>
                        </>
                }
            </div>

            {currentEditedId && <img src={imageUrl} height={"150px"} width={"100px"} alt="product-image" />}

        </div>
    )
}
