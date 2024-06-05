// // import paydunya from "paydunya";

// // const setup = new paydunya.Setup({
// //   masterKey: process.env.PAYDUNYA_MASTER_KEY,
// //   privateKey: process.env.PAYDUNYA_PRIVATE_KEY,
// //   publicKey: process.env.PAYDUNYA_PUBLIC_KEY,
// //   token: process.env.PAYDUNYA_TOKEN,
// //   mode: "test", // Optional. Use this option for test payments.
// // });

// // const store = new paydunya.Store({
// //   name: "OGT Academy",
// // });

// import { User, currentUser } from "@clerk/nextjs/server";
// import axios from "axios";
// import { NextResponse } from "next/server";
// import { db } from "./db";
// import { UserResource } from "@clerk/types";

// const instance = axios.create({
//   baseURL: "https://app.paydunya.com/sandbox-api/v1/checkout-invoice/create",
//   headers: {
//     "Content-Type": "application/json",
//     "PAYDUNYA-MASTER-KEY": process.env.PAYDUNYA_MASTER_KEY,
//     "PAYDUNYA-PRIVATE-KEY": process.env.PAYDUNYA_PRIVATE_KEY,
//     "PAYDUNYA-TOKEN": process.env.PAYDUNYA_TOKEN,
//   },
// });

// export const createInvoice = async (
//   amount: number | null,
//   courseId: string,
//   user: UserResource | null | undefined
// ) => {
//   try {
//     // const user = await currentUser();

//     // if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
//     //   return new NextResponse("Unauthorized", { status: 401 });
//     // }

//     // const course = await db.course.findUnique({
//     //   where: {
//     //     id: courseId,
//     //     isPublished: true,
//     //     isFree: false,
//     //   },
//     // });

//     // const purchase = await db.purchase.findUnique({
//     //   where: {
//     //     userId_courseId: {
//     //       userId: user.id,
//     //       courseId: courseId,
//     //     },
//     //   },
//     // });

//     // if (purchase) {
//     //   return new NextResponse("Already purchased", { status: 400 });
//     // }

//     //if (!course) {
//     //  return new NextResponse("Course Not found", { status: 404 });
//     //}

//     const response = await axios.post(
//       "https://app.paydunya.com/sandbox-api/v1/checkout-invoice/create",
//       {
//         invoice: {
//           total_amount: amount,
//           description: `Order for course #${courseId}`,
//         },
//         store: {
//           name: "OGT Academy",
//           tagline:
//             "OGT Academy est votre guide sûr vers la liberté financière. Nous sommes une communauté solidaire dédiée à vous enseigner l'art de trader le Forex de manière rentable.",
//         },
//         actions: {
//           cancel_url: `http://localhost:3000`,
//           return_url: `http://localhost:3000`,
//           callback_url: `http://localhost:3000/api/paydunya-callback`,
//         },
//         custom_data: {
//           courseId: courseId,
//           userId: user?.id,
//         },
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "PAYDUNYA-MASTER-KEY": "vhgjBSC2-FUvQ-tFc9-JdpZ-FeifUyZnmbpo",
//           "PAYDUNYA-PRIVATE-KEY": "test_private_tWrPULCM9GEVHu5uBmoDwB95Cw8",
//           "PAYDUNYA-TOKEN": "TMzTqGSmL0nFooiUHxRG",
//         },
//       }
//     );

//     return response;
//   } catch (error) {
//     console.error("Error creating invoice:");
//   }
// };

import axios from "axios";

const PAYDUNYA_BASE_URL = "https://app.paydunya.com/sandbox-api/v1";

const PAYDUNYA_HEADERS = {
  "Content-Type": "application/json",
  "PAYDUNYA-MASTER-KEY": "vhgjBSC2-FUvQ-tFc9-JdpZ-FeifUyZnmbpo",
  "PAYDUNYA-PRIVATE-KEY": "test_private_tWrPULCM9GEVHu5uBmoDwB95Cw8",
  "PAYDUNYA-TOKEN": "TMzTqGSmL0nFooiUHxRG",
};

export const createInvoice = async (amount: number) => {
  const response = await axios.post(
    `${PAYDUNYA_BASE_URL}/direct-pay/credit-account`,
    {
      invoice: {
        total_amount: amount,
        description: `Order of ${amount}`,
      },
      store: {
        name: "OGT Academy",
        tagline: "la liberté financière.",
      },
      actions: {
        cancel_url: `http://localhost:3000`,
        return_url: `http://localhost:3000`,
        callback_url: `http://localhost:3000/api/paydunya-callback`,
      },
    },
    { headers: PAYDUNYA_HEADERS }
  );

  return response.data;
};

export const checkPaymentStatus = async (invoiceToken: string) => {
  const response = await axios.get(
    `${PAYDUNYA_BASE_URL}/checkout-invoice/confirm/${invoiceToken}`,
    { headers: PAYDUNYA_HEADERS }
  );

  return response.data;
};
