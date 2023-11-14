"use client";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useFormStatus } from "react-dom";

export default function SignupButton() {
  const { pending } = useFormStatus();
  return (
    <button className="mt-4 w-full" aria-disabled={pending}>
      Signup <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </button>
  );
}
