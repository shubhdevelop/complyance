'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { status } = useSession()
  if (status == "authenticated") redirect("/app")
  return (
    <div className='w-full h-full p-10'>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h3>Welcome to Complayance</h3>
      </div>
    </div>
  );
}
