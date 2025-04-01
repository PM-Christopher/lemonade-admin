"use client"
import { pusherCon, pusherConfig } from "@/config/pusherConfig";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const usePusher = (channelName: string, eventName: string) => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [data, setData] = useState<any>(null);
    const { user } = useAppSelector((state: any) => state.auth);
    const dispatch = useAppDispatch();

    const token = cookies.token;
    const getHeader = () => {
        const token = cookies.token;
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };

    useEffect(() => {
        const pusher = channelName === "user" ? pusherCon(token) : pusherConfig(token);
        const channel = pusher.subscribe(channelName);

        const eventHandler = (receivedData: any) => {
            setData(receivedData);
            if(channelName === "chat-channel") {
            }
        };

        pusher.connection.bind("state_change", function (states: any) {
            console.log(states, "state change event>>>>>>>");
            eventName === "test-event" &&
            console.log(states, "test state change event>>>>>>>");
        });

        pusher.connection.bind("connected", function (states: any) {
            console.log("state change connected event>>>>>>>");
            eventName === "test-event" &&
            console.log("test state change connected event>>>>>>>");
        });

        channel.bind(eventName, eventHandler);

        return () => {
            channel.unbind(eventName, eventHandler);

            pusher.unsubscribe(channelName);
        };
    }, [channelName, eventName]);

    return { data };
}