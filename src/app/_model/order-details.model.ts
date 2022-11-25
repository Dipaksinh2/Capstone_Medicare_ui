import { OrderQty } from "./order-qty.model"

export interface OrderDetails {
    userFullName: string;
    userFullAddress: string;
    userContactNumber: string;
    userAlternateContactNumber: string;
    orderProductQties: OrderQty[];
}