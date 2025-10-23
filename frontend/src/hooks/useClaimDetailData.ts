import { useState, useEffect } from "react";
import axios from "axios";
import { type Claim } from "../types/types";

import { CLAIM_DETAIL_QUERY } from "../graphql/queries";

const GRAPHQL_ENDPOINT = "http://localhost:8080/graphql";

export const useClaimDetailData = (claimNumber: string) => {
  const [data, setData] = useState<Claim | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const res = await axios.post(
          GRAPHQL_ENDPOINT,
          {
            query: CLAIM_DETAIL_QUERY,
            variables: { claimNumber },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("GraphQL Detail Response: ", res.data);

        const data = res.data.data.getByClaimNumber;

        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.log("ERROR: " + error);
        } else {
          setError("Error fetching claim detail data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [claimNumber, error]);

  return { data, loading, error };
};
