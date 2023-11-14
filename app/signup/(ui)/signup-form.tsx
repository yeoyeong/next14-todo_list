"use client";
import { useFormState } from "react-dom";
import { authenticate, signup } from "@/app/lib/server/actions";
import SignupButton from "./signup-button";

export default function SignupForm() {
  const [_, action] = useFormState(signup, undefined);
  return (
    <form action={action}>
      <div className="w-full">
        <div>
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
          </div>
        </div>
        <div>
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="name"
          >
            Name
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={3}
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="passwordCheck"
          >
            Password Check
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="passwordCheck"
              type="password"
              name="passwordCheck"
              placeholder="Enter password check"
              required
              minLength={3}
            />
          </div>
        </div>
      </div>
      <SignupButton />
    </form>
  );
}
