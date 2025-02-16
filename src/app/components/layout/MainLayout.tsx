import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-background p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
