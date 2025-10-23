interface Accumulator {
  type: string;
  tier: string;
  limitAmount: number;
  usedAmount: number;
}

export default function AccumulatorProgress({
  accumulators,
}: {
  accumulators: Accumulator[];
}) {
  if (!accumulators || accumulators.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        In-Network Accumulators
      </h2>

      <div className="space-y-4">
        {accumulators
          .filter((a) => a.tier === "IN_NETWORK")
          .map((acc) => {
            const percent =
              acc.limitAmount > 0
                ? Math.min((acc.usedAmount / acc.limitAmount) * 100, 100)
                : 0;

            return (
              <div key={acc.type}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span className="capitalize">
                    {acc.type.replace("_", " ")}
                  </span>
                  <span>
                    ${acc.usedAmount.toFixed(2)} / ${acc.limitAmount.toFixed(2)}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
