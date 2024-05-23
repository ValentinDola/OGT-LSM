import Link from "next/link";
import SearchPage from "../search/page";

const PaidCourses = () => {
  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[100px] mb-10">
      <div className="my-0 px-5 py-0">
        <Link href={"/search"}>paid course</Link>
      </div>
    </section>
  );
};

export default PaidCourses;
