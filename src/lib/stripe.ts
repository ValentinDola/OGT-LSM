//This line imports the Stripe library, which provides functionalities for interacting with the Stripe API.
import Stripe from "stripe";

//This line creates a new instance of the Stripe class using the new keyword.
//The process.env.STRIPE_API_KEY! retrieves the Stripe API key from the environment variables. The ! asserts that the value is not null or undefined.
//The second argument is an object with configuration options for the Stripe instance:
//apiVersion: "2024-04-10" specifies the API version to use. This version is specific to the Stripe API and may include new features or changes.
//typescript: true enables TypeScript support, which provides better type checking and IntelliSense when using the Stripe SDK in a TypeScript project.
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
});

// Overall, this code initializes the Stripe SDK with the specified API version and TypeScript support, allowing you to interact with the Stripe API using the stripe instance.
