interface Claim {
  claimNumber: string;
  status: string;
  totalBilled: number;
  totalAllowed: number;
  totalMemberResponsibility: number;
}

export default function RecentClaimsTable({ claims }: { claims: Claim[] }) {
  if (!claims || claims.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow p-5 overflow-x-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Claims
      </h2>
      <table className="min-w-full text-sm text-gray-700 border-collapse">
        <thead>
          <tr className="border-b bg-gray-50 text-left">
            <th className="py-2 px-3">Claim #</th>
            <th className="py-2 px-3">Status</th>
            <th className="py-2 px-3 text-right">Billed</th>
            <th className="py-2 px-3 text-right">Allowed</th>
            <th className="py-2 px-3 text-right">Member Responsibility</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((c) => (
            <tr key={c.claimNumber} className="border-b hover:bg-gray-50">
              <td className="py-2 px-3 font-medium">{c.claimNumber}</td>
              <td className="py-2 px-3 capitalize">{c.status.toLowerCase()}</td>
              <td className="py-2 px-3 text-right">
                ${c.totalBilled.toFixed(2)}
              </td>
              <td className="py-2 px-3 text-right">
                ${c.totalAllowed.toFixed(2)}
              </td>
              <td className="py-2 px-3 text-right">
                ${c.totalMemberResponsibility.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
