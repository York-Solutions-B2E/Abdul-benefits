import { Link, useParams } from "react-router-dom";
import { useClaimDetailData } from "../hooks/useClaimDetailData";

import { getClaimStatusClasses } from "../util/claimStatusColors";
import { type ClaimStatusType } from "../types/types";

export default function ClaimDetail() {
  const { claimNumber } = useParams();
  const { data, loading, error } = useClaimDetailData(claimNumber!);
  return (
    <div className="text-green-950 bg-gray-50 w-screen h-fit md:h-screen flex items-center justify-center mx-auto pt-10 md:pt-20">
      <div className="w-4/5 md:w-[65%] h-fit flex flex-col gap-4 relative">
        <Link
          to="/claims"
          className="absolute top-[-40px] left-0 font-semibold text-green-600"
        >
          {String.fromCharCode(8592)} Back
        </Link>
        <h1 className="text-3xl font-bold">Claim Details</h1>

        <div className="bg-white rounded shadow h-full p-4 pt-8 flex flex-col">
          <div className="header border-b-1 border-b-gray-200 flex w-full justify-between gap-4 pb-4 ">
            <div className="col-1 w-1/2 rounded flex flex-col gap-6">
              <div className="col-info">
                <p className="text-xl font-semibold text-gray-700">
                  Claim Number
                </p>
                <p className="font-light text-lg">#{data?.claimNumber}</p>
              </div>
              <div className="col-info">
                <p className="text-xl font-semibold text-gray-700">Status</p>
                <p
                  className={` w-fit py-1 px-2 rounded text-xl font-semibold  capitalize ${getClaimStatusClasses(
                    data?.status as ClaimStatusType
                  )}`}
                >
                  {data?.status == "IN_REVIEW"
                    ? "In Review"
                    : data?.status.toLocaleLowerCase()}
                </p>
              </div>
            </div>
            <div className="col-1 w-1/2 rounded flex flex-col gap-6">
              <div className="col-info">
                <p className="text-xl font-semibold text-gray-700">
                  Service Start
                </p>
                <p className="font-light text-lg">{data?.serviceStartDate}</p>
              </div>
              <div className="col-info">
                <p className="text-xl font-semibold text-gray-700">
                  Service End
                </p>
                <p className="font-light text-lg">{data?.serviceEndDate}</p>
              </div>
            </div>
            <div className="col-1 w-1/2 rounded flex flex-col gap-6">
              <div className="col-info">
                <p className="text-xl font-semibold text-gray-700">Provider</p>
                <p className="font-light text-lg">{data?.provider.name}</p>
              </div>
              <div className="col-info">
                <p className="text-xl font-semibold text-gray-700">Specialty</p>
                <p className="font-light text-lg">{data?.provider.specialty}</p>
              </div>
            </div>
          </div>

          <div className="summary mt-4 bg-green-50 rounded-lg p-4 shadow-md">
            <h2 className="text-xl text-gray-600 font-bold mb-4">
              Financial Summary
            </h2>
            <div className="col-1 rounded flex flex-col gap-1 w-1/2">
              <div className=" w-1/2 col-info flex justify-between items-center">
                <p className="text-md text-gray-700">Total Billed</p>
                <p className="font-light text-sm">${data?.totalBilled}</p>
              </div>
              <div className=" w-1/2 col-info flex justify-between items-center">
                <p className="text-md text-gray-700">Allowed Amount</p>
                <p className="font-light text-sm">${data?.totalAllowed}</p>
              </div>
              <div className=" w-1/2 col-info flex justify-between items-center">
                <p className="text-md text-gray-700">Plan Paid</p>
                <p className="font-light text-sm">${data?.totalPlanPaid}</p>
              </div>
              <div className=" w-1/2 col-info flex justify-between items-center font-semibold text-green-700">
                <p className="text-md ">Member Responsibility</p>
                <p className="text-sm">${data?.totalMemberResponsibility}</p>
              </div>
            </div>
          </div>

          <div className="claim-lines border-t-1 border-t-gray-200 mt-4 p-4 h-fit">
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              Line items
            </h3>
            <div className="overflow-x-auto ">
              <table className="min-w-full border-collapse text-left ">
                <thead className="bg-green-100 text-gray-700 text-sm capitalize font-semibold ">
                  <tr>
                    <th className="p-1">#</th>
                    <th className="p-1">CPT Code</th>
                    <th className="p-1">Description</th>
                    <th className="p-1">Billed</th>
                    <th className="p-1">Allowed</th>
                    <th className="p-1">Deductible</th>
                    <th className="p-1">Copay</th>
                    <th className="p-1">Coinsurance</th>
                    <th className="p-1">Plan Paid</th>
                    <th className="p-1">You</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 text-sm">
                  {data?.lines.map((line) => (
                    <tr
                      key={line.id}
                      className="border-t hover:bg-green-50 transition-colors"
                    >
                      <td className="p-2">{line.lineNumber}</td>
                      <td className="p-2">{line.cptCode}</td>
                      <td className="p-2">{line.description}</td>
                      <td className="p-2">${line.billedAmount?.toFixed(2)}</td>
                      <td className="p-2">${line.allowedAmount?.toFixed(2)}</td>
                      <td className="p-2">
                        ${line.deductibleApplied?.toFixed(2)}
                      </td>
                      <td className="p-2">${line.copayApplied?.toFixed(2)}</td>
                      <td className="p-2">
                        ${line.coinsuranceApplied?.toFixed(2)}
                      </td>
                      <td className="p-2">${line.planPaid?.toFixed(2)}</td>
                      <td className="p-2 font-semibold text-green-700">
                        ${line.memberResponsibility?.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
