// Import the database instance from a custom database utility module.
import { db } from "@/lib/db";

// Import the Course and Purchase models from Prisma Client to use their types.
import { Course, Purchase } from "@prisma/client";

// Define a type alias for a Purchase object that includes the related Course object.
type PurchaseWithCourse = Purchase & {
  course: Course;
};

// Define a function to group purchases by course title and calculate the total earnings for each course.
const groupeByCourse = (purchases: PurchaseWithCourse[]) => {
  // Initialize an empty object to store the grouped earnings.
  const grouped: { [courseTitle: string]: number } = {};

  // Iterate over each purchase in the purchases array.
  purchases.forEach((purchase) => {
    // Get the course title from the purchase.
    const courseTitle = purchase.course.title;

    // If the course title is not already a key in the grouped object, initialize it with 0.
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }

    // Add the price of the course to the total earnings for that course title.
    grouped[courseTitle] += purchase.course.price!;
  });

  // Return the grouped earnings object.
  return grouped;
};

// Define an asynchronous function to get analytics data for a specific user.
export const getAnalytics = async (userId: string) => {
  try {
    // Query the database to find all purchases where the related course belongs to the specified user.
    const purchase = await db.purchase.findMany({
      where: {
        course: {
          userId: userId,
        },
      },
      // Include the related course information in the query result.
      include: {
        course: true,
      },
    });

    // Group the purchases by course title and calculate the total earnings for each course.
    const groupedEarnings = groupeByCourse(purchase);

    // Convert the grouped earnings object into an array of objects, each containing the course title and total earnings.
    const data = Object.entries(groupedEarnings).map(
      ([courseTitle, price]) => ({
        name: courseTitle,
        total: price,
      })
    );

    // Calculate the total revenue by summing up the total earnings for all courses.
    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    // Calculate the total number of sales.
    const totalSales = purchase.length;

    // Return the analytics data, including the data array, total revenue, and total sales.
    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    // Log any errors that occur during the database query or data processing.
    console.log("[GET_ANALYTICS]", error);
    // Return an empty data array and zero values for total revenue and total sales in case of an error.
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};

// Explanation:
// Imports:

// db: The database instance to perform queries using Prisma.
// Course, Purchase: Types from Prisma Client representing the respective database models.
// Type Alias:

// PurchaseWithCourse: Combines Purchase with the related Course to include course details in purchase objects.
// groupeByCourse Function:

// Groups purchases by course title.
// Calculates total earnings for each course by summing the prices of the purchased courses.
// getAnalytics Function:

// Fetches purchases for a specific user from the database.
// Groups the fetched purchases by course title and calculates total earnings.
// Converts the grouped data into an array format for easy handling.
// Calculates total revenue and total sales.
// Returns the analytics data or an error object if any error occurs.
