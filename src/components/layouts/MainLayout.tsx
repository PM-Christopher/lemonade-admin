import { ReactNode } from "react";
import SideNav from "@/components/global/SideNav";
import TopNav from "@/components/global/TopNav";

interface DashboardLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <SideNav />

            {/* Main Content */}
            <main className="flex-1 bg-light-grey">
                <TopNav />

                {/* Content */}
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
