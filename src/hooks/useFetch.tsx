import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (callback: any, options = {}) => {
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean | null| undefined>(null);
  const [error, setError] = useState<any | null>(null);

  const { session } = useSession();

  const fetch = async (...args: any[]) => {
    setLoading(true);
    setError(null);

    try {
      const supabaseAccessToken = await session?.getToken({
        template: "supabase",
      });

      const response = await callback(supabaseAccessToken, options, ...args);
      setData(response);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { fetch, loading, data, error };
};

export default useFetch;
