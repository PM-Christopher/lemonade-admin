export function getFirstLetterCapitalized(str: string | null | undefined): string {
    if (!str) return ""; // Handle empty string case
    return str.charAt(0).toUpperCase();
}

export function capitalizeWords(str: string | null | undefined): string {
    if (!str) return ""; // Handle null, undefined, and empty strings

    return str
        .split(" ") // Split into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
        .join(" "); // Join back into a string
}

export function capitalizeSpecial(str: string): string {
    return str
        .split(/[-_]/) // Split by special characters like '-' or '_'
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

export const GetStatusClass = (status: string) => {
    let color;
    switch (status) {
        case "Pending":
        case "pending":
        case "Draft":
            color = "text-warning-bold"; // Text color for Pending
            break;
        case "Rejected":
        case "Suspended":
        case "Removed":
        case "Inactive":
        case "INACTIVE":
        case "inactive":

            color = "text-red-1"; // Text color for Rejected
            break;
        case "Scheduled":
            color = "text-blue-accent-2"; // Text color for Rejected
            break;
        case "Successful":
        case "Success":
        case "Completed":
        case "Resolved":
        case "Sent":
        case "Active":
        case "ACTIVE":
        case "active":
            color = "text-light-green-70"; // Text color for Successful
            break;
        default:
            color = "black"; // Default text color
    }
    return color;
};