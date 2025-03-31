import { axiosInstance } from "@/lib/axiosInstane";
import {
    authFailure,
    authStart,
    authSuccess, authUser,
    loadStop,
} from "./authSlice";
import { getTempError, setIsRouting, updateProperty } from "@/redux/tempSlice";
import {updateToastifyReducer} from "@/redux/toastifySlice";

export const login = async (
    values: any,
    dispatch: any,
    router: any,
    setCookie: any
) => {
    dispatch(authStart());
    try {
        const { data } = await axiosInstance.post("/admin/auth/login", { ...values });
        if (data.status || data.success) {
            dispatch(setIsRouting(true));
            dispatch(setIsRouting(true));
            if (data.data.admin.status == 0) {
                setCookie("newToken", data.data.token, {
                    path: "/",
                    maxAge: 3600 * 6, // Expires after 6hrs
                    sameSite: false,
                    // domain: env === 'development' ? '' : ''
                });
                router.push("/profile-setup");
            } else {
                setCookie("token", data.data.token, {
                    path: "/",
                    maxAge: 3600 * 6, // Expires after 6hrs
                    sameSite: false,
                });
                dispatch(
                    updateToastifyReducer({
                        show: true,
                        message: "successful",
                        type: "success",
                    })
                );
                await dispatch(authSuccess(data.data));
                setTimeout(() => {
                    router.push("/");
                }, 500);
            }
        } else {
            dispatch(
                updateToastifyReducer({
                    show: true,
                    message: data.message || "error",
                    type: "error",
                })
            );
        }
    } catch (error: any) {
        dispatch(
            updateToastifyReducer({
                show: true,
                message: "Something went wrong. Please try again.",
                type: "error",
            })
        );
        dispatch(authFailure());
    }  finally {
        dispatch(loadStop());
    }
}

