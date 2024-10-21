import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import AdminLayout from "./components/admin-view/layout"
import AdminProducts from "./pages/admin-view/products"
import AdminOrders from "./pages/admin-view/orders"
import AdminFeatures from "./pages/admin-view/features"
import AdminDashboard from "./pages/admin-view/dashboard"
import ShoppingLayout from "./components/shopping-view/layout"
import NotFound from "./pages/not-found"
import ShoppingHome from "./pages/shopping-view/home"
import ShoppingAccount from "./pages/shopping-view/account"
import ShoppingCheckout from "./pages/shopping-view/checkout"
import ShoppingList from "./pages/shopping-view/listing"
import CheckAuth from "./components/common/check-auth"
import Unauthorized from "./pages/un-auth"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { userAuth } from "./store/auth-slice"
import { Skeleton } from "@/components/ui/skeleton"
import PaymentReturn from "./pages/shopping-view/paymentReturn"
import PaymentSuccess from "./pages/shopping-view/paymentSuccess"

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, userInfo, loading } = auth

  let user = null
  if (userInfo) {
    user = userInfo
  }

  useEffect(() => {
    dispatch(userAuth())
  }, [])

  if (loading) {
    return <Skeleton className="w-[100vw] h-[100vh]" />

  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          </CheckAuth>
        } />

        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        } >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        } >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="products" element={<AdminProducts />} />
          <Route />
        </Route>
        <Route path="/shopping" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        } >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="listing" element={<ShoppingList />} />
          <Route path="paymentReturn" element={<PaymentReturn />} />
          <Route path="paymentCancel" element={<PaymentReturn />} />
          <Route path="paymentSuccess" element={<PaymentSuccess />} />
          <Route />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </div>
  )
}

export default App
