"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
   

    if (!session) {
      // Redirect to the login page if the user is not authenticated
      router.push("/");
     
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // If session is null, the user is redirected to the login page above
  if (!session) {
    return null;
  }

  return children;
}
