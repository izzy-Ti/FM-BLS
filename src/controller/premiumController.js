import { user } from "../models/user";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);


export const buyPremium = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { amount, pkg } = req.body;
        const currentUser = await user.findById(userId);
        if (!currentUser) {
            return res.json({ success: false, message: "User not found" });
        }
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${userId}`
                        },
                        unit_amount: amount * 100
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/complete`,
            cancel_url: `${process.env.BASE_URL}/cancel`,
            metadata: { userId: userId.toString(), package: pkg },
        })
        res.json({ success: true, message: "Premium bought successfully", session });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
export const strpieWeebHook = async (req, res) => {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata.userId;
        const pkg = session.metadata.package;
        const currentUser = await user.findById(userId);
        if (!currentUser) {
            return res.json({ success: false, message: "User not found" });
        }
        currentUser.premium = true;
        currentUser.premiumExpireAt = Date.now() + pkg * 24 * 60 * 60 * 1000;
        await currentUser.save();
        res.json({ success: true, message: "Premium bought successfully" });
    }
}
export const getPremium = async (req, res) => {
    try {
        const userId = req.body.userId;
        const currentUser = await user.findById(userId);
        if (!currentUser) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, premium: currentUser.premium });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};