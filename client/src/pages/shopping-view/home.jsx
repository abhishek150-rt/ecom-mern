import { Button } from '@/components/ui/button'
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Footprints, ShirtIcon, WatchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, fetchProductDetails } from '@/store/shop/product-slice'
import ShoppingProductTile from './productTile'
import nike from "../../assets/nike.png"
import levi from "../../assets/levis.png"
import hm from "../../assets/h&m.png"
import puma from "../../assets/puma.png"
import zara from "../../assets/zara.png"
import { useNavigate } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'
import { getAllSlides } from '@/store/admin/slider-slice'

const categories = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

const brands = [
  {
    id: "nike", label: "Nike", src: nike
  },
  {
    id: "puma", label: "Puma", src: puma
  },
  {
    id: "levi", label: "Levi's", src: levi
  },
  {
    id: "zara", label: "Zara", src: zara
  },
  {
    id: "h&m", label: "H&M", src: hm
  },
]

const ShoppingHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { toast } = useToast()
  const { productList } = useSelector(state => state.shopProducts);
  const { slideList } = useSelector(state => state.slider);
  const { userInfo } = useSelector(state => state.auth);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { cartItems } = useSelector(state => state.cartItems);


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideList.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideList.length) % slideList.length);
  };

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

  const handleNavigate = (mode, type) => {
    navigate(`/shopping/listing?${mode}=${type}`, {
      state: {
        mode, type
      }
    })
  }

  const handleCart = (productId, totalStock) => {
    const items = cartItems && cartItems.items && cartItems?.items.map(item => ({
      productId: item.productId._id,
      ...item.productId,
      quantity: item.quantity
    }));
    if (items && Array.isArray(items) && items.length > 0) {
      const indexOfCurrItem = items.findIndex(item => item.productId == productId);
      if (indexOfCurrItem > -1) {
        const getQuantity = items[indexOfCurrItem].quantity;
        if (getQuantity + 1 > totalStock) {
          toastError(`Only ${getQuantity} quantity can be added to cart`);
          return
        }
      }
    }
    dispatch(addToCart({ userId: userInfo?.id, productId, quantity: 1 })).then(res => {
      if (res?.payload?.status === 200) {
        toastSuccess(res.payload.message);
        getItemsInCart()
      }
      else toastError(res.payload);
    })
  }



  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 2500);

    return () => clearInterval(timer);

  }, [])

  useEffect(() => {
    dispatch(getAllSlides())
    dispatch(fetchAllProducts({ filtersParams: "", sortParams: "" }))
  }, [])

  return (
    <div className='flex flex-col min-h-screen'>
      <div className="relative w-full h-[850px] overflow-hidden">
        {
          slideList && slideList.length > 0 &&
          slideList.map((slide, index) => (
            <img
              src={slide.image}
              key={index}
              className={`absolute top-0 left-0 w-full h-full object-center object-fill transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            />
          ))
        }
        <Button className="absolute top-1/2 left-4 transform -translate-y-1/2" onClick={prevSlide}>
          <ChevronLeftIcon className='w-4 h-4' />
        </Button>

        <Button className="absolute top-1/2 right-4 transform -translate-y-1/2" onClick={nextSlide}>
          <ChevronRightIcon className='w-4 h-4' />
        </Button>
      </div>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop By Category</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {
              categories.map(category => (
                <Card key={category.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleNavigate("category", category.id)}
                >
                  <CardContent className="flex flex-col justify-center p-6 items-center">
                    <category.icon className='w-12 h-12 mb-4 text-pretty' />
                    <span className='font-bold'>{category.label}</span>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>

      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop By Brands</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {
              brands && brands.map(brand => (
                <Card key={brand.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleNavigate("brand", brand.id)}
                >
                  <CardContent className="flex flex-col justify-center p-6 items-center">
                    <img src={brand.src} alt={brand.label} className='h-20 w-20 object-cover' />
                    <span className='font-bold'>{brand.label}</span>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Featured Products</h2>
          <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 p-4'>
            {
              productList && productList.length > 0 &&
              productList.slice(0, 4).map(ele => (
                <ShoppingProductTile key={ele.id} productItem={ele}
                  handleCart={handleCart}
                />
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default ShoppingHome;
