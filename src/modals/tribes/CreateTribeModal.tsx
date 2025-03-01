import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { XIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CreateTribeModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const CreateTribeModal = ({ isOpen, toggle }: CreateTribeModalProps) => {
  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 items-center justify-center z-50 ${!isOpen ? "hidden" : "flex"}`}>
      <form className="flex flex-col">
        <div className="bg-white rounded-lg shadow-lg w-full tablet:w-[640px] p-6 px-[48px] pb-[48px] flex flex-col h-screen tablet:h-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[8px]">
              <XIcon onClick={toggle} className="cursor-pointer" />
              <p className="font-semiBold text-[18px]">Create Tribe</p>
            </div>
            <div className="hidden tablet:block">{/* <FormikButton title="Create tribe" error={formik.isValid} loading={formik.isSubmitting} classes="px-[14px] p-[10px] rounded-[12px] border-step-color" /> */}</div>
          </div>
          <div className="flex justify-center mt-[48px] tablet:mt-[24px]">
            {/* {
                                image ? (
                                    <Image src={image} alt="upload" width={89} height={83} className="border-[1px] cursor-pointer w-[89px] h-[89px] rounded-[24px]" onClick={handleImageClick} />
                                ) : (
                                    <Image src={"/images/upload.png"} alt="upload" width={89} height={83} className="cursor-pointer" onClick={handleImageClick} />
                                )
                            } */}
            <Image src={"/images/upload.png"} alt="upload" width={89} height={83} className="cursor-pointer" />
            <input
              type="file"
              // ref={fileInputRef}
              style={{ display: "none" }}
              // onChange={handleFileChange}
            />
          </div>
          <div className="mt-[16px] flex flex-col">
            <div className="grid gap-2">
              <Label htmlFor="tribe-name" className="text-[14px] font-sans font-normal leading-[16.8px] text-text-grey">
                Tribe name
              </Label>
              <Input
                id="tribe-name"
                type="text"
                className="h-[48px] rounded-xl bg-light_grey form-font border-0"
                // value={formik.values.tribe_name}
                // onChange={(e: any) => {
                //     formik.setFieldValue("tribe_name", e.target.value)
                // }}
              />
            </div>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="tribe-name" className="text-[14px] font-sans font-normal leading-[16.8px] text-text-grey">
                Category
              </Label>
              <Select
              // value={formik.values.category}
              // onValueChange={(value) => {
              //     formik.setFieldValue("category", value)
              // }}
              >
                <SelectTrigger className="bg-light_grey rounded-xl border-0 h-[48px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="form-font">
                  {/* {
                                            tribe_cat?.categories?.map((category: any, index: number) => (
                                                <SelectItem value={category?.name}
                                                            key={index}>{category?.name}</SelectItem>
                                            ))
                                        } */}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 mt-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="description" className="text-[14px] font-sans font-normal leading-[16.8px] text-text-grey">
                  Description
                </Label>
                <p className="font-normal text-text-grey text-[12px]">100 characters</p>
              </div>
              <Textarea
                id="description"
                className="rounded-xl bg-light_grey form-font border-0 h-[91px] resize-none"
                placeholder="A short bio about yourself..."
                // value={formik.values.description}
                // onChange={(e: any) => {
                //     formik.setFieldValue("description", e.target.value)
                // }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTribeModal;
