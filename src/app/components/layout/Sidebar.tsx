import Link from "next/link";

const Sidebar = ({ isMobile }: { isMobile?: boolean }) => {
  return (
    <div
      className={`bg-secondary text-white w-60 min-h-screen p-4 ${
        isMobile ? "" : "hidden md:block"
      }`}
    >
      <ul className="space-y-4">
        <li className="cursor-pointer hover:text-accent">
          <Link href="/">داشبورد</Link>
        </li>
        <li className="cursor-pointer hover:text-accent">
          <Link href="/customers">مشتریان</Link>
        </li>
        <li className="cursor-pointer hover:text-accent">
          <Link href="#">تنظیمات</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
