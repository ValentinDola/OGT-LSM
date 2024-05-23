"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Payment } from "../upload/_components/columns";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export default function Create() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/mentor/create/${response.data.id}`);
      toast.success("The course has been created");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[100px] mb-10">
      <div className="my-0 px-5 py-0">
        {/* <div className="box-border w-full flex flex-col justify-start items-start gap-4 ">
          <h2 className="text-[3rem] tracking-[-0.064em] font-semibold max-[986px]:text-[3rem] max-[400px]:text-[2rem] max-[600px]:text-[2.3rem]">
            Howdy, Mentor {user?.username}
          </h2>
        </div> */}
        <div className="max-w-5xl mx-auto flex flex-col md:items-center md:justify-center h-full p-6">
          <h1 className="text-[1.3rem] tracking-[-0.064em] font-semibold">
            Name your course
          </h1>
          <p className="text-sm text-slate-600">
            What would you like to name your course? Don't worry, you can change
            this later.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course title</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[500px]"
                        disabled={isSubmitting}
                        placeholder="e.g 'Beginner Forex Class'"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-x-2">
                <Link href={"/"}>
                  <Button variant={"outline"} type="button">
                    Cancel
                  </Button>
                </Link>
                <Button
                  className="button_auth"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
