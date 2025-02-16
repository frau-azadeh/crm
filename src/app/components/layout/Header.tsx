import { Menu } from "lucide-react";

const Header = ({toggleSidebar}:{toggleSidebar:()=>void}) => {
  return (
    <div className="bg-primary text-white shadow-md p-4 justify-between items-center flex">
      <h1 className="text-lg font-bold">مدیریت مشتریان</h1>
      <button className="block md:hidden" onClick={toggleSidebar}>
        <Menu className="w-6 h-6"/>
      </button>
    </div>
  );
};

export default Header;
