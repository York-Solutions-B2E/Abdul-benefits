import { useState, useEffect } from "react";
import axios from "axios";
import { type Claim, type ClaimStatusType } from "../types/types";
import { Link, useNavigate } from "react-router-dom";

import { CLAIMS_QUERY } from "../graphql/queries";
import { getClaimStatusClasses } from "../util/claimStatusColors";

const GRAPHQL_ENDPOINT = "http://localhost:8080/graphql";

export default function ClaimsList() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>();

  // Sorting states
  const [sortColumn, setSortColumn] = useState<string | null>(
    "serviceStartDate"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filtering states
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [providerFilter, setProviderFilter] = useState("");
  const [claimNumberFilter, setClaimNumberFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClaims = async () => {
      const token = localStorage.getItem("token");
      const userJson = localStorage.getItem("user");
      if (!userJson) {
        setError("User not found in local storage");
        return;
      }

      const { memberId } = JSON.parse(userJson);

      try {
        const res = await axios.post(
          GRAPHQL_ENDPOINT,
          {
            query: CLAIMS_QUERY,
            variables: { memberId, page, size },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // const data = res.data.data?.claims ?? [];

        const { content, totalPages } = res.data.data.claimsList;
        setClaims(content);
        setTotalPages(totalPages);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Error fetching claims");
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, [size, page, totalPages]);
  // handle sort

  // Sort handler
  const handleSort = (column: string) => {
    let direction = sortDirection;
    if (sortColumn === column) {
      direction = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(direction);
    } else {
      setSortColumn(column);
      direction = "asc";
      setSortDirection(direction);
    }

    const sortedClaims = [...claims].sort((a, b) => {
      let aVal: any = a[column as keyof Claim];
      let bVal: any = b[column as keyof Claim];

      // Handle nested provider.name
      if (column === "provider") {
        aVal = a.provider?.name || "";
        bVal = b.provider?.name || "";
      }

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setClaims(sortedClaims);
  };

  // Handle filter
  const filteredClaims = claims.filter((claim) => {
    const matchesStatus =
      statusFilter.length === 0 ||
      statusFilter.includes(claim.status.toLocaleLowerCase());
    // Matches the provider name
    const matchesProvider =
      providerFilter === "" ||
      claim.provider?.name
        ?.toLowerCase()
        .includes(providerFilter.toLowerCase());

    // Matches claim #
    const matchesClaimNumber =
      claimNumberFilter === "" ||
      claim.claimNumber.toLowerCase().includes(claimNumberFilter.toLowerCase());

    // Matches the dates
    const matchesDate =
      (!startDate || new Date(claim.serviceStartDate) >= new Date(startDate)) &&
      (!endDate || new Date(claim.serviceEndDate) <= new Date(endDate));

    return (
      matchesStatus && matchesProvider && matchesClaimNumber && matchesDate
    );
  });

  const sortDirectionArr = () => {
    return sortDirection === "asc" ? " ▲" : " ▼";
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-600 animate-pulse">Loading claims...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );

  if (claims.length === 0)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-600">No claims found.</p>
      </div>
    );

  return (
    <div className="claimsList text-green-950 bg-gray-50 w-screen min-h-screen pt-20 flex items-center justify-center mx-auto">
      <div className="container bg-transparent w-4/5 md:w-[65%] flex flex-col gap-10 h-screen">
        <div className="header">
          <h1 className="text-3xl text-green-700 font-bold">Claims List</h1>
          <p className="text-gray-500">Filter and browse all your claims.</p>
        </div>
        <div className="body bg-white w-full min-h-fit block rounded-lg shadow p-4 overflow-x-scroll md:overflow-x-clip">
          <div className="filter w-full h-fit flex items-center gap-4 pb-8 ">
            <div className="relative">
              <label className="flex flex-col text-sm font-medium text-gray-700">
                Status
                <button
                  id="dropdownCheckboxButton"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-fit text-gray-400 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded text-sm p-2 text-center inline-flex items-center bg-gray-50 shadow border-gray-300 "
                  type="button"
                >
                  Status
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
              </label>
              {showDropdown && (
                <div
                  className="flex flex-col gap-2 mt-1 z-10 text-gray-800 w-48 bg-white divide-y divide-gray-100 rounded shadow-xl absolute top-14 p-2"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  {[
                    "processed",
                    "pending",
                    "in_review",
                    "submitted",
                    "paid",
                    "denied",
                  ].map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-1 text-sm capitalize"
                    >
                      <input
                        type="checkbox"
                        checked={statusFilter.includes(status)}
                        onChange={(e) => {
                          if (e.target.checked)
                            setStatusFilter([...statusFilter, status]);
                          else
                            setStatusFilter(
                              statusFilter.filter((s) => s !== status)
                            );
                        }}
                      />
                      {status === "in_review"
                        ? status.replace("_", " ")
                        : status}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <label
              htmlFor="date-start-filter"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
              <input
                type="date"
                id="date-start-filter"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full  bg-gray-50 shadow p-2 border-gray-300 rounded text-sm  outline-green-500 placeholder-gray-600"
              />
            </label>

            <label
              htmlFor="date-end-filter"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
              <input
                type="date"
                id="date-end-filter"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-gray-50 shadow p-2 border-gray-300 text-sm outline-green-500"
              />
            </label>

            <label
              htmlFor="provider-filter"
              className="block text-sm font-medium text-gray-700"
            >
              Provider
              <input
                placeholder="e.g., Springfield Clinic"
                type="search"
                id="provider-filter"
                value={providerFilter}
                onChange={(e) => setProviderFilter(e.target.value)}
                className="w-full bg-gray-50 shadow p-2 text-sm outline-green-500"
              />
            </label>
            <label
              htmlFor="claim-filter"
              className="block text-sm font-medium text-gray-700 min-fit "
            >
              Claim #
              <input
                placeholder="C-"
                type="search"
                id="claim-filter"
                value={claimNumberFilter}
                onChange={(e) => setClaimNumberFilter(e.target.value)}
                className="w-full bg-gray-50 shadow p-2 text-sm outline-green-500"
              />
            </label>
            <button
              onClick={() => {
                setStatusFilter([]);
                setProviderFilter("");
                setClaimNumberFilter("");
                setStartDate("");
                setEndDate("");
                setShowDropdown(false);
              }}
              className="ml-auto px-3 py-2 bg-gray-50 shadow rounded text-sm cursor-pointer hover:bg-gray-300 self-end"
            >
              X
            </button>
          </div>
          <table className=" min-w-full h-fit text-sm rounded-lg ">
            <thead className="bg-green-100 text-gray-500">
              <tr className="font-semibold">
                <th
                  onClick={() => handleSort("claimNumber")}
                  className="text-left p-2 cursor-pointer hover:text-green-700"
                >
                  Claim #{sortColumn === "claimNumber" && sortDirectionArr()}
                </th>
                <th
                  onClick={() => handleSort("provider")}
                  className="text-left p-2 cursor-pointer hover:text-green-700"
                >
                  Provider
                  {sortColumn === "provider" && sortDirectionArr()}
                </th>
                <th
                  onClick={() => handleSort("serviceStartDate")}
                  className="text-left p-2"
                >
                  Service Dates
                  {sortColumn === "serviceStartDate" && sortDirectionArr()}
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="text-left p-2 cursor-pointer hover:text-green-700"
                >
                  Status
                  {sortColumn === "status" && sortDirectionArr()}
                </th>
                <th
                  onClick={() => handleSort("totalBilled")}
                  className="text-right p-2 cursor-pointer hover:text-green-700"
                >
                  Billed
                  {sortColumn === "totalBilled" && sortDirectionArr()}
                </th>
                <th
                  onClick={() => handleSort("totalAllowed")}
                  className="text-right p-2 cursor-pointer hover:text-green-700"
                >
                  Allowed
                  {sortColumn === "totalAllowed" && sortDirectionArr()}
                </th>
                <th
                  onClick={() => handleSort("totalMemberResponsibility")}
                  className="text-right p-2 cursor-pointer hover:text-green-700"
                >
                  You Owe
                  {sortColumn === "totalMemberResponsibility" &&
                    sortDirectionArr()}
                </th>
              </tr>
            </thead>
            {claims.length > 0 && (
              <tbody className="w-full">
                {filteredClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    className="border-b border-b-gray-200 hover:bg-green-50 transition cursor-pointer"
                    onClick={() => navigate(`/claims/${claim.claimNumber}`)}
                  >
                    <td className="p-2 text-green-700 font-medium">
                      <Link
                        to={`/claims/${claim.claimNumber}`}
                        className="hover:underline"
                      >
                        {claim.claimNumber}
                      </Link>
                    </td>
                    <td className="p-2">
                      <div>
                        <p className="font-medium text-gray-800">
                          {claim.provider?.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {claim.provider?.specialty}
                        </p>
                      </div>
                    </td>
                    <td className="p-2 text-gray-700">
                      {claim.serviceStartDate} → {claim.serviceEndDate}
                    </td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${getClaimStatusClasses(
                          claim?.status as ClaimStatusType
                        )}`}
                      >
                        {claim.status == "IN_REVIEW"
                          ? claim.status.replace("_", " ")
                          : claim.status}
                      </span>
                    </td>
                    <td className="text-right p-2 text-gray-800">
                      ${claim.totalBilled.toFixed(2)}
                    </td>
                    <td className="text-right p-2 text-gray-800">
                      ${claim.totalAllowed.toFixed(2)}
                    </td>
                    <td className="text-right p-2 font-semibold text-green-700">
                      ${claim.totalMemberResponsibility.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {filteredClaims.length == 0 && (
            <div className="flex justify-center items-center min-w-full h-20 text-center">
              No claims found
            </div>
          )}
          <div className="flex justify-between items-center mt-4 px-4">
            <div className="relative">
              <label
                htmlFor="page-size-selector"
                className="text-sm text-gray-700 "
              >
                Rows per page:
              </label>
              <select
                id="page-size-selector"
                className="border-gray-300 rounded-lg p-1 text-sm focus:ring-teal-500 focus:border-teal-500 ml-2"
                value={size}
                onChange={(e) => setSize(+e.target.value)}
              >
                <option className="" value="10">
                  10
                </option>
                <option className="" value="25">
                  25
                </option>
              </select>
            </div>
            <div className="pagination-btns flex gap-2 items-center">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className={`px-4 py-1 rounded text-sm font-medium border cursor-pointer ${
                  page === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700 transition"
                }`}
              >
                Previous
              </button>

              <span className="text-gray-600 text-sm">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page + 1 >= totalPages}
                className={`px-4 py-1 rounded text-sm font-medium border cursor-pointer ${
                  page + 1 >= totalPages
                    ? "bg-white text-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700 transition"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
