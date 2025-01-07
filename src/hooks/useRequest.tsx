import { axiosInstance } from "@/lib/axiosInstane";
import { useAppDispatch } from "@/redux/hook";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const useRequest = (
    url: string,
    method = "GET",
    body = {},
    start = true,
    header: any
) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useAppDispatch();

    const getData = async () => {
        setLoading(true);
        try {
            let response;
            if (method === "GET") {
                response = await axiosInstance(url, header);
                    if(url === "/get-all-banks"){
                        if (response.status) {
                            setData(response.data.banks)
                        }
                    } else {
                        if (response.data.status) {
                            setData(response.data.data);
                        }
                    }
            }
        } catch (err: any) {
            setError(true);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    useLayoutEffect(() => {
        if (start) {
            getData();
        } else {
            setLoading(false);
        }
    }, [url]);
    return { data, loading, error, errorMessage, getData };
};
