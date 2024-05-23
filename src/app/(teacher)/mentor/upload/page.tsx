import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { Payment, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export default async function Uplaod() {
  const user = await currentUser();
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[100px] mb-10">
      <div className="my-0 px-5 py-0">
        <div className="box-border w-full flex flex-col justify-start items-start gap-4 ">
          <h2 className="text-[3rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[2rem] max-[600px]:text-[2.3rem]">
            Howdy, Mentor {user?.username}
          </h2>
        </div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={courses} />
        </div>
      </div>
    </section>
  );
}
