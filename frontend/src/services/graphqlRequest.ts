// import axios from "axios";

// const GRAPHQL_URL = "http://localhost:8080/graphql";

// export async function graphqlRequest<T>(
//   query: string,
//   variables?: Record<string, unknown>
// ): Promise<T> {
//   try {
//     const response = await axios.post(GRAPHQL_URL, {
//       query,
//       variables,
//     });

//     if (response.data.errors) {
//       console.error("GraphQL errors:", response.data.errors);
//       throw new Error(response.data.errors[0]?.message || "GraphQL Error");
//     }

//     return response.data.data;
//   } catch (error: unknown) {
//     console.error("GraphQL request failed:", error);
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error("Network Error");
//     }
//   }
// }
