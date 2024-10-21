import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { capturePayment } from '@/store/shop/order-slice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const PaymentReturn = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const paymentId = params.get("paymentId");
  const payerId = params.get("payerId");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = sessionStorage.getItem("orderId")
      dispatch(capturePayment({ paymentId, payerId, orderId })).then(res => {
        if (res?.payload?.status === 200) {
          sessionStorage.clear()
          window.location.href = "/shop/paymentSuccess"
        }
      })
    }
  }, [paymentId, payerId])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payement..... Please wait</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default PaymentReturn