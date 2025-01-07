import {usePathname} from "next/navigation";

export const activeLink = (path: string, exact: boolean = false) => {
    const pathName = usePathname(); // Get the current path

    // Check for exact match or if path is contained
    if (exact) {
        return pathName === path; // Exact match case
    } else {
        return pathName.includes(path); // Partial match case
    }
};