import { user } from "../models/user.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);


export const buyPremium = async (req, res) => {
    try {
        const userId = req.body.userId;
        const pkg = Number(req.body.pkg);
        let amount = 0;
        if (pkg === 30) amount = 2.29;
        else if (pkg === 180) amount = 10.99;
        else if (pkg === 365) amount = 22.99;
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
        res.json({ success: true, message: "Premium bought successfully", url: session.url });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
export const strpiWeebHook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
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
        const mailOption = {
            sender: { email: process.env.EMAIL },
            to: [{ email: currentUser.email }],
            subject: "Your Premium is Activated – Welcome to FMBLS!",
            htmlContent: `
            <div style="font-family: Arial, sans-serif; background-color: #e8f5e9; padding: 20px;">
            <div style="background: #ffffff; padding: 25px; border-radius: 10px; max-width: 650px; margin: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

                <div style="text-align: center;">
                <h1 style="color: #2e7d32;">Premium Activated 🎉</h1>
                <p style="font-size: 16px; color: #4e6e52;">Thank you for supporting FMBLS!</p>
                </div>

                <div style="background-color: #f1f8f5; padding: 20px; border-radius: 8px; margin-top: 20px; border: 1px solid #c8e6c9;">
                <p style="font-size: 18px; color: #2e7d32; font-weight: 600;">Your premium subscription is now active.</p>

                <table style="width: 100%; margin-top: 10px; color: #2e2e2e;">
                    <tr>
                    <td style="padding: 8px; font-weight: bold; color: #1b5e20;">User:</td>
                    <td style="padding: 8px;">${currentUser.name}</td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; font-weight: bold; color: #1b5e20;">Email:</td>
                    <td style="padding: 8px;">${currentUser.email}</td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; font-weight: bold; color: #1b5e20;">Package:</td>
                    <td style="padding: 8px;">${pkg} days</td>
                    </tr>
                </table>

                <p style="font-size: 16px; margin-top: 20px; color: #4e6e52;">
                    Enjoy unlimited daily lessons, streak boosts, advanced Bible learning tools, and more exclusive features.
                </p>

                <div style="text-align: center; margin-top: 25px;">
                    <a href="https://fm-bls.astu.edu/"
                    style="background-color: #66bb6a; color: #fff; padding: 12px 25px; text-decoration: none; font-size: 16px; border-radius: 6px; font-weight: bold;">
                    Go to Dashboard
                    </a>
                </div>
                </div>

                <p style="text-align: center; color: #6d8f72; margin-top: 30px;">
                Need help? <a href="mailto:support@fm-bls.astu.edu" style="color: #2e7d32;">Contact us</a>.
                </p>

                <p style="text-align: center; font-size: 13px; color: #8aa892; margin-top: 5px;">
                &copy; ${new Date().getFullYear()} FMBLS — All Rights Reserved
                </p>

            </div>
            </div>
            `
        };

        await transporter.sendTransacEmail(mailOption);

        res.json({ success: true, message: "Premium bought successfully" });
    }
    else if (event.type === 'checkout.session.expired') {
        const session = event.data.object;
        const userId = session.metadata.userId;
        const pkg = session.metadata.package;
        const currentUser = await user.findById(userId);
        if (!currentUser) {
            return res.json({ success: false, message: "User not found" });
        }
        currentUser.premium = false;
        currentUser.premiumExpireAt = 0;
        await currentUser.save();
        res.json({ success: true, message: "Premium expired successfully" });
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