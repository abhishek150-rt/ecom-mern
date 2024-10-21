
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getOrderDetail } from "@/store/shop/order-slice";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminOrderView from "./order-view";
import { getAllOrders } from "@/store/admin/order-slice";

const OrdersView = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { orderList } = useSelector(state => state.adminOrder);
    const { orderDetails } = useSelector(state => state.order)
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

    const handleFetchOrderDetails = (orderId) => {
        dispatch(getOrderDetail(orderId)).then(res => {
            if (res?.payload?.status === 200) {
                setOpenDetailsDialog(true)
            }
        })
    }

    useEffect(() => {
        if (userInfo && userInfo.id) {
            dispatch(getAllOrders())
        }
    }, [userInfo])


    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order Id</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>

                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orderList && orderList.length > 0 && orderList.map(order =>
                                <TableRow>
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell>{order.orderDate}</TableCell>
                                    <TableCell>
                                        <Badge className={`${order.orderStatus === "confirmed" ? 'bg-blue-500' : order.orderStatus === "rejected" ? 'bg-red-500' : order.orderStatus === "delievered" ? "bg-green-500" : "bg-gray-800"}`}>
                                            {order.orderStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{order.totalAmount}&nbsp;₹</TableCell>
                                    <TableCell>
                                        <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                                            <Button onClick={() => handleFetchOrderDetails(order._id)}>View Details</Button>
                                            {
                                                orderDetails &&
                                                <AdminOrderView
                                                    orderDetails={orderDetails}
                                                />
                                            }
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default OrdersView;

