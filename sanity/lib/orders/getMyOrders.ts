import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getMyOrders = async (userId: string) => {

    if (!userId) {
        throw new Error("User Id is required!")
    }
    const MY_ORDERS_QUERY = defineQuery(`
        *[_type == 'order'
        && clerkuSERid == $userId
        ] | order(orderDate desc)
        ...,
        products[]{
            ...,
            product->
        }
        `);
    
    try {
        const orders = await sanityFetch({
            query: MY_ORDERS_QUERY,
            params: { userId },
        });
        return orders.data || [];
    } catch (error) {
        console.log("Error fetching order", error);
        throw new Error("Errro fetching orders")
    }
}