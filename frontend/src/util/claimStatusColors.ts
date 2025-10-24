import { type ClaimStatusType } from "../types/types";

export const getClaimStatusClasses = (status: ClaimStatusType) => {
  switch (status) {
    case "PROCESSED":
      return "bg-green-100 text-green-700";
    case "DENIED":
      return "bg-red-100 text-red-700";
    case "SUBMITTED":
      return "bg-gray-200 text-black-100";
    case "IN_REVIEW":
    case "PAID":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
