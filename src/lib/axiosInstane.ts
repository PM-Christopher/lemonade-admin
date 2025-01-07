import { baseUrl } from "@/config/url";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: { "Content-Type": "application/json" },
});

function clearAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}

axiosInstance.interceptors.response.use(
    (response) => {
        // If the response is successful, just return it
        return response;
    },
    (error) => {
        if (error.response) {
            const { status } = error.response;
            console.log(status, "status error");

            // Handle different status codes
            if (status === 401) {
                clearAllCookies();
                window.location.href = "/login";
                //router.push("/login"); // Redirect to 403 page
            } else if (status === 403) {
                clearAllCookies();
                //store.dispatch(resetAuth());
                //window.location.href = "/login";
                //router.push("/login"); // Redirect to 403 page
            }
            // else if (status === 500) {
            //   window.location.href = "/error?type=500"; // Redirect to 500 page
            // }
            // else {
            //   console.error("Error:", error);
            // }
        } else if (error.request) {
            if (
                error.code === "ECONNABORTED" ||
                error.code === "ETIMEDOUT" ||
                error.code === "ENETWORKUNREACHABLE" ||
                error.code === "ERR_NETWORK"
            ) {
                // window.location.href = "/error";
                throw error;
            }
        }
        // else if (error.request) {
        //   // Handle no response from server
        //   window.location.href = "/error?type===500";
        // }

        // Optionally return a rejected promise if needed
        return Promise.reject(error);
    }
);