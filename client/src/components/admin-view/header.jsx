import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { userLogout } from "@/store/auth-slice";

export default function AdminHeader({ open, setOpen }) {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(userLogout())
    }
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-background border-bottom">
            <Button className="lg:hidden sm:visible" onClick={() => setOpen(true)}>
                <AlignJustify />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="flex flex-1 justify-end">
                <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow" onClick={handleLogout}>
                    <LogOut />
                    Logout
                </Button>
            </div>
        </header>
    )
}