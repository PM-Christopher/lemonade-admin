import React from 'react';
import MainLayout from "@/components/layouts/MainLayout";

function ProfilePage({}) {
    return (
        <MainLayout>
            <section className={"p-[20px] flex justify-between"}>
                <div className={"w-[588px] h-fit bg-white flex flex-col rounded-[12px] gap-[12px]"}>
                    <div className={'flex flex-col p-[24px] gap-[20px]'}>
                        <div className={'w-[64px] h-[64px] bg-mid-grey rounded-full'}></div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Full Name:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>Adebayo Akintoye</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>User ID:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>LN112332</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Status:</p>
                            </div>
                            <p className={"text-[14px] font-medium  text-light-green-70"}>Active</p>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Role:</p>
                            </div>
                            <div className={"flex gap-[4px]"}>
                                <p className={"text-[14px] font-medium"}>Customer support</p>
                            </div>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Email Address:</p>
                            </div>
                            <div className={"flex gap-[4px]"}>
                                <p className={"text-[14px] font-medium"}>adebayoadetoye@gmail.com</p>
                            </div>
                        </div>
                        <div className={"flex gap-[24px] items-center-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Date Address:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>23 Apr, 2024 09:45 PM</p>
                        </div>
                        <button
                            className={'px-[48px] py-[11px] border-[1px] rounded-[12px] border-light-grey-50 w-fit font-sans font-medium text-[14px]'}
                            type={'button'}>Update password
                        </button>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default ProfilePage;