"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { registerSchema } from "../../schemas";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SignUpView = () => {
  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const register = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        router.push("/");
      },
    })
  );

  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    register.mutate(values);
  };

  const username = form.watch("username");
  const usernameErrors = form.formState.errors.username;

  const showPreview = username && !usernameErrors;

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
                <Link prefetch href={"/sign-in"}>
                  Sign In
                </Link>
              </Button>
            </div>

            <h1 className="text-2xl font-medium text-white sm:text-3xl lg:text-4xl">
              Join the marketplace built for growth.
            </h1>

            <div className="rounded-none border border-white/10 bg-white p-4 sm:p-6 lg:p-8">
              <FormField
                name="username"
                render={({ field }) => (
                  <FormItem className="py-4">
                    <FormLabel className="text-base sm:text-xl">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-10 rounded-none py-5 !text-base sm:!text-lg"
                      />
                    </FormControl>
                    <FormDescription
                      className={cn("hidden", showPreview && "block")}
                    >
                      Your store will be available at&nbsp;
                      <strong className="italic">{username}</strong>
                      .lvling.store
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                disabled={register.isPending}
                type="submit"
                className="my-4 rounded-none py-5 text-base hover:cursor-pointer sm:text-lg"
              >
                Create account
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div
        className="hidden h-screen w-full lg:col-span-2 lg:block"
        style={{
          backgroundImage: "url('/bg-auth.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
