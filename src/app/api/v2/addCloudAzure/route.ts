import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
 
  const payload = await req.json();
  try{
  const data = JSON.stringify({
    extra_vars: {
      "Name": payload.azureAccNo,
      "description": payload.azureApplicationId,
      "organization": payload.azureBusinessName,
      "subscription": payload.azureUsername, 
      "client": payload.azureClientId, 
      "secret": payload.azurePassword,
      "tenant": payload.azureTenantId
    },
  });
  //console.log("data", data);
  const api_url = process.env.NEXT_PUBLIC_AWX_AZURE_API_URL;
  const username = process.env.NEXT_PUBLIC_AWX_USERNAME;
  const password = process.env.NEXT_PUBLIC_AWX_PASSWORD;
  const authString = `${username}:${password}`;
  const base64AuthString = Buffer.from(authString).toString("base64");
  const httpHeaders = {
    "Content-Type": "application/json",
    Authorization: `Basic ${base64AuthString}`,
  };
 
 
  const result = await fetch(`${api_url}`, {
    method: "POST",
    headers: httpHeaders,
    body: data,
    //agent: httpsAgent,
  });
 
if (result.status === 201) { //status === 201
  const responseBody = await result.json();
  return NextResponse.json({status:result.status, data:responseBody, message:"success"});
} else  {
  const errorResponse = await result.json();
  console.log(errorResponse);
  let errorMessage;

  if (errorResponse.name && errorResponse.name.length > 0) {
    errorMessage = errorResponse.name[0]; // Show the 'name' error message
  } else {//if (errorResponse.detail && errorResponse.detail.length > 0) {
    errorMessage = errorResponse.detail; // Show the 'detail' error message
  }
  return NextResponse.json({ status: result.status, error: errorMessage , message:"error"});
}
} catch (error) {
return NextResponse.json({ status: 500, error: "Internal Server Error" });
}
}

