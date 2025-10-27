import { useState, useEffect } from "react";
import axios from "axios";
import { type DashboardData } from "../types/types";
import { DASHBOARD_QUERY } from "../graphql/queries";

const GRAPHQL_ENDPOINT = "http://localhost:8080/graphql";

export const useDashboardData = (memberId?: string) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!memberId) return;
    const fetchData = async () => {
      try {
        const response = await axios.post(
          GRAPHQL_ENDPOINT,
          { query: DASHBOARD_QUERY, variables: { memberId } },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const resData = response.data.data;

        setData({
          member: resData.memberById,
          claims: resData.claimsList.content,
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error fetching dashboard data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [memberId, error]);

  return { data, loading, error };
};
