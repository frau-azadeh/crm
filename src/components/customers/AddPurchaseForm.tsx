import { useState } from "react";
import { addPurchase } from "@/services/purchaseService";
import { DayValue } from "react-modern-calendar-datepicker";
import { toast } from "react-hot-toast";

interface Props {
  customerId: number;
  onSuccess: () => void;
}

export default function AddPurchaseForm({ customerId, onSuccess }: Props) {
  const [amount, setAmount] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DayValue>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !selectedDate) {
      toast.error("لطفا مبلغ و تاریخ را وارد کنید.");
      return;
    }

    const formattedDate = `${selectedDate.year}-${String(
      selectedDate.month
    ).padStart(2, "0")}-${String(selectedDate.day).padStart(2, "0")}`;

    try {
      setIsSubmitting(true);
      await addPurchase({
        customerId,
        amount: parseInt(amount),
        date: formattedDate,
      });

      toast.success("خرید با موفقیت ثبت شد");
      onSuccess(); // فراخوانی برای بروزرسانی لیست خریدها
    } catch (error) {
      toast.error("خطا در ثبت خرید");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        placeholder="مبلغ"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="date"
        value={
          selectedDate
            ? `${selectedDate.year}-${String(selectedDate.month).padStart(
                2,
                "0"
              )}-${String(selectedDate.day).padStart(2, "0")}`
            : ""
        }
        onChange={(e) => {
          const [year, month, day] = e.target.value.split("-").map(Number);
          setSelectedDate({ year, month, day });
        }}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-primary text-white p-2 rounded w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "در حال ارسال..." : "ثبت خرید"}
      </button>
    </form>
  );
}