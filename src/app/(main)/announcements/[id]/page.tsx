'use client'
import React, {useEffect, useState} from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import {useParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {getAnnouncementDetail} from "@/features/announcements/announcements.slice";
import {capitalizeWords} from "@/utils/helper";

function AnnouncementDetailsPage({}) {
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { authToken } = useSelector((state: RootState) => state.auth)
    const id = params.id ? (Array.isArray(params.id) ? parseInt(params.id[0]) : parseInt(params.id)) : undefined;
    const { loading, announcement } = useSelector((state: RootState) => state.announcement) as { announcement: any, loading: boolean };
    
    // Add hydration protection
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Set hydrated state after component mounts
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (id && authToken && isHydrated) {
            dispatch(getAnnouncementDetail({token: authToken, id}))
        }
    }, [id, authToken, isHydrated, dispatch])

    // Don't render dynamic content until hydrated
    if (!isHydrated) {
        return (
            <MainLayout>
                <section className={"p-[20px] flex justify-between"}>
                    <div className={"w-[800px] h-fit bg-white flex flex-col rounded-[12px]"}>
                        <div className={'flex flex-col p-[24px] gap-[20px]'}>
                            <div className={"flex gap-[24px] items-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Event Owner:</p>
                                </div>
                                <div className={"flex gap-[4px]"}>
                                    <p className={"text-[14px] font-medium"}>Loading...</p>
                                </div>
                            </div>
                            <div className={"flex gap-[24px] items-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Announcement ID:</p>
                                </div>
                                <p className={"text-[14px] font-medium"}>Loading...</p>
                            </div>
                            <div className={"flex gap-[24px] items-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Date Created:</p>
                                </div>
                                <div className={"flex gap-[4px]"}>
                                    <p className={"text-[14px] font-medium"}>Loading...</p>
                                </div>
                            </div>
                            <div className={"flex gap-[24px] items-center"}>
                                <div className={"w-[115px]"}>
                                    <p className={"text-text-grey text-[12px] font-medium"}>Status:</p>
                                </div>
                                <p className={"text-[14px] font-medium text-light-green-70"}>Loading...</p>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[780px] h-fit bg-white rounded-[12px] flex flex-col gap-[16px]"}>
                        <div className={'p-[24px] border-b-[1px] flex justify-between items-center'}>
                            <p className={'font-semiBold text-[16px]'}>Announcement</p>
                            <div className={'p-[10px] px-[14px] border-[1px] border-light-grey-50 rounded-[12px] cursor-pointer'}>
                                <p className={'font-medium text-[14px]'}>Edit draft</p>
                            </div>
                        </div>
                        <div className={'p-[24px] flex flex-col gap-[16px]'}>
                            <div className={"flex flex-col"}>
                                <p className={'font-medium text-[12px] text-text-grey'}>Title</p>
                                <p className={'text-[20px] font-semiBold'}>Loading...</p>
                            </div>
                            <div className={"flex flex-col"}>
                                <p className={'font-medium text-[12px] text-text-grey'}>Body</p>
                                <p>Loading...</p>
                            </div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        );
    }

    // Parse content safely
    let content = null;
    try {
        content = announcement?.content ? JSON.parse(announcement.content) : null;
    } catch (error) {
        console.error('Error parsing announcement content:', error);
        content = null;
    }

    return (
        <MainLayout>
            <section className={"p-[20px] flex justify-between"}>
                <div className={"w-[800px] h-fit bg-white flex flex-col rounded-[12px]"}>
                    <div className={'flex flex-col p-[24px] gap-[20px]'}>
                        <div className={"flex gap-[24px] items-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Event Owner:</p>
                            </div>
                            <div className={"flex gap-[4px]"}>
                                <p className={"text-[14px] font-medium"}>{announcement?.created_by?.name || 'N/A'}</p>
                            </div>
                        </div>
                        <div className={"flex gap-[24px] items-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Announcement ID:</p>
                            </div>
                            <p className={"text-[14px] font-medium"}>AN112332</p>
                        </div>
                        <div className={"flex gap-[24px] items-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Date Created:</p>
                            </div>
                            <div className={"flex gap-[4px]"}>
                                <p className={"text-[14px] font-medium"}>{announcement?.created_at || 'N/A'}</p>
                            </div>
                        </div>
                        <div className={"flex gap-[24px] items-center"}>
                            <div className={"w-[115px]"}>
                                <p className={"text-text-grey text-[12px] font-medium"}>Status:</p>
                            </div>
                            <p className={"text-[14px] font-medium text-light-green-70"}>
                                {announcement?.status ? capitalizeWords(announcement.status) : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={"w-[780px] h-fit bg-white rounded-[12px] flex flex-col gap-[16px]"}>
                    <div className={'p-[24px] border-b-[1px] flex justify-between items-center'}>
                        <p className={'font-semiBold text-[16px]'}>Announcement</p>
                        <div className={'p-[10px] px-[14px] border-[1px] border-light-grey-50 rounded-[12px] cursor-pointer'}>
                            <p className={'font-medium text-[14px]'}>Edit draft</p>
                        </div>
                    </div>
                    <div className={'p-[24px] flex flex-col gap-[16px]'}>
                        <div className={"flex flex-col"}>
                            <p className={'font-medium text-[12px] text-text-grey'}>Title</p>
                            <p className={'text-[20px] font-semiBold'}>
                                {content?.title || 'No title available'}
                            </p>
                        </div>
                        <div className={"flex flex-col"}>
                            <p className={'font-medium text-[12px] text-text-grey'}>Body</p>
                            {content?.content ? (
                                <div
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: content.content }}
                                />
                            ) : (
                                <p>No content available</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default AnnouncementDetailsPage;