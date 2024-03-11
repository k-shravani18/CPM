import React, { useState } from "react";
import Image from "next/image";
import adminpanel from "../../../public/images/AdminPanel/adminpanel.svg";
import { useRouter } from "next/navigation";
import style from "./styles.module.css";
import { toast } from "react-toastify";
import Loading from "@/app/loading";


interface FormValues {
  businessType: string;
  businessOwner: string;
  businessName: string;
  applicationOwner: string;
  businessLocation: string;
  confirmInfo: boolean;
}
/**
   * This component renders addbusiness tab in the adminPanel page
   */
const Addbusiness = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>({
    businessType: "",
    businessOwner: "",
    businessName: "",
    applicationOwner: "",
    businessLocation: "",
    confirmInfo: false,
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [spinner, setSpinner] = useState(false);

  const [userError, setUserError] = useState("");
  //const [firstApiResponse, setFirstApiResponse] = useState("");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const regex = /^[a-zA-Z0-9_\-]*$/;

    if (regex.test(value)) {
      setFormValues({ ...formValues, [name]: value });
      setFormErrors({ ...formErrors, [name]: "" });
    } else {
      setFormErrors({
        ...formErrors,
        [name]: "Please enter only alphabetic characters",
      });
    }
  };
  const handleChangeCheck = (e: any) => {
    setFormValues({ ...formValues, confirmInfo: !formValues.confirmInfo });
    setFormErrors({ ...formErrors, check: "" });
  };
  const validateForm = (value: any) => {
    const errors: { [key: string]: string } = {};

    if (!value.businessType) {
      errors.businessType = "Business Type is required";
    }
    if (!value.businessLocation) {
      errors.businessLocation = "Business Location is required";
    }

    if (!value.businessName) {
      errors.businessName = "Business Name is required";
    }
    if (!value.businessOwner) {
      errors.businessOwner = "Business Owner is required";
    }
    if (!value.applicationOwner) {
      errors.applicationOwner = "Application Owner is required";
    }
    if (!value.confirmInfo) {
      errors.confirmInfo = "Please check the privacy policy checkbox";
    }
    return errors;
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const error = validateForm(formValues);

    if (Object.keys(error).length) {
      //console.log("clicked");
      setFormErrors(error);
      return;
    }
    setSpinner(true);
    //try {
    // console.log("submitData called");
    let apiUrl = "";
    const body = {
      businessType: formValues.businessType,
      businessName: formValues.businessName,
      businessOwner: formValues.businessOwner,
      applicationOwner: formValues.applicationOwner,
      businessLocation: formValues.businessLocation,
    };

    // Use the correct API route for the axios.post call
    const username = process.env.NEXT_PUBLIC_AWX_USERNAME;
    const password = process.env.NEXT_PUBLIC_AWX_PASSWORD;
    const authString = `${username}:${password}`;
    const base64AuthString = Buffer.from(authString).toString("base64");
    const httpHeaders = {
      "Content-Type": "application/json",
      Authorization: `Basic ${base64AuthString}`,
    };
    let first_api_url = "/api/v2/createRealm";
    fetch(`/api/v2/createRealm`, {
      method: "post",
      headers: httpHeaders,
      body: JSON.stringify(body),
    });

    apiUrl = "/api/v2/addBusiness";

    try {
      const response = await fetch(`${apiUrl}`, {
        method: "post",
        headers: httpHeaders,
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (result.status === 201) {
        toast.success("Business Added Successfully");
        setTimeout(() => {
          toast.dismiss();
          setSpinner(false);
          setFormValues({
            businessLocation: "",
            businessName: "",
            businessOwner: "",
            businessType: "",
            applicationOwner: "",
            confirmInfo: false,
          });
          //toast.success("Business Added Successfully");
          router.push("/adminPanel");
        }, 2500); // Display the success message for 3 seconds
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      //console.error("Error:", error);
      if (error.message === "Organization with this Name already exists.") {
        //setUserError('Business Name already exists')
        setFormErrors({
          ...formErrors,
          businessName: "Business Name already exists",
        });
        toast.error("Business Name already exists");
        setTimeout(() => {
          toast.dismiss();
          setSpinner(false);
          setFormErrors({
            ...formErrors,
            businessName: "",
          });
          setFormValues({
            businessLocation: "",
            businessName: "",
            businessOwner: "",
            businessType: "",
            applicationOwner: "",
            confirmInfo: false,
          });
          //toast.success("Business Added Successfully");
          router.push("/adminPanel");
        }, 2500); // Display the success message for 3 seconds
      } else if (
        error.message ===
        "Authentication credentials were not provided. To establish a login session, visit /api/login/."
      ) {
        toast.error("Invalid Credentials");
        setTimeout(() => {
          toast.dismiss();
          setSpinner(false);

          setFormValues({
            businessLocation: "",
            businessName: "",
            businessOwner: "",
            businessType: "",
            applicationOwner: "",
            confirmInfo: false,
          });
          //toast.success("Business Added Successfully");
          router.push("/adminPanel");
        }, 2500); // Display the success message for 3 seconds
      }
    }
  };

  return (
    <>
      {spinner && (
        <div className={style["loading-overlay"]}>
          <Loading />
        </div>
      )}
      <form onSubmit={submitData}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="mt-5">
            <div className="px-5">
              <label
                htmlFor="businessName"
                className="text-black text-base font-medium"
              >
                Business Name
              </label>
              <input
                type="text"
                autoComplete="businessName"
                id="businessName"
                className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${
                  formErrors.businessName
                    ? "border-red-500"
                    : "border-neutral-200"
                }
                 placeholder-stone-600 text-stone-700 text-sm font-normal`}
                placeholder="Enter the Business Name"
                onChange={handleChange}
                value={formValues.businessName}
                name="businessName"
              />
              <span className="text-red-500 text-sm block font-serif">
                {formErrors.businessName}
              </span>
              <label
                htmlFor="businessType"
                className="text-black text-base font-medium"
              >
                Business Type
              </label>
              <input
                type="text"
                autoComplete="businessType"
                name="businessType"
                id="businessType"
                className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${
                  formErrors.businessType
                    ? "border-red-500"
                    : "border-neutral-200"
                }
                 placeholder-stone-600 text-stone-700 text-sm font-normal`}
                placeholder="Enter Business Type"
                onChange={handleChange}
                value={formValues.businessType}
              />
              <span className="text-red-500 text-sm block font-serif">
                {formErrors.businessType}
              </span>
              <label
                htmlFor="businessOwner"
                className="text-black text-base font-medium"
              >
                Business Owner
              </label>
              <input
                type="text"
                autoComplete="businessOwner"
                id="businessOwner"
                className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${
                  formErrors.businessOwner
                    ? "border-red-500"
                    : "border-neutral-200"
                }
                 placeholder-stone-600 text-stone-700 text-sm font-normal`}
                placeholder="Enter Business Owner"
                onChange={handleChange}
                value={formValues.businessOwner}
                name="businessOwner"
              />
              <span className="text-red-500 text-sm block font-serif">
                {formErrors.businessOwner}
              </span>
              <label
                htmlFor="applicationOwner"
                className="text-black text-base font-medium"
              >
                Application Owner
              </label>
              <input
                type="text"
                autoComplete="applicationOwner"
                id="applicationOwner"
                className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${
                  formErrors.applicationOwner
                    ? "border-red-500"
                    : "border-neutral-200"
                }
                 placeholder-stone-600 text-stone-700 text-sm font-normal`}
                placeholder="Enter Application Owner"
                onChange={handleChange}
                value={formValues.applicationOwner}
                name="applicationOwner"
              />
              <span className="text-red-500 text-sm block font-serif">
                {formErrors.applicationOwner}
              </span>
              <label
                htmlFor="businessLocation"
                className="text-black text-base font-medium"
              >
                Business Location
              </label>
              <input
                type="text"
                autoComplete="businessLocation"
                id="businessLocation"
                className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${
                  formErrors.businessLocation
                    ? "border-red-500"
                    : "border-neutral-200"
                }
                 placeholder-stone-600 text-stone-700 text-sm font-normal`}
                placeholder="Enter Business Location"
                onChange={handleChange}
                value={formValues.businessLocation}
                name="businessLocation"
              />
              <span className="text-red-500 text-sm block font-serif">
                {formErrors.businessLocation}
              </span>
            </div>
          </div>
          {/* image */}
          <div className="flex-grow-1 p-20 hidden lg:block">
            <Image
              className="w-full h-auto mt-[13px]"
              alt="#"
              src={adminpanel}
            />
          </div>
        </div>
       

        {/* Checkbox */}

        <div className="flex items-center justify-center mt-12">
          <input
            type="checkbox"
            name="confirmInfo"
            id="confirmInfo"
            checked={formValues.confirmInfo}
            onChange={handleChangeCheck}
            className="w-6 h-6 mr-3 bg-white border border-neutral-400"
          />
          <label
            htmlFor="confirmInfo"
            className="text-black text-sm font-medium"
          >
            I confirm that the information provided is accurate
          </label>
        </div>

        <span className="text-red-500 text-sm flex justify-center my-3 font-serif">
          {formErrors.confirmInfo}
        </span>
        {/* Button */}
        <div className="flex items-center justify-center lg:justify-end mt-7 mx-2 md:mx-5">
          <button className="ml-[30px] p-2.5 bg-red-700 rounded justify-center items-center gap-2.5 inline-flex">
            <span className="text-center text-white text-sm font-bold">
              Add Business
            </span>
          </button>
        </div>
      </form>
    </>
  );
};

export default Addbusiness;
