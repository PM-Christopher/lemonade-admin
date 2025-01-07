"use client"
import React from 'react';
import { ColorRing } from "react-loader-spinner";
import { useAppSelector } from "@/redux/hook";

export const FormikButton = ({ loading = false, title = "Continue", error = true, classes=null, bgColor=null, errorColor=null }:any) => {
    const { isRouting } = useAppSelector((state: any) => state.temp);
    return (
        <button
            type="submit"
            className={
            `${
                classes === null ? "rounded-xl px-[14px] py-[10px] flex justify-center items-center w-fit h-[48px]" : classes
            }
            ${
                loading && "opacity-70"
            } ${
                bgColor && !error ? errorColor : bgColor
            } ${
                bgColor === null ? (
                    !error ?  "bg-mid-green" : "bg-gradient-green"
                ) : ""
            }
            
             
            `}
            disabled={loading || !error}
        >
            {loading ? (
                <div className="flex justify-center items-center">
                    <ColorRing
                        visible={true}
                        height="30"
                        width="30"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                    />
                </div>
            ) : (
                <span className="font-sans text-white font-semibold">{title}</span>
            )}
        </button>
    );
}
