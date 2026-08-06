"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { loginSchema } from "../../schemas";
import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SignInView = () => {
  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const login = useMutation(
    trpc.auth.login.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        router.push("/");
      },
    })
  );

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login.mutate(values);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-primary min-h-screen w-full lg:col-span-3 lg:h-screen lg:overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-4 lg:p-16"
          >
            <div className="flex items-center justify-between">
              <Link href={"/"}>
                <span className="text-xl font-semibold text-white lg:text-2xl">
                  Lvl Marketplace
                </span>
              </Link>

              <Button
                asChild
                size={"sm"}
                className="rounded-none border-none text-sm underline lg:text-base"
              >
                <Link prefetch href={"/sign-up"}>
                  Sign Up
                </Link>
              </Button>
            </div>

            <h1 className="text-2xl font-medium text-white sm:text-3xl lg:text-4xl">
              Welcome back again!
            </h1>

            <div className="rounded-none border border-white/10 bg-white p-4 sm:p-6 lg:p-8">
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem className="py-4">
                    <FormLabel className="text-base sm:text-xl">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-10 rounded-none py-5 !text-base sm:!text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem className="py-4">
                    <FormLabel className="text-base sm:text-xl">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-10 rounded-none py-5 !text-base sm:!text-lg"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={login.isPending}
                type="submit"
                className="my-4 rounded-none py-5 text-base hover:cursor-pointer sm:text-lg"
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div
        className="hidden h-screen w-full lg:col-span-2 lg:block"
        style={{
          backgroundImage: "url('/bg-auth-2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
