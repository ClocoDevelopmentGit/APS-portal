import Stripe from "stripe";

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

    const { amount } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to cents
      currency: "aud",
      automatic_payment_methods: { enabled: true },
    });

    return Response.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
