import User from "@/model/User.model";
import { useEffect, useState } from "react";

export default function useSelf() {
  const [self, setSelf] = useState<User>();
  async function getSelf() {
    try {
      const response = await fetch("/api/users/self", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This is important for including cookies (session)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to Get Users");
      }

      const result = await response.json();

      setSelf(result.user);
    } catch (error) {
      console.error("Error Fetching transaction:", error);
      throw error;
    }
  }

  useEffect(() => {
    getSelf();
  }, [setSelf]);

  return [self, setSelf];
}
