
import { ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { AlarmSmoke, LayoutDashboard, ShipWheel, ShoppingBasket } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
export const adminSidebarMenus = [
    {
        id: 1, label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard />
    },
    {
        id: 2, label: "Orders", path: "/admin/orders", icon: <AlarmSmoke />
    },
    {
        id: 3, label: "Products", path: "/admin/products", icon: <ShoppingBasket />
    },
    {
        id: 4, label: "Features", path: "/admin/features", icon: <ShipWheel />
    },
]

export default function AdminSidebar({ open, setOpen }) {

    const navigate = useNavigate()

    const MenuItems = () => {
        return (
            <nav className="mt-8 flex-col flex gap-2">
                {adminSidebarMenus.map(menuItem =>
                    <div className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer
                    text-muted-foreground hover:bg-muted hover:text-foreground
                    " key={menuItem.id}
                        onClick={() => navigate(`${menuItem.path}`)}
                    >
                        {menuItem.icon}
                        <span>{menuItem.label}</span>
                    </div>
                )}
            </nav>
        )
    }

    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64" >
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b">
                            <SheetTitle className="flex justify-start gap-2 items-center">
                                <ChartNoAxesCombined size={30} />
                                <h1>Admin Panel</h1>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems />
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div className="flex cursor-pointer gap-2" onClick={() => navigate("/admin/dashboard")}>
                    <ChartNoAxesCombined size={30} />
                    <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    )
}