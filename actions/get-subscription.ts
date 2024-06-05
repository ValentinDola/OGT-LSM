import { db } from "@/lib/db";
import axios from "axios";

interface getSubscriptionProps {
  userId: string | undefined;
  secret_key: string | undefined;
}

export const getSubscription = async ({
  userId,
  secret_key,
}: getSubscriptionProps) => {
  if (!userId || !secret_key) {
    throw new Error("Invalid user ID or secret key");
  }

  try {
    const subscriptionId = await db.subscription.findFirst({
      where: { userId: userId },
      select: {
        subscriptionId: true,
      },
    });

    if (!subscriptionId || !subscriptionId.subscriptionId) {
      throw new Error("Subscription not found");
    }

    const id = subscriptionId?.subscriptionId;

    const url = `https://api.paystack.co/subscription/${id}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secret_key}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
