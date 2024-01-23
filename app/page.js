"use client"
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  return (
    <>
      <div className="grid grid-cols-2 text-white p-4">
        <div>
        </div>
      </div>
    </>
  );
}
