"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { ChevronDown, ChevronRight, PrinterIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getPlanSubscription } from "@/features/transaction/transaction.slice";
import { capitalizeWords } from "@/utils/helper";
import PaginationComp from "@/components/global/Pagination";

function SubscriptionDetailsPage({}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
      const router = useRouter()

  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { authToken } = useSelector((state: RootState) => state.auth);
  const { loading, subscription } = useSelector(
    (state: RootState) => state.transaction
  ) as { subscription: any; loading: boolean };

 

  const id = params.id
    ? Array.isArray(params.id)
      ? parseInt(params.id[0])
      : parseInt(params.id)
    : undefined;

  useEffect(() => {
    if (authToken && id) {
      dispatch(getPlanSubscription({ token: authToken, id }));
    }
  }, []);

  // Calculate total pages based on the data length and perPage value
  const totalPages = Math.ceil(subscription?.history?.length / perPage);

  // Determine the start and end indices for slicing the data array
  const startIndex = (currentPage - 1) * perPage;
  const paginatedData = subscription?.history?.slice(
    startIndex,
    startIndex + perPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const printCSV = () => {
    if (!subscription?.history || subscription.history.length === 0) {
      alert("No data available to export");
      return;
    }

    // Define CSV headers
    const headers = [
      "ID",
      "Transaction ID",
      "User ID",
      "Amount",
      "Full Name",
      "Plan",
      "Status",
      "Created At",
    ];

    // Convert data to CSV rows
    const csvRows = [
      headers.join(","), // Header row
      ...subscription.history.map((item: any) => {
        return [
          item.id,
          item.txn_id,
          item.user_id,
          item.amount,
          `"${item.fullname}"`, // Wrap in quotes to handle commas in names
          `"${item.plan}"`,
          item.status,
          `"${item.created_at}"`,
        ].join(",");
      }),
    ];

    // Create CSV content
    const csvContent = csvRows.join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Set up download link
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `payment_history_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";

    // Append to document, trigger download and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  console.log("subscription", subscription)
  return (
    <MainLayout>
      <section className="p-4 md:p-5 flex lg:flex-col flex-row gap-4 md:gap-5 w-full overflow-x-hidden max-w-full">
        {/* User Info Card */}
        <div className="w-full lg:w-1/3 bg-white p-4 md:p-6 flex flex-col gap-4 md:gap-5 rounded-xl h-fit">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <div className="min-w-20 sm:w-28">
              <p className="text-text-grey text-xs font-medium">Full name:</p>
            </div>
            <div className="flex flex-wrap gap-1">
              <p className="text-sm font-medium">
                {subscription?.info?.fullname}
              </p>
              <p className="cursor-pointer font-medium text-sm text-light-green" 
              onClick={() => router.push(`/users/${subscription?.info?.user_id}`)}
              >
                View profile
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <div className="min-w-20 sm:w-28">
              <p className="text-text-grey text-xs font-medium">
                Transaction Id:
              </p>
            </div>
            <p className="text-sm font-medium break-all">
              {subscription?.info?.txn_id}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <div className="min-w-20 sm:w-28">
              <p className="text-text-grey text-xs font-medium">
                Account Plan:
              </p>
            </div>
            <p className="text-sm font-medium">{subscription?.info?.plan}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <div className="min-w-20 sm:w-28">
              <p className="text-text-grey text-xs font-medium">Amount:</p>
            </div>
            <p className="text-sm font-medium">N{subscription?.info?.amount}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <div className="min-w-20 sm:w-28">
              <p className="text-text-grey text-xs font-medium">
                Subscription Type: 
              </p>
            </div>
            <p className="text-sm font-medium">{subscription?.history[0].subscription_type}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <div className="min-w-20 sm:w-28">
              <p className="text-text-grey text-xs font-medium">Date Paid:</p>
            </div>
            <p className="text-sm font-medium">
              {subscription?.history[0]?.created_at || null}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <div className="min-w-20 sm:w-28">
              <p className="text-text-grey text-xs font-medium">Status:</p>
            </div>
            <p className="text-sm font-medium text-light-green-70">
              {capitalizeWords(subscription?.info?.status)}
            </p>
          </div>
        </div>

        {/* Account Plan and Payment History */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="bg-white rounded-t-xl overflow-hidden">
            <div className="p-4 md:p-6 border-b border-b-grey-20 flex justify-between items-center">
              <p className="text-base font-semibold">Account plan</p>
              <div
                className="flex gap-2 items-center border border-light-grey-50 px-2 md:px-3 py-2 rounded-xl cursor-pointer"
                onClick={printCSV}
              >
                <PrinterIcon className="w-4 md:w-5" />
                <p className="font-medium text-sm md:text-base text-black-light">
                  Print
                </p>
              </div>
            </div>

            <div className="p-4 md:p-6 flex flex-col gap-6 md:gap-10">
              {/* Premium Plan Card */}
              <div className="flex flex-col px-4 md:px-6 py-6 md:py-8 gap-2 border-b-4 border-b-step-color bg-green-tint rounded-xl">
                <p className="text-mid-green font-semibold text-base">
                  {/* PREMIUM */}
                  {subscription?.info?.plan}
                </p>
                <p className="font-bold text-xl md:text-2xl">
                  ₦{subscription?.plan?.cost}
                </p>
                <p className="p-2 rounded-lg bg-light-green-50 text-xs md:text-sm w-fit">
                  Renews {subscription?.plan?.renews}
                </p>
              </div>

              {/* Payment History */}
              <div className="w-full">
                <p className="font-semibold text-sm mb-3">Payment history</p>
                <div className="overflow-x-auto w-full pb-2">
                  <table className="w-full min-w-max">
                    <tbody>
                      {subscription?.history.map((item: any, index: any) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 md:py-4 px-2 md:px-3 text-xs md:text-sm font-normal text-light-black whitespace-nowrap">
                            {item.txn_id}
                          </td>
                          <td className="py-3 md:py-4 px-2 md:px-3 text-xs md:text-sm font-semibold text-light-black whitespace-nowrap">
                            {item.plan}
                          </td>
                          <td className="py-3 md:py-4 px-2 md:px-3 text-xs md:text-sm font-normal text-light-black whitespace-nowrap">
                            {item?.created_at}
                          </td>
                          <td className="py-3 md:py-4 px-2 md:px-3 text-xs md:text-sm font-normal text-light-black whitespace-nowrap">
                            N {item?.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-2">
            <PaginationComp
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              perPage={perPage}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default SubscriptionDetailsPage;
