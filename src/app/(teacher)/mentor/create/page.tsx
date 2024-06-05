"use client";

import { Button } from "@/components/ui/button"; // Importing the Button component
import { useUser } from "@clerk/nextjs"; // Importing the useUser hook from Clerk for user authentication
import { useRouter } from "next/navigation"; // Importing the useRouter hook from Next.js for navigation
import Link from "next/link"; // Importing the Link component from Next.js for client-side navigation

import * as z from "zod"; // Importing zod for schema validation
import axios from "axios"; // Importing axios for making HTTP requests
import { useForm } from "react-hook-form"; // Importing useForm hook for form management
import { zodResolver } from "@hookform/resolvers/zod"; // Importing zodResolver for zod schema validation with react-hook-form

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Importing form-related components from the UI library
import { Input } from "@/components/ui/input"; // Importing the Input component from the UI library
import toast from "react-hot-toast"; // Importing the toast function from react-hot-toast for displaying notifications

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
}); // Defining a zod schema for form validation

export default function Create() {
  const router = useRouter(); // Initializing the router object for navigation
  const { user, isLoaded, isSignedIn } = useUser(); // Destructuring user, isLoaded, and isSignedIn from useUser hook

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Configuring the form with zod schema validation
    defaultValues: {
      title: "",
    },
  }); // Initializing the form object with useForm hook

  const { isSubmitting, isValid } = form.formState; // Destructuring isSubmitting and isValid from form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values); // Making a POST request to create a new course
      router.push(`/mentor/create/${response.data.id}`); // Navigating to the newly created course page
      toast.success("The course has been created"); // Showing a success toast notification
    } catch (error) {
      toast.error("Something went wrong"); // Showing an error toast notification
    }
  }; // Function to handle form submission

  return (
    <section className="max-w-[1380px] w-full mx-auto overflow-hidden  mt-[100px] mb-10">
      <div className="my-0 px-5 py-0">
        {/* Content removed for brevity */}
        <div className="max-w-5xl mx-auto flex flex-col md:items-center md:justify-center h-full p-6">
          {/* Content removed for brevity */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-8"
            >
              {/* Form fields */}
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

              {/* Form buttons */}
              <div className="flex items-center gap-x-2">
                <Link href={"/"}>
                  <Button variant={"outline"} type="button">
                    Annuler
                  </Button>
                </Link>
                <Button
                  className="button_auth"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  Continuer
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
