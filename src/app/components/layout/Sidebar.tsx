const Sidebar = () =>{
    return(
        <div className="bg-secondary text-white w-60 min-h-screen p-4 hidden md:block">
        <ul className="space-y-4">
            <li className="cursor-pointer hover:text-accent">داشبورد</li>
            <li className="cursor-pointer hover:text-accent">مشتریان</li>
            <li className="cursor-pointer hover:text-accent">تنظیمات</li>
        </ul>
    </div>
    )
}

export default Sidebar;