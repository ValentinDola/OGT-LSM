// Import necessary modules and components
"use client"; // Use Prisma Client
import { Button } from "@/components/ui/button"; // Import Button component
import { CfaFormat, formatPrice } from "@/lib/format"; // Import formatting functions for CFA currency
import { createInvoice } from "@/lib/paydunya"; // Import function for creating invoices
import { useUser } from "@clerk/nextjs"; // Import useUser hook from Clerk for user authentication
import axios from "axios"; // Import axios for making HTTP requests
import { useState } from "react"; // Import useState hook for managing state
import toast from "react-hot-toast"; // Import toast for displaying notifications

// Define the CourseEnrollButtonProps interface for the CourseEnrollButton component
interface CourseEnrollButtonProps {
  courseId: string;
  price: number | null;
}

// Define the CourseEnrollButton component
export const CourseEnrollButton = ({
  courseId,
  price,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading state to false
  const { user } = useUser(); // Get the authenticated user from Clerk
  const userId = user?.id; // Extract the user ID from the authenticated user

  const cfaPrice = price! * 605; // Calculate the price in CFA currency

  // onClick handler for the button
  const onClick = async () => {
    try {
      setIsLoading(true); // Set isLoading to true to show loading state

      // Make a POST request to the checkout API endpoint
      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      // Redirect the user to the checkout URL returned by the API
      window.location.assign(response.data.url);
    } catch (error) {
      // Display an error toast if something goes wrong
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false); // Set isLoading back to false after the request is completed
    }
  };

  // Return the Button component with onClick handler and disabled state based on isLoading
  return (
    <Button onClick={onClick} disabled={isLoading} className={"mt-2 md:w-auto"}>
      Acheter pour {CfaFormat(Number(price))}
    </Button>
  );
};

// Explanation:
// "use client";: Indicates that this file uses Prisma Client.

// Imports:

// Button: Component for the enrollment button.
// CfaFormat and formatPrice: Functions for formatting prices in CFA currency.
// createInvoice: Function for creating invoices (not used in the provided code).
// useUser: Hook for getting the authenticated user from Clerk.
// axios: Library for making HTTP requests.
// useState: Hook for managing state.
// toast: Library for displaying notifications.
// CourseEnrollButtonProps Interface:

// Describes the props expected by the CourseEnrollButton component.
// Component Definition:

// The CourseEnrollButton component accepts courseId and price props.
// It initializes the isLoading state to manage the loading state of the button.
// It gets the authenticated user from Clerk and extracts the user ID.
// It calculates the price in CFA currency.
// onClick Handler:

// The onClick handler is called when the button is clicked.
// It sets isLoading to true to show the loading state.
// It makes a POST request to the checkout API endpoint to initiate the checkout process.
// If successful, it redirects the user to the checkout URL returned by the API.
// If there's an error, it displays an error toast.
// Button Rendering:

// The Button component is rendered with an onClick handler and a disabled state based on isLoading.
// The button text includes the price formatted in CFA currency using CfaFormat.
