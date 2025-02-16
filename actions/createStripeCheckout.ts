"use server"

import baseUrl from "@/lib/baseUrl"
import { stripe } from "@/lib/stripe"

type Props = {
    userId: string
    email: string
    priceId: string
}

export const subscribe = async ({ userId, email, priceId }: Props) => {
    if (!userId || !email || !priceId) {
        throw new Error("Missing required params")
    }

    try {
        const existingCustomer = await stripe.customers.list({ email, limit: 1 })
        let stripeCustomerId = existingCustomer.data.length > 0 ? existingCustomer.data[0].id : null

        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email,
            })
            stripeCustomerId = customer.id
        }

        const { url } = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            payment_method_types: ["card"],
            line_items: [
                {
                  price: priceId,
                  quantity: 1,
                },
            ],
            metadata: {
                userId,
            },
            mode: "subscription",
            allow_promotion_codes: true,
            customer_update: {
                name: "auto",
            },
            success_url: `${baseUrl}/payment/success`,
            cancel_url: `${baseUrl}/payment/cancel`,
        })

        return url

    } catch (error) {
        console.error(error)
    }
}