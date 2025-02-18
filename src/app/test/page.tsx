"use client";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function TestPage() {
  const [date, setDate] = useState<any>(new Date());

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">تست تقویم</h1>
      <DatePicker
        value={date}
        onChange={setDate}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-center"
        inputClass="border p-2 rounded w-full"
      />
      <p className="mt-4">انتخاب شده: {date?.toString()}</p>
    </div>
  );
}
