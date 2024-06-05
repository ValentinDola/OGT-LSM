import { auth } from "@clerk/nextjs/server";
import {
  getCourse,
  getFreeCourse,
  getSubsCourse,
  getSubscribedCourse,
} from "../../../../../actions/get-courses";
import { redirect } from "next/navigation";
import { Introduction } from "./_components/intoduction";
import { FreeCourses } from "./_components/free-courses";
import { MentorshipCourses } from "./_components/mentorship-courses";

import { db } from "@/lib/db";
import { SubscriptionCourses } from "./_components/subscription-courses";
import axios from "axios";
import { getSubscription } from "../../../../../actions/get-subscription";

export default async function Dashboard() {
  const { userId } = auth();
  const secret_key = "sk_test_066bbd51a3fcfe51b2d6111fc507571527683309";
  if (!userId) {
    return redirect("/");
  }

  const courses: any = await getCourse({
    userId,
  });

  const freeCourses: any = await getFreeCourse({
    userId,
  });

  const subsCourses: any = await getSubsCourse({
    userId,
  });

  const subscribedCourses: any = await getSubscribedCourse({
    userId,
  });

  const hasSubscribed = await db.subscription.findFirst({
    where: {
      userId: userId,
    },
    select: {
      status: true,
      subscriptionId: true,
    },
  });

  const subscribed = hasSubscribed?.status === "completed";

  // if (!hasSubscribed) {
  //   console.log("SubsId ID is null");
  // }

  // const id = hasSubscribed?.subscriptionId;

  // if (!id) {
  //   console.log("SubscriptionId is null");
  // }

  // console.log(id);

  // const data = await getSubscription({
  //   userId,
  //   secret_key,
  // });

  // console.log(data);

  // const url = `https://api.paystack.co/subscription/${id}`;

  // const response = await axios.get(url, {
  //   headers: {
  //     Authorization: `Bearer ${secret_key}`,
  //   },
  // });

  // console.log(response.data);

  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[80px] mb-10">
      <div className="my-0 px-5 py-0">
        <Introduction status={hasSubscribed?.status} />

        <FreeCourses items={freeCourses} />

        <SubscriptionCourses
          items={subscribed ? subscribedCourses : subsCourses}
          st={hasSubscribed?.status}
        />

        {/* {!subscribed && <MentorshipCourses items={courses} />} */}
      </div>
    </section>
  );
}
