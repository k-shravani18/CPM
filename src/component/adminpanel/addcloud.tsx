import React, { useEffect, useState } from "react";
import style from "./styles.module.css";
import Image from "next/image";
import cloud from "../../../public/images/AdminPanel/cloud.svg";
import azure from "../../../public/images/AdminPanel/azure.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { toast } from "react-toastify";
interface FormValues {
  awsAccNo: string;
  // Add other AWS fields here
  azureAccNo: string;
  awsAccessKey: string;
  awsSecretKey: string;
  //awsResourceGroup: string;
  awsBusinessName: string;
  azureApplicationId: string;
  azureClientId: string;
  azureUsername: string;
  azurePassword: string;
  azureTenantId: string;
  azureBusinessName: string;
  check: boolean;
}
interface AddCloudProps {
  onSuccessMessage: () => void;
}

/**
   * This component renders addcloud tab in the adminPanel page
   */
const Addcloud = (props: AddCloudProps) => {
  //const [realm, setRealm] = useState('')
  const currentrealm = sessionStorage.getItem("realm"); // main realm
  //setRealm(currentrealm || '')
  //console.log(typeof currentrealm);
  const [realms, setRealms] = useState([]);
  const [error, setError] = useState(""); //incorrect credentials and emptyfields error
  const [userError, setUserError] = useState("");
  useEffect(() => {
    /**
   * This function is used to fetch realms from keycloak
   * @description the fetched realms will be set into the state realms.
   */
    const getRealms = async () => {
      try {
        const response = await fetch(`/api/v2/getRealms`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (response.status === 200) {
            return response.json().then((responseData) => {
              setRealms(responseData.data);
            });
          } else {
            setError("fetching realms failed");
          }
        });
      } catch (error) {
        console.error("Login failed:", error);
      }
    };
    getRealms();
  }, []);
  //console.log(realms);
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  const isUser = sessionStorage.getItem("isUser") === "true";
  const isSuperAdmin = sessionStorage.getItem("isSuperAdmin") === "true";
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("AWS"); // Set the initial selected option value
  //const [selectedBusinessName, setSelectedBusinessName] = useState("");

  const [formValues, setFormValues] = useState<FormValues>({
    awsAccNo: "",
    awsAccessKey: "",
    awsSecretKey: "",
    // awsResourceGroup: "",
    awsBusinessName: "",
    azureAccNo: "",
    azureApplicationId: "",
    azureClientId: "",
    azureUsername: "",
    azurePassword: "",
    azureTenantId: "",
    azureBusinessName: "",
    check: false,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [spinner, setSpinner] = useState(false);
 

  const handleChange = (e: any) => {
    const { name, value } = e.target;
     // Regular expression to match only alphabetic characters
  const regex = /^[a-zA-Z0-9_\-]*$/;

  if (regex.test(value)) {
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
    //setSelectedBusinessName(value);
  } else {
    setFormErrors({ ...formErrors, [name]: "Please enter only alphabetic characters" });
  }
   // setFormValues({ ...formValues, [name]: value });
   // setFormErrors({ ...formErrors, [name]: "" });
    // Check if the name attribute is related to the Business Name field
    /* if (name === "awsBusinessName" || name === "azureBusinessName") {
    setSelectedBusinessName(value);
  } */
  };
  //console.log(selectedBusinessName);
  // Function to handle the change of the select element
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    
    // Reset checkbox error when the select option changes

    // Swap the values of awsBusinessName and azureBusinessName
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        awsBusinessName: prevFormValues.azureBusinessName,
        azureBusinessName: prevFormValues.awsBusinessName,
      };
    });
    

    setFormErrors((prevErrors) => {
      return { ...prevErrors, check: "" };
    });
  };
  
  const handleChangeCheck = (e: any) => {
    setFormValues({ ...formValues, check: !formValues.check });
    setFormErrors({ ...formErrors, check: "" });
  };
  //console.log("awsBusinessName",awsBusinessName);
  const validateForm = (value: any): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};

    switch (selectedOption) {
      case "AWS":
        if (!value.awsAccNo) {
          errors.awsAccNo = "AWS Account Number is required";
        }
        if (!value.awsBusinessName) {
          errors.awsBusinessName = " AWS Business Name is required";
        }

        if (!value.awsAccessKey) {
          errors.awsAccessKey = "AWS AccessKey is required";
        }
        if (!value.awsSecretKey) {
          errors.awsSecretKey = "AWS SecretKey is required";
        }
        /*  if (!value.awsResourceGroup) {
          errors.awsResourceGroup = "AWS Resourcegroup is required";
        } */
        if (!value.check) {
          errors.check = "Please check the privacy policy checkbox";
        }
        break;
      case "Azure":
        if (!value.azureAccNo) {
          errors.azureAccNo = "Azure Account Number is required";
        }
        if (!value.azureBusinessName) {
          errors.azureBusinessName = "Business Name is required";
        }
        if (!value.azureApplicationId) {
          errors.azureApplicationId = "Azure ApplicationId is required";
        }
        if (!value.azureClientId) {
          errors.azureClientId = "Azure ClientId is required";
        }
        if (!value.azurePassword) {
          errors.azurePassword = "Azure Password is required";
        }
        if (!value.azureUsername) {
          errors.azureUsername = "Azure Username is required";
        }
        if (!value.azureTenantId) {
          errors.azureTenantId = "Azure TenantId is required";
        }
        if (!value.check) {
          errors.check = "Please check the privacy policy checkbox";
        }
      default:
        break;
    }
    //setFormErrors(errors);
    return errors;
    //setFormErrors(errors);
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
    try {
      let apiUrl = "";
      let addBusinessName = "";
      const body = {
        awsAccNo: formValues.awsAccNo,
        awsAccessKey: formValues.awsAccessKey,
        awsSecretKey: formValues.awsSecretKey,
        //awsResourceGroup: formValues.awsResourceGroup,
        awsBusinessName: formValues.awsBusinessName,
      };
      const body2 = {
        azureAccNo: formValues.azureAccNo,
        azureApplicationId: formValues.azureApplicationId,
        azureClientId: formValues.azureClientId,
        azureUsername: formValues.azureUsername,
        azurePassword: formValues.azurePassword,
        azureTenantId: formValues.azureTenantId,
        azureBusinessName: formValues.azureBusinessName,
      };
      // Use the correct API route for the axios.post call
      //const apiUrl = "/api/v2/addCloud";

      const username = process.env.NEXT_PUBLIC_AWX_USERNAME;
      const password = process.env.NEXT_PUBLIC_AWX_PASSWORD;
      const authString = `${username}:${password}`;
      const base64AuthString = Buffer.from(authString).toString("base64");
      const httpHeaders = {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64AuthString}`,
      };

      if (selectedOption === "AWS") {
        
        apiUrl = "/api/v2/addCloudAWS";
        //addBusinessName = "addBusinessName" + body.awsBusinessName.toUpperCase();
        const response = await fetch(apiUrl, {
          method: "post",
          headers: httpHeaders,
          body: JSON.stringify(body),
        });
        const result = await response.json();

        if (result.status === 201) {
          toast.success("Aws Cloud added successfully!");
          //setSuccessMessage("AWS cloud added successfully!");
        } else {
          throw new Error(result.error);
        }
      } else if (selectedOption === "Azure") {
        
        apiUrl = "/api/v2/addCloudAzure";
        //addBusinessName = "addBusinessName" + body2.azureBusinessName.toUpperCase();
        const response = await fetch(apiUrl, {
          method: "post",
          headers: httpHeaders,
          body: JSON.stringify(body2),
        });
        const result = await response.json();
        /* await axios.post(apiUrl, body2, {
          headers: httpHeaders,
        }); */
        if (result.status === 201) {
         // setSuccessMessage
          toast.success("Azure cloud added successfully!");
        } else {
          throw new Error(result.error);
        }
      }
      setTimeout(() => {
        toast.dismiss();
        setSpinner(false);
        setFormValues({
          awsAccNo: "",
          awsAccessKey: "",
          awsSecretKey: "",         
          awsBusinessName: "",
          azureAccNo: "",
          azureApplicationId: "",
          azureClientId: "",
          azureUsername: "",
          azurePassword: "",
          azureTenantId: "",
          azureBusinessName: "",
          check: false,
        });
        //toast.success("Business Added Successfully");
        router.push("/dashboard");
      }, 2500); // Display the success message for 3 seconds

            // Redirect or handle the response as needed
      //router.push("/");
    } catch (error: any) {
      //console.error(error);
      if (
        error.message ===
        "Authentication credentials were not provided. To establish a login session, visit /api/login/."
      ) {
        toast.error("Invalid Credentials");
        
        setTimeout(() => {
          toast.dismiss();
          setSpinner(false);
          setUserError("");
          setFormValues({
            awsAccNo: "",
            awsAccessKey: "",
            awsSecretKey: "",
           
            awsBusinessName: "",
            azureAccNo: "",
            azureApplicationId: "",
            azureClientId: "",
            azureUsername: "",
            azurePassword: "",
            azureTenantId: "",
            azureBusinessName: "",
            check: false,
          });
          //toast.success("Business Added Successfully");
          router.push("/dashboard");
        }, 2500); // Display the success message for 3 seconds
      }
        else if (
          error.message ===
          "You do not have permission to perform this action."
        ) {
          toast.error("You don't have permission to this");
          
          setTimeout(() => {
            toast.dismiss();
            setSpinner(false);
            setUserError("");
            setFormValues({
              awsAccNo: "",
              awsAccessKey: "",
              awsSecretKey: "",
             
              awsBusinessName: "",
              azureAccNo: "",
              azureApplicationId: "",
              azureClientId: "",
              azureUsername: "",
              azurePassword: "",
              azureTenantId: "",
              azureBusinessName: "",
              check: false,
            });
            //toast.success("Business Added Successfully");
            router.push("/dashboard");
          }, 2500);
        
      }
    } finally {
      setSpinner(false);
    }
  };

  return (
    <>
    
      <div>
    
     {spinner && (
        <div className={style["loading-overlay"]}>
          <Loading />
        </div>
      )}
        {/* form */}
        <form onSubmit={submitData}>
          {" "}
          {/*onSubmit={submitData}*/}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="mt-5">
              <div className="px-5">
                <label
                  htmlFor={`${
                    selectedOption === "Azure"
                      ? "azureBusinessName"
                      : "awsBusinessName"
                  }`}
                  className="text-black text-base font-medium"
                >
                  BusinessName
                </label>
                <select
                  id={`${
                    selectedOption === "Azure"
                      ? "azureBusinessName"
                      : "awsBusinessName"
                  }`}
                  className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${
                    formErrors[
                      selectedOption === "Azure"
                        ? "azureBusinessName"
                        : "awsBusinessName"
                    ]
                      ? "border-red-500"
                      : "border-neutral-200"
                  }
                  placeholder-stone-600 text-stone-700 text-sm font-normal`}
                  name={`${
                    selectedOption === "Azure"
                      ? "azureBusinessName"
                      : "awsBusinessName"
                  }`}
                  onChange={handleChange}
                >
                  <option value="">Select Business Name</option>
                  {/* <option value="BMCSL">BMCSL</option>
                  <option value="Testing">Testing</option> */}
                  {isAdmin && (
                    <option value={currentrealm as string}>
                      {currentrealm}
                    </option>
                  )}
                  {/*  {isUser && (<option value={currentrealm as string}>{currentrealm}</option>)} */}

                  {isSuperAdmin &&
                    realms.map((data: any, index) => {
                      return (
                        <option key={index} value={data}>
                          {data}
                        </option>
                      );
                    })}
                </select>
                <span className="text-red-500 text-sm block font-serif">
                  {
                    formErrors[
                      selectedOption === "Azure"
                        ? "azureBusinessName"
                        : "awsBusinessName"
                    ]
                  }
                </span>
                <label
                  htmlFor="selectcloud"
                  className="text-black text-base font-medium"
                >
                  Select Cloud
                </label>
                <select
                  id="selectcloud"
                  name="selectcloud"
                  className="w-full h-[42px] my-2 pl-3 bg-white rounded border border-neutral-200
                                      placeholder-stone-600 text-stone-700 text-sm font-normal"
                  onChange={handleSelectChange}
                  value={selectedOption}
                >
                  <option value="AWS">AWS</option>
                  <option value="Azure">Azure</option>
                  {/* <option value="VSphere">VSphere</option> */}
                </select>

                {/* <label htmlFor="subscription" className="text-black text-base font-medium">
                                          Subscription
                                      </label>
                                      <select id="subscription"
                                          className='w-full h-[42px] my-4 pl-3 bg-white rounded border border-neutral-200
                                      placeholder-stone-600 text-stone-700 text-sm font-normal'
                                      >
                                          <option value="">Select Subscription</option>
                                          <option value="subscription1">Subscription 1</option>
                                          <option value="subscription2">Subscription 2</option>
                                          <option value="subscriptionn">Subscription n</option>
                                      </select> */}

                <label
                  htmlFor={`${
                    selectedOption === "Azure" ? "azureAccNo" : "awsAccNo"
                  }`}
                  className="text-black text-base font-medium"
                >
                  {selectedOption === "Azure"
                    ? "Subscription Id"
                    : "AWS Account Name"}
                </label>
                <input
                  type="text"
                  autoComplete={`${
                    selectedOption === "Azure" ? "azureAccNo" : "awsAccNo"
                  }`}
                  name={`${
                    selectedOption === "Azure" ? "azureAccNo" : "awsAccNo"
                  }`}
                  id={`${
                    selectedOption === "Azure" ? "azureAccNo" : "awsAccNo"
                  }`}
                  className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${
                    formErrors[
                      selectedOption === "Azure" ? "azureAccNo" : "awsAccNo"
                    ]
                      ? "border-red-500"
                      : "border-neutral-200"
                  }
                      placeholder-stone-600 text-stone-700 text-sm font-normal `}
                  placeholder={`${
                    selectedOption === "Azure"
                      ? "Enter Subscription Id"
                      : "Enter Account Name"
                  }`}
                  // onChange={(e) => {`${selectedOption === "Azure" ? 'setAzureAccNo(e.target.value)':'setAwsAccNo(e.target.value)' }`}}
                  //onChange={(e)=>setAwsAccNo(e.target.value)}
                  // onChange={
                  //   selectedOption === "Azure"
                  //     ? (e) => setAzureAccNo(e.target.value)
                  //     : (e) => setAwsAccNo(e.target.value)
                  // }
                  onChange={handleChange}
                  value={
                    formValues[
                      selectedOption === "Azure" ? "azureAccNo" : "awsAccNo"
                    ]
                  }
                />

                <span className="text-red-500 text-sm block font-serif">
                  {
                    formErrors[
                      selectedOption === "Azure" ? "azureAccNo" : "awsAccNo"
                    ]
                  }
                </span>

                <label
                  htmlFor={`${
                    selectedOption === "Azure"
                      ? "azureApplicationId"
                      : "awsAccessKey"
                  }`}
                  className="text-black text-base font-medium"
                >
                  {selectedOption === "Azure"
                    ? "Application Id"
                    : "IAM UserID/Access Key"}
                </label>
                <input
                  type="text"
                  autoComplete={`${
                    selectedOption === "Azure"
                      ? "azureApplicationId"
                      : "awsAccessKey"
                  }`}
                  name={`${
                    selectedOption === "Azure"
                      ? "azureApplicationId"
                      : "awsAccessKey"
                  }`}
                  id={`${
                    selectedOption === "Azure"
                      ? "azureApplicationId"
                      : "awsAccessKey"
                  }`}
                  className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${
                    formErrors[
                      selectedOption === "Azure"
                        ? "azureApplicationId"
                        : "awsAccessKey"
                    ]
                      ? "border-red-500"
                      : "border-neutral-200"
                  }
                      placeholder-stone-600 text-stone-700 text-sm font-normal`}
                  placeholder={`${
                    selectedOption === "Azure"
                      ? "Enter Application Id"
                      : "Enter Access Key"
                  }`}
                  //onChange={(e) => setAwsAccessKey(e.target.value)}
                  /*  onChange={
                      selectedOption === "Azure"
                        ? (e) => setAzureApplicationId(e.target.value)
                        : (e) => setAwsAccessKey(e.target.value)
                    }  */
                  onChange={handleChange}
                  value={
                    formValues[
                      selectedOption === "Azure"
                        ? "azureApplicationId"
                        : "awsAccessKey"
                    ]
                  }
                />
                <span className="text-red-500 text-sm block font-serif">
                  {
                    formErrors[
                      selectedOption === "Azure"
                        ? "azureApplicationId"
                        : "awsAccessKey"
                    ]
                  }
                </span>
                <label
                  htmlFor={`${
                    selectedOption === "Azure"
                      ? "azureTenantId"
                      : "awsSecretKey"
                  }`}
                  className="text-black text-base font-medium"
                >
                  {selectedOption === "Azure"
                    ? "Tenant Id"
                    : "Password/Secret Key"}
                </label>
                <input
                  type="text"
                  autoComplete={`${
                    selectedOption === "Azure"
                      ? "azureTenantId"
                      : "awsSecretKey"
                  }`}
                  name={`${
                    selectedOption === "Azure"
                      ? "azureTenantId"
                      : "awsSecretKey"
                  }`}
                  id={`${
                    selectedOption === "Azure"
                      ? "azureTenantId"
                      : "awsSecretKey"
                  }`}
                  className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${
                    formErrors[
                      selectedOption === "Azure"
                        ? "azureTenantId"
                        : "awsSecretKey"
                    ]
                      ? "border-red-500"
                      : "border-neutral-200"
                  }
                      placeholder-stone-600 text-stone-700 text-sm font-normal`}
                  placeholder={`${
                    selectedOption === "Azure"
                      ? "Tenant Id"
                      : "Enter Secret Key"
                  }`}
                  //onChange={(e) => setAwsSecretKey(e.target.value)}
                  /*  onChange={
                      selectedOption === "Azure"
                        ? (e) => setAzureTenantId(e.target.value)
                        : (e) => setAwsSecretKey(e.target.value)
                    }  */
                  onChange={handleChange}
                  value={
                    formValues[
                      selectedOption === "Azure"
                        ? "azureTenantId"
                        : "awsSecretKey"
                    ]
                  }
                />
                <span className="text-red-500 text-sm block font-serif">
                  {
                    formErrors[
                      selectedOption === "Azure"
                        ? "azureTenantId"
                        : "awsSecretKey"
                    ]
                  }
                </span>

                {selectedOption === "Azure" && (
                  <>
                    <label
                      htmlFor="azureUsername"
                      className="text-black text-base font-medium"
                    >
                      AD Username
                    </label>

                    <input
                      type="text"
                      autoComplete="azureUsername"
                      name="azureUsername"
                      id="azureUsername"
                      className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${
                        formErrors.azureUsername
                          ? "border-red-500"
                          : "border-neutral-200"
                      }
                      placeholder-stone-600 text-stone-700 text-sm font-normal`}
                      placeholder="Enter AD Username"
                      onChange={handleChange}
                      value={formValues.azureUsername}
                    />
                    <span className="text-red-500 text-sm block font-serif">
                      {formErrors.azureUsername}
                    </span>

                    <label
                      htmlFor="azurePassword"
                      className="text-black text-base font-medium"
                    >
                      AD Password
                    </label>
                    <input
                      type="text"
                      autoComplete="azurePassword"
                      name="azurePassword"
                      id="azurePassword"
                      className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${
                        formErrors.azurePassword
                          ? "border-red-500"
                          : "border-neutral-200"
                      }
                    placeholder-stone-600 text-stone-700 text-sm font-normal`}
                      placeholder="Enter AD Password"
                      //onChange={(e) => setAzurePassword(e.target.value)}
                      onChange={handleChange}
                      value={formValues.azurePassword}
                    />
                    <span className="text-red-500 text-sm block font-serif">
                      {formErrors.azurePassword}
                    </span>
                    <label
                      htmlFor="azureClientId"
                      className="text-black text-base font-medium"
                    >
                      Client Id
                    </label>
                    <input
                      type="text"
                      autoComplete="azureClientId"
                      name="azureClientId"
                      id="azureClientId"
                      className={`w-full h-[42px] my-2 pl-3 bg-white rounded border ${
                        formErrors.azureClientId
                          ? "border-red-500"
                          : "border-neutral-200"
                      }
                    placeholder-stone-600 text-stone-700 text-sm font-normal`}
                      placeholder="Enter ClientId"
                      //onChange={(e) => setAzureClientId(e.target.value)}
                      onChange={handleChange}
                      value={formValues.azureClientId}
                    />
                    <span className="text-red-500 text-sm block font-serif">
                      {formErrors.azureClientId}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* image */}
            <div className="flex-grow-1 p-20 hidden lg:block">
              {selectedOption === "Azure" ? (
                <Image className="w-full h-auto " alt="#" src={azure} />
              ) : (
                <Image className="w-full h-auto " alt="#" src={cloud} />
              )}
            </div>
          </div>
         
          {/* Checkbox */}
          <div className="flex items-center justify-center mt-12">
            <input
              type="checkbox"
              id="confirmInfo"
              className="w-6 h-6 mr-3 bg-white border border-neutral-400"
              name="check"
              checked={formValues.check}
              onChange={handleChangeCheck}
            />
            <label
              htmlFor="confirmInfo"
              className="text-black text-sm font-medium"
            >
              I confirm that the information provided is accurate
            </label>
          </div>
          <span className="text-red-500 text-sm flex justify-center my-3 font-serif">
            {formErrors.check}
          </span>
          {/* Button */}
          <div className="flex items-center justify-center lg:justify-end mt-7 mx-2 md:mx-5">
            <button className="ml-[30px] p-2.5 bg-red-700 rounded justify-center items-center gap-2.5 inline-flex">
              <span className="text-center text-white text-sm font-bold">
                Add Cloud
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Addcloud;
