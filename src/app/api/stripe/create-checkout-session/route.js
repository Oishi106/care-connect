import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";

const servicePrices = {
  "Elderly Care": 15,
  "Baby Sitting": 12,
  "Patient Care": 18,
  "Special Needs": 20,
  "Child Care": 11,
  "Night Care": 20,
  "Therapy Support": 22,
  "Respite Care": 16,
  "Dementia Care": 20,
  "Post-Op Care": 19,
  "Newborn Care": 15,
  "Disability Care": 17,
  "Palliative Care": 22,
  "Live-In Care": 120,
  "Nutrition Care": 13,
  "Autism Support": 18,
  "Companion Care": 10,
  "Stroke Recovery": 21,
  "School Support": 12,
  "Mental Wellness": 16,
};

function resolveUnitAmount(serviceName, priceLabel, hours = 1) {
  const parsedServicePrice = servicePrices[serviceName];

  if (parsedServicePrice) {
    return parsedServicePrice * 100 * Math.max(Number(hours) || 1, 1);
  }

  const match = String(priceLabel || "").match(/(\d+(?:\.\d+)?)/);

  if (!match) {
    return 1000;
  }

  return Math.round(Number(match[1]) * 100 * Math.max(Number(hours) || 1, 1));
}

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY first." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const serviceName = body.serviceName;
    const priceLabel = body.priceLabel;
    const hours = body.hours || 1;
    const successPath = body.successPath || "/payment/success";
    const cancelPath = body.cancelPath || "/payment/cancel";
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    if (!serviceName) {
      return NextResponse.json({ error: "Service name is required." }, { status: 400 });
    }

    const unitAmount = resolveUnitAmount(serviceName, priceLabel, hours);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${baseUrl}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}${cancelPath}`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: unitAmount,
            product_data: {
              name: serviceName,
              description: `${hours} hour${Number(hours) > 1 ? "s" : ""} booking for ${serviceName}`,
            },
          },
        },
      ],
      metadata: {
        serviceName,
        priceLabel: priceLabel || "",
        hours: String(hours),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to start payment right now." },
      { status: 500 }
    );
  }
}