interface Plan {
  name: string;
  networkName: string;
  planYear: number;
}

export default function ActivePlanCard({ plan }: { plan: Plan }) {
  if (!plan) return null;

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Active Plan</h2>
      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium">Plan:</span> {plan.name}
        </p>
        <p>
          <span className="font-medium">Network:</span> {plan.networkName}
        </p>
        <p>
          <span className="font-medium">Plan Year:</span> {plan.planYear}
        </p>
      </div>
    </div>
  );
}
