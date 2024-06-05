import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const onCreatePlan = async (
  title: string | undefined,
  interval: string | undefined,
  amount: number | undefined
) => {
  try {
    const secretKey = "sk_test_066bbd51a3fcfe51b2d6111fc507571527683309";
    const url = "https://api.paystack.co/plan";

    const data = {
      name: title,
      interval: interval,
      amount: amount,
    };

    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    });

    return { data: response.data };
  } catch (error) {
    console.error("ERROR_CREATING_PLAN", error);
    toast.error("ERROR_CREATING_PLAN");
  }
};

const onCreateSubscription = async (
  customer_id: string | undefined,
  plan_code: string | undefined
) => {
  try {
    const url = "https://api.paystack.co/subscription";
    const secretKey = "sk_test_066bbd51a3fcfe51b2d6111fc507571527683309"; // Replace with your actual secret key
    const data = {
      customer: customer_id, // Replace with actual customer ID
      plan: plan_code, // Replace with actual plan ID
    };

    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    });

    return { data: response.data };
  } catch (error) {
    console.error("ERROR_CREATING_SUBSCRIPTION", error);
    toast.error("ERROR_CREATING_SUBSCRIPTION");
  }
};

export const onPaymentSuccess = async (
  title: string | undefined,
  interval: string | undefined,
  amount: number | undefined
) => {
  try {
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress; // Replace with the actual email or code
    const url = `https://api.paystack.co/customer/${email}`;
    const secretKey = "sk_test_066bbd51a3fcfe51b2d6111fc507571527683309"; // Replace with your actual secret key
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const plan = await onCreatePlan(title, interval, amount);

    const plan_code = plan?.data.data.plan_code;
    const customerId = response.data.data.customer_code;

    const subscription = await onCreateSubscription(customerId, plan_code);

    console.log(response.data.data);
    console.log(subscription?.data);

    const active = subscription?.data.data.status === "active";

    if (active) {
      await axios.post(`/api/paystack`, {
        customerId,
        user,
      });
    } else {
      toast.error("Échec de l'abonnement");
      return redirect("/");
    }

    toast.success("Paiement réussi");
    return redirect("/dashboard");
  } catch (error) {
    console.error("Error:", error);
    toast.error("Quelque chose s'est mal passé");
  }
};

export const onPaymentCancel = () => {
  return toast.error("Vous annulez le paiement"), redirect("/");
};
