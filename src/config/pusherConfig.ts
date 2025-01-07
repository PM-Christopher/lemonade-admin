import Pusher from "pusher-js";
import {baseUrl} from "./url";

const app_key: any = process.env.NEXT_PUBLIC_PUSHER_KEY;
export const pusherConfig = (token: any) => {
    return new Pusher(app_key, {
        cluster: "eu",
        userAuthentication: {
            transport: "ajax",
            endpoint: `${baseUrl}/pusher/auth/user`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        channelAuthorization: {
            transport: "ajax",
            endpoint: `${baseUrl}/pusher/auth/channel`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });
};

export const pusherCon = (token: any) => {
    return new Pusher(app_key, {
        cluster: "eu",
    });
};
