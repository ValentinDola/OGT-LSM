// Import the Progress component from the UI library
import { Progress } from "@/components/ui/progress";

// Import a utility function for conditional class names from the utils library
import { cn } from "@/lib/utils";

// Define the props interface for the CourseProgress component
interface CourseProgressProps {
  value: number | undefined; // The progress value (percentage)
  variant?: "default" | "success"; // Optional variant for styling
}

// Define a mapping object to set text color based on the variant
const colorByVariant = {
  default: "text-white", // Default variant has white text color
  success: "text-[#117243]", // Success variant has green text color
};

// Define the CourseProgress functional component
export const CourseProgress = ({ variant, value }: CourseProgressProps) => {
  return (
    <div>
      {/* Container div with flexbox for layout and responsive styles */}
      <div className="flex items-center w-[400px] justify-around gap-x-2 max-[450px]:hidden max-[800px]:w-[200px]">
        {/* Render the Progress component with specified width, height, value, and variant */}
        <Progress className="w-[350px] h-1" value={value} variant={variant} />
        {/* Display the progress percentage with conditional class names */}
        <span
          className={cn(
            "text-base text-white", // Base text styles
            colorByVariant[variant || "default"] // Text color based on the variant
          )}
        >
          {/* Round the progress value to the nearest integer and display it */}
          {Math.round(Number(value))}%
        </span>
      </div>
    </div>
  );
};

// Explanation:
// import { Progress } from "@/components/ui/progress";: Import the Progress component from the UI library.
// import { cn } from "@/lib/utils";: Import the cn utility function for conditional class names from the utils library.
// interface CourseProgressProps { ... }: Define the CourseProgressProps interface for the component's props.
// value: number;: The value prop is a number representing the progress percentage.
// variant?: "default" | "success";: The optional variant prop can be either "default" or "success" to apply different styles.
// const colorByVariant = { ... };: Define an object mapping the variant prop to specific text colors.
// default: "text-white";: The default variant sets the text color to white.
// success: "text-[#117243]";: The success variant sets the text color to green.
// export const CourseProgress = ({ variant, value }: CourseProgressProps) => { ... };: Define the CourseProgress functional component.
// <div>: Return a containing div element.
// <div className="flex items-center w-[400px] justify-around gap-x-2 max-[450px]:hidden max-[800px]:w-[200px]">:
// className="flex items-center w-[400px] justify-around gap-x-2 max-[450px]:hidden max-[800px]:w-[200px]": Apply flexbox for layout, set width, and handle responsive styles. On screens smaller than 450px, the element is hidden, and on screens smaller than 800px, the width is reduced.
// <Progress className="w-[350px] h-1" value={value} variant={variant} />: Render the Progress component with the specified width, height, value, and variant.
// <span className={cn("text-base text-white", colorByVariant[variant || "default"])}> ... </span>:
// className={cn("text-base text-white", colorByVariant[variant || "default"])}: Use the cn function to conditionally apply class names for base text styles and text color based on the variant.
// {Math.round(value)}%: Display the rounded progress value as a percentage inside the span element.
// </div>: Close the inner div element.
// </div>: Close the outer div element.
