// Import necessary modules and components
import { auth } from "@clerk/nextjs/server"; // Import the auth function from Clerk for user authentication
import { Header } from "../(marketing)/header"; // Import the Header component from the marketing folder
import { isMentor } from "@/lib/mentor"; // Import the isMentor function from the lib/mentor module
import { redirect } from "next/navigation"; // Import the redirect function from Next.js for navigation

// Define the Props interface for the TeacherLayout component
type Props = {
  children: React.ReactNode; // Children components to be rendered inside the layout
};

// Define the TeacherLayout component
const TeacherLayout = ({ children }: Props) => {
  const { userId } = auth(); // Get the userId from the auth function

  // If the user is not a mentor, redirect to the homepage
  if (!isMentor(userId)) {
    return redirect("/");
  }

  // Return the layout with the Header component and children components
  return (
    <div className="m-h-screen flex flex-col overflow-x-hidden">
      <Header /> {/* Render the Header component */}
      <main className="flex flex-col flex-1 flex-grow items-center justify-center">
        {children} {/* Render the children components */}
      </main>
    </div>
  );
};

export default TeacherLayout; // Export the TeacherLayout component as default

// Explanation:
// Imports:

// auth: Function from Clerk for user authentication.
// Header: Component for the header section.
// isMentor: Function from lib/mentor to check if a user is a mentor.
// redirect: Function from Next.js for navigation.
// Props Interface:

// Defines the Props interface with a children property that expects React nodes.
// Component Definition:

// The TeacherLayout component takes children as a prop and renders the children inside a layout.
// It uses the auth function to get the userId.
// If the user is not a mentor (isMentor(userId) returns false), it redirects to the homepage.
// Otherwise, it renders the layout with the Header component and the children components passed to it.
// Return Statement:

// Returns a <div> element with a flex layout and vertical scrolling.
// Renders the Header component at the top.
// Renders the children components in the main section, centered vertically and horizontally.
// Export:

// Exports the TeacherLayout component as the default export.
