import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = ({children} : {children: ReactNode}) =>{
    return(
        <div>
            <Header/>
            <div>
                <Sidebar/>
                <main>{children}</main>
            </div>
        </div>
    )
}

export default MainLayout;