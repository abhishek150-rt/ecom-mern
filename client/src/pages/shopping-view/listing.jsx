import React, { useEffect, useState } from 'react'
import ProductFilter from './filter'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuTrigger, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowUpDownIcon } from 'lucide-react'
import { sortOptions } from '@/utils'
import { fetchAllProducts, fetchProductDetails } from '@/store/shop/product-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '@/hooks/use-toast'
import ShoppingProductTile from './productTile'
import ProductDetails from '@/components/shopping-view/product-details'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useLocation } from 'react-router-dom'
import CommonForm from '@/components/common/common-form'
import { searchProducts } from '@/store/shop/search-slice'


const formControlls = [
  {
    id: 1, name: "keyword", label: "Search", placeholder: "Search", componentType: "input", type: "text"
  },
]


const ShoppingList = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { toast } = useToast()
  const { productList, productDetails } = useSelector(state => state.shopProducts);
  const { searchedProductList } = useSelector(state => state.search);
  const [formData, setFormData] = useState({
    keyword: ""
  })

  console.log("search", searchedProductList)

  const { userInfo } = useSelector(state => state.auth);

  const { cartItems } = useSelector(state => state.cartItems);
  const [sort, setSort] = useState(null)
  const [filters, setFilters] = useState({});
  const [open, setOpen] = useState(false);

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

  const getAllProducts = async => {
    dispatch(fetchAllProducts({ filtersParams: filters, sortParams: sort })).then(res => {
      if (res?.payload?.status === 200) toastSuccess(res.payload.message);
      else toastError(res.payload);
    })
  }

  const handleFilter = (currentSectionId, currentOption) => {
    let copyFilters = { ...filters }
    const indexOfCurrSection = Object.keys(copyFilters).indexOf(currentSectionId);
    if (indexOfCurrSection === -1) {
      copyFilters = {
        ...copyFilters,
        [currentSectionId]: [currentOption]
      }
    }
    else {
      const indexOfCurrentOption = copyFilters[currentSectionId].indexOf(currentOption)
      if (indexOfCurrentOption === -1) {
        copyFilters[currentSectionId].push(currentOption)
      }
      else {
        copyFilters[currentSectionId].splice(indexOfCurrentOption, 1)
      }
    }

    setFilters(copyFilters)

  }

  const getProductDetails = (id) => {
    dispatch(fetchProductDetails(id)).then(res => {
      if (res?.payload?.status === 200) {
        setOpen(true);
        toastSuccess(res.payload.message);
      }
      else toastError(res.payload);
    })
  }

  const getItemsInCart = () => {
    dispatch(fetchCartItems(userInfo?.id))
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

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchProducts(formData.keyword))
  }

  useEffect(() => {
    getAllProducts()
    getItemsInCart()
  }, [sort, filters]);

  useEffect(() => {
    if (location && location.state && location.state.mode && location.state.type) {
      const { type, mode } = location.state;
      setFilters({
        [mode]: [type]
      })
    }
    else setFilters({})

  }, [location])

  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-6 mf:p-6 '>
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold mr-2'>
            All Products
          </h2>
          <div className='flex items-center gap-5'>
            {/* <CommonForm
              formControls={formControlls}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              btnText={"Search"}
            /> */}
            <span className='text-muted-foreground'>{productList?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ArrowUpDownIcon className='h-4 w-4' />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={(value) => setSort(value)}>
                  {
                    sortOptions && sortOptions.map(opt =>
                      <DropdownMenuRadioItem value={opt.id} className="cursor-pointer" key={opt.id}>{opt.label}</DropdownMenuRadioItem>
                    )
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-5 p-4
        max-h-[720px] overflow-y-auto
        '>
          {
            productList && productList.length > 0 &&
            productList.map(ele =>
              <ShoppingProductTile productItem={ele} getProductDetails={getProductDetails}
                handleCart={handleCart}
              />
            )
          }
        </div>
      </div>
      {
        open && <ProductDetails
          open={open}
          setOpen={setOpen}
          product={productDetails}
          handleCart={handleCart}
          toastError={toastError}
          toastSuccess={toastSuccess}
        />
      }
    </div>
  )
}

export default ShoppingList