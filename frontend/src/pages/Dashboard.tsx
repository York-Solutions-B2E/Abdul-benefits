import { Link, useNavigate } from "react-router-dom";
import { useDashboardData } from "../hooks/useDashboardData";
import { useEffect, useState } from "react";
import type { ClaimStatusType } from "../types/types";
import { getClaimStatusClasses } from "../util/claimStatusColors";

export default function Dashboard() {
  const [user, setUser] = useState<{ memberId: string } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, []);

  const { data, loading, error } = useDashboardData(user?.memberId);

  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error, navigate]);

  if (loading)
    return (
      <div className="p-4" role="status" aria-live="polite">
        Loading...
      </div>
    );
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!data || !data.member)
    return (
      <div className="p-4 text-black" role="alert">
        No data
      </div>
    );

  const { member, claims } = data;

  const inNetworkAccums = member.activeEnrollment?.accumulators.filter(
    (a) => a.tier === "IN_NETWORK"
  );

  return (
    <div className="space-y-6 text-black w-screen h-screen flex flex-col items-center justify-start bg-gray-50 pt-40">
      <div className="flex flex-col md:flex-row gap-4 w-4/5 md:w-[65%] bg-transparentn relative">
        <h2 className="absolute top-[-100px] left-0 text-3xl text-gray-600 font-light">
          Welcome,
          <span className="text-green-600">
            {" " + member.firstName || "Member"} 👋
          </span>
        </h2>
        <div className=" flex flex-col gap-4 rounded h-fit  md:h-full w-full md:w-1/2 m-0">
          <div className="flex flex-col gap-4 h-fit md:h-1/2 bg-white shadow p-4 rounded">
            <p className="text-md text-green-700 w-fit py-1 px-2 bg-green-200 rounded-4xl">
              Active Plan
            </p>
            <div className="planDetails">
              <p className="text-xl text-green-800 font-bold pb-4 border-b-1 border-b-gray-200">
                {member.activeEnrollment?.plan.name} -{" "}
                {member.activeEnrollment?.plan.networkName}
              </p>
              <p className="text-xs mt-4 text-green-700 font-bold uppercase">
                Coverage Period
              </p>
              <p className="text-sm text-gray-600 ">
                {member.activeEnrollment?.coverageStart} -{" "}
                {member.activeEnrollment?.coverageStart}
              </p>
            </div>
          </div>

          <div className="rounded h-fit md:h-1/2 bg-white shadow p-4 flex flex-col  gap-4">
            <p className="font-semibold text-2xl text-green-800">
              In-Network Progress
            </p>
            {inNetworkAccums?.map((acc) => (
              <div key={acc.type} className="">
                <div className="flex justify-between mt-1 capitalize text-sm text-gray-600">
                  <span>
                    {acc.type == "OOP_MAX"
                      ? "Out-of-Pocket Max"
                      : acc.type.toLocaleLowerCase()}
                  </span>

                  <span className="text-green-700 font-bold">
                    ${acc.usedAmount} / ${acc.limitAmount}
                  </span>
                </div>
                <div className="flex items-center w-full bg-gray-200 h-4 rounded-xl ">
                  <span
                    className={`w-0 h-4 bg-green-700 rounded-xl transition-all duration-700 ease-out`}
                    style={{
                      width: `${(acc.usedAmount * 100) / acc.limitAmount}%`,
                    }}
                  ></span>
                </div>
                <p className="text-xs text-gray-400">Used vs. Limit</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow h-full w-full md:w-1/2 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-green-800">Recent Claims</h2>
            <Link
              className="w-fit cursor-pointer text-green-600 font-bold rounded hover:bg-green-100 hover:text-gray-400"
              to="/claims"
            >
              View All Claims {String.fromCharCode(8594)}
            </Link>
          </div>
          <ul className="mt-2 space-y-2">
            {claims.map((claim) => (
              <li
                key={claim.claimNumber}
                className="border-b-neutral-600 p-2 rounded flex justify-between items-center cursor-pointer hover:bg-green-100"
                onClick={() => navigate(`/claims/${claim.claimNumber}`)}
              >
                <div>
                  <p className="font-semibold">
                    #{claim.claimNumber} -{" "}
                    <span
                      className={`text-sm p-1 rounded capitalize ${getClaimStatusClasses(
                        claim?.status as ClaimStatusType
                      )}`}
                    >
                      {claim.status == "IN_REVIEW"
                        ? "IN REVIEW"
                        : claim?.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700">
                    {claim.provider.name} - {claim.provider.specialty}
                  </p>
                </div>
                <div>
                  <p>${claim.totalBilled}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
