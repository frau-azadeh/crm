interface StatisticsCardProps {
    title: string;
    value: number;
  }
  export function StatisticsCard({ title, value }: StatisticsCardProps) {
    return (
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
    );
  }