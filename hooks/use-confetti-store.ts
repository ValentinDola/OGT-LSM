// Import the `create` function from the "zustand" library, which is used to create a store.
import { create } from "zustand";

// Define a TypeScript type `ConfettiStore` to specify the shape of the store's state and actions.
type ConfettiStore = {
  isOpen: boolean; // A boolean to track if the confetti is open or not.
  onOpen: () => void; // A function to open the confetti.
  onClose: () => void; // A function to close the confetti.
};

// Create and export a Zustand store named `useConfettiStore` with the type `ConfettiStore`.
export const useConfettiStore = create<ConfettiStore>((set) => ({
  isOpen: false, // Initialize the `isOpen` state to `false`.

  // Define the `onOpen` function which sets the `isOpen` state to `true`.
  onOpen: () => set({ isOpen: true }),

  // Define the `onClose` function which sets the `isOpen` state to `false`.
  onClose: () => set({ isOpen: false }),
}));

// Explanation:
// Import Statement:

// import { create } from "zustand";: Imports the create function from the "zustand" library. Zustand is a small, fast, and scalable state management solution.
// Type Definition:

// type ConfettiStore = { ... }: Defines a TypeScript type ConfettiStore that describes the shape of the store. It includes:
// isOpen: A boolean indicating whether the confetti is open.
// onOpen: A function to set isOpen to true.
// onClose: A function to set isOpen to false.
// Store Creation:

// export const useConfettiStore = create<ConfettiStore>((set) => ({ ... })): Uses the create function from Zustand to create a store named useConfettiStore. The store has the type ConfettiStore.
// Initial State:

// isOpen: false,: Initializes the isOpen state to false, meaning the confetti is initially closed.
// Action: onOpen:

// onOpen: () => set({ isOpen: true }),: Defines the onOpen function which, when called, updates the state by setting isOpen to true.
// Action: onClose:

// onClose: () => set({ isOpen: false }),: Defines the onClose function which, when called, updates the state by setting isOpen to false.
