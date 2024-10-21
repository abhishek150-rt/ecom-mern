// import { useToast } from '@/hooks/use-toast';
// import { fetchAllAddress } from '@/store/shop/address-slice';
import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import mainBanner from "../../assets/banner4.jpg"
import Orders from './orders';
import Address from './address';
import ShoppingOrders from './orders';
const ShoppingAccount = () => {
  // const dispatch = useDispatch()



  return (
    <div className='flex flex-col'>
      <div className='relative h-[450px] w-full overflow-hidden'>
        <img
          src={mainBanner}
          alt="banner"
          className='h-full w-full object-cover object-center'
        />
      </div>
      <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
          <Tabs defaultValue='orders'>
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Adress</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount