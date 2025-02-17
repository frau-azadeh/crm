interface TopCustomer {
  id: number;
  name: string;
  email: string;
  totalAmount: number;
}
interface TopCustomersListProps {
  customers: TopCustomer[];
}
export function TopCustomersList({ customers }: TopCustomersListProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        5 مشتری با بیشترین مبلغ خرید
      </h2>
      {customers.length === 0 ? (
        <p className="text-gray-600">هنوز خریدی انجام نشده است.</p>
      ) : (
        <ul className="space-y-3">
          {customers.map((c) => (
            <li
              key={c.id}
              className="flex justify-between items-center border-b pb-2 last:border-b-0"
            >
              <div>
                <p className="text-lg font-medium">{c.name}</p>
                <p className="text-sm text-gray-500">{c.email}</p>
              </div>
              <p className="font-bold text-green-600">
                {c.totalAmount.toLocaleString()} تومان
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
