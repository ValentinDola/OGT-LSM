import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAnalytics } from "../../../../../actions/get-analytics";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

export default async function Analytics() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[100px] mb-10">
      <div className="my-0 px-5 py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <DataCard
            label={"Revenu total"}
            value={totalRevenue}
            shouldFormat={true}
          />
          <DataCard label={"Ventes totales"} value={totalSales} />
        </div>
        <Chart data={data} />
      </div>
    </section>
  );
}
