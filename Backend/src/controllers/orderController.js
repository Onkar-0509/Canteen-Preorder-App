import { Order } from "../models/orderModel.js";
import {User}from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req, res) => {

    const frontend_URL="http://localhost:5173"
    
    try {
        const newOrder = new Order({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

        console.log("Received order items:", req.body.items);

        const line_items = req.body.items
        .filter(item => item.quantity && item.quantity > 0) // Ensure valid quantity
        .map((item) => ({
            price_data: {
                currency: "inr",
                product_data: { name: item.name },
                unit_amount: Math.round(item.price * 100*87) // Convert price to paise
            },
            quantity: Math.floor(item.quantity) // Ensure integer quantity
        }));
    

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: 2 * 100*87
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
            line_items: line_items,
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
export {placeOrder }