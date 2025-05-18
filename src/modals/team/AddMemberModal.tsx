import React, { useState } from "react";
import { XIcon } from "lucide-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addTeamMember } from "@/features/team/team.slice";
import { updateToastifyReducer } from "@/redux/toastifySlice";

interface BalanceModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddMember: React.FC<BalanceModalProps> = ({ isOpen, toggle }) => {
  const [isLoading, setLoading] = useState(false);
  const { authToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const prodSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    first_name: yup
      .string()

      .required("first name is required"),
    last_name: yup
      .string()

      .required("last name is required"),
    password: yup.string().min(8).required("Password is required"),
    role: yup
      .string()

      .required("role is required"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: prodSchema,
    onSubmit: (values) => {
      setLoading(true);
      dispatch(
        addTeamMember({
          token: authToken || "",
          email: values.email,
          name: `${values.first_name} ${values.last_name}`,
          password: values.password,
          role: values.role,
        })
      )
        .then((res) => {
          setLoading(false);

          if (res.payload.status) {
            setLoading(false);

            dispatch(
              updateToastifyReducer({
                show: true,
                message: `Success `,
                type: "success",
              })
            );
          } else {
            setLoading(false);
            dispatch(
              updateToastifyReducer({
                show: true,
                message: res.payload.message || `Something went wrong`,
                type: "error",
              })
            );
          }
        })
        .catch((res) => {
          setLoading(false);
          dispatch(
            updateToastifyReducer({
              show: true,
              message: res.payload.message || `Something went wrong`,
              type: "error",
            })
          );
        });
    },
  });
  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 items-center justify-center z-50 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="w-[360px] bg-white pt-[16px] pb-[4px] rounded-[12px]">
        <div className={"py-[4px] px-[16px]"}>
          <div className="flex justify-between items-center">
            <p className="font-sans font-semibold text-[18px] leading-[27px]">
              Add Admin
            </p>
            <div className="cursor-pointer" onClick={toggle}>
              <XIcon />
            </div>
          </div>
        </div>
        <div className={"py-[16px] flex flex-col gap-[16px] px-[16px]"}>
          <div className="grid gap-2">
            <Label
              htmlFor="first_name"
              className="font-sans text-text-grey font-normal text-[14px]"
            >
              First name
            </Label>
            <Input
              id="first_name"
              type="text"
              placeholder=""
              className="h-12 rounded-xl bg-light-grey form-font border-0"
              value={formik.values.first_name}
              onChange={formik.handleChange("first_name")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="last_name"
              className="font-sans text-text-grey font-normal text-[14px]"
            >
              Last name
            </Label>
            <Input
              id="last_name"
              type="text"
              placeholder=""
              className="h-12 rounded-xl bg-light-grey form-font border-0"
              value={formik.values.last_name}
              onChange={formik.handleChange("last_name")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="email"
              className="font-sans text-text-grey font-normal text-[14px]"
            >
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. Janedoe@example.com"
              className="h-12 rounded-xl bg-light-grey form-font border-0"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="password"
              className="font-sans text-text-grey font-normal text-[14px]"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="h-12 rounded-xl bg-light-grey form-font border-0"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="role"
              className="font-sans text-text-grey font-normal text-[14px]"
            >
              Role
            </Label>
            <Input
              id="role"
              type="text"
              className="h-12 rounded-xl bg-light-grey form-font border-0"
              value={formik.values.role}
              onChange={formik.handleChange("role")}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className={"flex justify-between gap-[16px] px-[16px] pb-[10px]"}>
          <button
            onClick={toggle}
            className={
              "border-[1px] border-light-grey-50 px-[48px] py-[11px] rounded-[12px] bg-white w-full"
            }
          >
            <p className={"text-black text-[16px] font-medium"}>Cancel</p>
          </button>
          <button
            onClick={() => formik.handleSubmit()}
            className={
              "border-[1px] border-step-color px-[48px] py-[11px] rounded-[12px] bg-gradient-green w-full"
            }
          >
            <p className={"text-[16px] font-medium text-white"}>Confirm</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
