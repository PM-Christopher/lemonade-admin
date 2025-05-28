"use client";
import React, { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getWalletDetail } from "@/features/wallet/wallet.slice";
import {
  deleteReport,
  getReportDetail,
  resolveReport,
} from "@/features/reporting/reporting.slice";
import { capitalizeWords, GetStatusClass } from "@/utils/helper";
import { updateToastifyReducer } from "@/redux/toastifySlice";

function ReportDetailsPage() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { authToken } = useSelector((state: RootState) => state.auth);
  const id = params.id
    ? Array.isArray(params.id)
      ? parseInt(params.id[0])
      : parseInt(params.id)
    : undefined;
  const { loading, report } = useSelector(
    (state: RootState) => state.report
  ) as { report: any; loading: boolean };

  useEffect(() => {
    if (id && authToken) {
      dispatch(getReportDetail({ token: authToken, id }));
    }
  }, [id]);

  let event = null;

  try {
    const parsedContent = JSON.parse(report?.content || "{}");
    event = parsedContent.events;
  } catch (error) {
    console.error("Failed to parse report content", error);
  }

  const resolve = () => {
    if (id && authToken) {
      dispatch(resolveReport({ token: authToken, id: id })).then((res) => {
        if (res.payload.status === true) {
          dispatch(
            updateToastifyReducer({
              show: true,
              message: res.payload.message || "Report marked as resolved",
              type: "success",
            })
          );

            dispatch(getReportDetail({ token: authToken, id }));
        } else {
          dispatch(
            updateToastifyReducer({
              show: true,
              message: res.payload.message || "error",
              type: "error",
            })
          );
        }
      });
    }
  };
  const handleDelte = () => {
    if (id && authToken) {
      dispatch(deleteReport({ token: authToken, id: id })).then((res) => {

         if (res.payload.status === true) {
          dispatch(
            updateToastifyReducer({
              show: true,
              message: res.payload.message || "Report marked as resolved",
              type: "success",
            })
          );
            dispatch(getReportDetail({ token: authToken, id }));
        } else {
          dispatch(
            updateToastifyReducer({
              show: true,
              message: res.payload.message || "error",
              type: "error",
            })
          );
        }
      
      });
    }
  };

  return (
    <MainLayout>
      <section className="p-4 md:p-5 flex lg:flex-col flex-row gap-4 md:gap-5 w-full overflow-x-hidden max-w-full">
        <div
          className={"w-[800px] h-fit bg-white flex flex-col rounded-[12px]"}
        >
          <div
            className={
              "flex flex-col p-[24px] gap-[20px] border-b-[1px] border-b-grey-20"
            }
          >
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Reported By:
                </p>
              </div>
              <div className={"flex gap-[4px]"}>
                <p className={"text-[14px] font-medium"}>
                  {report?.reported_by?.name}
                </p>
              </div>
            </div>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Report ID:
                </p>
              </div>
              <p className={"text-[14px] font-medium"}>RE112332</p>
            </div>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Category:
                </p>
              </div>
              <p className={"text-[14px] font-medium"}>
                {capitalizeWords(report?.category)}
              </p>
            </div>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Case:
                </p>
              </div>
              <div className={"flex gap-[4px]"}>
                <p className={"text-[14px] font-medium"}>{report?.case}</p>
              </div>
            </div>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Date Submitted:
                </p>
              </div>
              <p className={"text-[14px] font-medium"}>
                {report?.date_submitted}
              </p>
            </div>
            <div className={"flex gap-[24px] items-center-center"}>
              <div className={"w-[115px]"}>
                <p className={"text-text-grey text-[12px] font-medium"}>
                  Status:
                </p>
              </div>
              <p className={"text-[14px] font-medium text-warning-bold"}>
                {capitalizeWords(report?.status)}
              </p>
            </div>
          </div>
          <div className={"p-[24px]"}>
            <button
            onClick={resolve}
              className={
                "px-[48px] py-[11px] bg-gradient-green text-white font-medium text-[16px] rounded-[12px] w-full border-step-color border-[1px] font-sans"
              }
              type={"button"}
            >
              Mark as resolved
            </button>
          </div>
        </div>
        <div
          className={
            "h-[762px] bg-white rounded-[12px] w-full lg:w-2/3 flex flex-col"
          }
        >
          <div
            className={
              "flex justify-between items-center p-[18px] border-b-[1px] border-b-grey-20"
            }
          >
            <p className={"font-semiBold text-[16px]"}>Content</p>
            <div className={"p-[10px] px-[14px] border-[1px] rounded-[12px]"} onClick={handleDelte}>
              <p className={"font-medium text-[14px]"} >Delete</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
            {event ? (
              <div className="space-y-4">
                {/* Event Image */}
                <img
                  src={event.event_image}
                  alt={event.event_name}
                  className="w-full h-64 object-cover rounded-xl"
                />

                {/* Event Info */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {event.event_name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {event.category} • {event.location}
                  </p>
                </div>

                {/* Organizer */}
                <div className="flex items-center gap-3">
                  <img
                    src={event.owner.image}
                    alt={event.owner.fullname}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="text-gray-700 font-medium">
                    {event.owner.fullname}
                  </p>
                </div>

                {/* Date and Time */}
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Date:</strong> {event.event_date}
                  </p>
                  <p>
                    <strong>Time:</strong> {event.event_time}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(event.created_at).toLocaleString()}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-800">{event.description}</p>
              </div>
            ) : (
              <p className="text-center text-gray-500">No content available</p>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default ReportDetailsPage;
