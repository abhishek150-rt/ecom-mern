import { AlarmSmoke, House, LayoutDashboard, LogOut, Menu, ShipWheel, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { userLogout } from "@/store/auth-slice";
import CartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { deleteCart, fetchCartItems, updateCart } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const shoppingMenus = [
    {
        id: "home", label: "Home", icon: <LayoutDashboard />
    },
    {
        id: "products", label: "All Products", icon: <AlarmSmoke />
    },
    {
        id: "men", label: "Men", icon: <AlarmSmoke />
    },
    {
        id: "women", label: "Women", icon: <AlarmSmoke />
    },
    {
        id: "kids", label: "Kids", icon: <ShipWheel />
    },
    {
        id: "footwear", label: "Footwear", icon: <ShipWheel />
    },
    {
        id: "accessories", label: "Accessories", icon: <ShipWheel />
    },
]

function MenuItems() {
    const navigate = useNavigate();

    const handleNavigate = (mode, type) => {

        if (type === "home") {
            navigate("/shopping/home");
            return
        }
        if (type === "products") {
            navigate("/shopping/listing");
            return
        }
        navigate(`/shopping/listing?${mode}=${type}`, {
            state: {
                mode, type
            }
        })
    }
    return (
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
            {
                shoppingMenus && shoppingMenus.map(menuItem =>
                    <p className="text-sm font-medium cursor-pointer" key={menuItem.id}
                        onClick={() => handleNavigate("category", menuItem.id)}
                    >
                        {menuItem.label}
                    </p>)
            }
        </nav>
    )
}

function HeaderRightContent({ userName }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cartItems);

    const items = cartItems && cartItems.items && cartItems?.items.map(item => ({
        productId: item.productId._id,
        ...item.productId, // Spread the productId properties into the item
        quantity: item.quantity
    }));



    const [openCartModal, setOpenCartModal] = useState(false);

    useEffect(() => {
        dispatch(fetchCartItems(userInfo?.id))
    }, [])
    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <Sheet open={openCartModal} onOpenChange={() => setOpenCartModal(false)}>
                <Button onClick={() => setOpenCartModal(true)} variant="outline" size="icon"
                    disabled={items == null || items.length === 0}
                    className="relative"
                >
                    <ShoppingCart className="w-6 h-6" />
                    <span className="absolute top-[-5px] right-[2px] text-sm">
                        {items?.length || "0"}
                    </span>
                    <span className="sr-only">User Cart</span>
                </Button>
                <CartWrapper
                    cartItems={items}
                    setOpenCartModal={setOpenCartModal}
                />
            </Sheet>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="bg-black cursor-pointer" >
                        <AvatarFallback className="bg-black text-white font-extrabold">
                            {userName[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-56">
                    <DropdownMenuLabel>Logged In as {userName} </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/shopping/account")} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer"
                        onClick={() => dispatch(userLogout())}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default function ShoppingHeader() {
    const { isAuthenticated, userInfo, loading } = useSelector(state => state.auth)
    const { userName } = userInfo

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/shopping/home" className="flex items-center gap-2">
                    <House className="h-6 w-6" />
                    <span className="font-bold">E-Commerce</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">
                                Toggle header menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs">
                        <MenuItems />
                        <HeaderRightContent userName={userName} />
                    </SheetContent>
                    <div className="hidden lg:block">
                        <MenuItems />

                    </div>
                    {
                        isAuthenticated && <div className="hidden lg:block">
                            <HeaderRightContent userName={userName} />
                        </div>
                    }
                </Sheet>
            </div>
        </header>
    )
}