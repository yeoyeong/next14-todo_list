import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen	 flex justify-center items-center	">
      <Link
        className="rounded-md bg-cyan-400 px-3 py-2 text-xl font-bold text-white"
        href="/dashboard"
      >
        대시보드
      </Link>
    </main>
  );
}
