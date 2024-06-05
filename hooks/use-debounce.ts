// Import `useEffect` and `useState` hooks from React.
import { useEffect, useState } from "react";

// Define and export a custom hook named `useDebounce` which accepts a value of generic type `T` and an optional delay in milliseconds.
export function useDebounce<T>(value: T, delay?: number): T {
  // Declare a state variable `deboucedValue` with its setter `setDebounceValue` initialized to the input `value`.
  const [deboucedValue, setDebounceValue] = useState<T>(value);

  // Use the `useEffect` hook to perform side effects in function components.
  useEffect(() => {
    // Set a timer to update `deboucedValue` after the specified `delay`.
    const timer = setTimeout(() => {
      // Update the state variable `deboucedValue` to the current `value` after the `delay` has passed.
      setDebounceValue(value);
    }, delay || 1000); // Use the specified `delay`, or default to 1000 milliseconds (1 second) if no delay is provided.

    // Return a cleanup function to clear the timer when the component unmounts or before the next effect is run.
    return () => {
      // Clear the timeout to avoid updating `deboucedValue` if the value or delay changes before the timer completes.
      clearTimeout(timer);
    };
  }, [value, delay]); // Dependencies array: the effect runs whenever `value` or `delay` changes.

  // Return the debounced value.
  return deboucedValue;
}

// Explanation:
// Import Statements:

// import { useEffect, useState } from "react";: Imports the useEffect and useState hooks from React. These hooks are used to manage state and side effects in functional components.
// Function Definition:

// export function useDebounce<T>(value: T, delay?: number): T { ... }: Defines a generic custom hook named useDebounce. It takes a value of generic type T and an optional delay in milliseconds. The function returns the debounced value of type T.
// State Declaration:

// const [deboucedValue, setDebounceValue] = useState<T>(value);: Declares a state variable deboucedValue with its setter setDebounceValue, initialized to the input value. The type of deboucedValue is inferred from the generic type T.
// Effect Hook:

// useEffect(() => { ... }, [value, delay]);: The useEffect hook runs side effects in the function component. The effect runs whenever value or delay changes.
// Timer Setup:

// const timer = setTimeout(() => { setDebounceValue(value); }, delay || 1000);: Sets up a timer using setTimeout to update deboucedValue to the current value after the specified delay. If no delay is provided, it defaults to 1000 milliseconds (1 second).
// Cleanup Function:

// return () => { clearTimeout(timer); };: Returns a cleanup function that clears the timeout using clearTimeout. This prevents updating deboucedValue if value or delay changes before the timer completes.
// Return Statement:

// return deboucedValue;: Returns the debounced value to be used in the component.
