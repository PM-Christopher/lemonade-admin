
"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateToastifyReducer } from "@/redux/toastifySlice";
import Alert from "@mui/material/Alert";

export const AlertMessage = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const { showToast } = useSelector((s: any) => s.toast);

    useEffect(() => {
        let timer: any;
        if (showToast.show) {
            timer = setTimeout(() => {
                dispatch(
                    updateToastifyReducer({
                        show: false,
                        type: "success",
                        message: "No message.",
                    })
                );
            }, 5000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [showToast, dispatch]);

    return showToast.show ? (
        <div className="fixed top-10 left-0 w-full" style={{ zIndex: 99999 }}>
            <div className="px-5 w-full tablet:w-[872px] tablet:mx-auto z-100">
                <Alert
                    variant="filled"
                    severity={showToast.type === "success" ? "success" : "error"}
                    onClose={() => {}}
                >
                    {showToast.message}
                </Alert>
            </div>
        </div>
    ) : null;
};
