//This declares a function named isMentor that takes an optional parameter userId which can be a string or null.
export const isMentor = (userId?: string | null) => {
  //This line returns the result of a comparison between the userId parameter and the value of NEXT_PUBLIC_MENTOR_ID from the environment variables.
  //The function returns true if the userId matches the mentor ID, otherwise it returns false.
  return userId === process.env.NEXT_PUBLIC_MENTOR_ID;
};

// Summary:
// The isMentor function checks if a given userId matches a predefined mentor ID stored in the environment variables.
// It returns true if the userId is the mentor ID, and false otherwise.
