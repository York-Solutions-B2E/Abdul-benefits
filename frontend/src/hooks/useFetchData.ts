import axios from "axios";
import { useState } from "react";
import type { DashboardData, Claim } from "../types/types";

export const useFetchData = (
  link: string,
  query: string,
  variables: object
) => {
  const [data, setData] = useState<DashboardData | Claim | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await axios.post(
        link,
        { query: query, variables: variables },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from Fetch function: ", response);
      const resData = response.data.data;

      setData({
        member: resData.memberById,
        claims: resData.claims,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        //   console.log("ERROR: " + err);
      } else {
        setError("Error fetching dashboard data");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchData();

  return { data, loading, error };
};
