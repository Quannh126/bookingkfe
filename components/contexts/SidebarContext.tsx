import { useState, ReactNode, createContext } from "react";
type SidebarContextProp = {
    sidebarToggle: any;
    toggleSidebar: () => void;
    closeSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextProp>(
    {} as SidebarContextProp
);

type Props = {
    children: ReactNode;
};

export function SidebarProvider({ children }: Props) {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const toggleSidebar = () => {
        console.log("click");
        setSidebarToggle(!sidebarToggle);
    };

    const closeSidebar = () => {
        setSidebarToggle(false);
    };

    return (
        <SidebarContext.Provider
            value={{ sidebarToggle, toggleSidebar, closeSidebar }}
        >
            {children}
        </SidebarContext.Provider>
    );
}
