'use client'
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import useBasketStore from "@/store/store"

function SuccessPage() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get("orderNumber");
    console.log(orderNumber);
    const clearBasket = useBasketStore((state) => state.clearBasket);

    useEffect(() => {
        if (orderNumber) {
            clearBasket();
        };
    }, [orderNumber,clearBasket])

    return (
        
    )
};

export default SuccessPage