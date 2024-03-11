import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

/**
	 * This method is used to create a realm in keycloak.
	 * @param req 
   * {
   *   String  businessName : The business for which the realm is being created.
   * } 
	 * @return NextResponse{message,statuscode}.
	 */

export async function POST(req: Request) {
  const  payload  = await req.json();
  try {
    
    const params = new URLSearchParams();
    params.append("grant_type", `${process.env.NEXT_PUBLIC_SSO_GRANT_TYPE}`)
    params.append("client_id", `${process.env.NEXT_PUBLIC_SSO_CLIENT_ID}`)
    params.append("username", `${process.env.NEXT_PUBLIC_SSO_USERNAME}`)
    params.append("password", `${process.env.NEXT_PUBLIC_SSO_PASSWORD}`)

    //generating token for master realm from keycloak
    const masterResponse =  await axios.post(`${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_SSO_REALM}/protocol/openid-connect/token`, params)
    const access_token = masterResponse.data.access_token

    const data = {
        "id": payload.businessName,
        "realm":payload.businessName,
        "enabled": false
    }
    //creating realm in keycloak
    const response = await axios.post(`${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/admin/realms`, data, {
      headers: {
        Authorization:
          `Bearer ${access_token}`,
          'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
      return NextResponse.json({ message: 'Realm Created Successfully' }, { status: response.status });
    } 
    else{
      if (response.status === 409) {
        return NextResponse.json({ error: 'Realm exists' }, { status: response.status });
      }
    }
 
   } catch (error) {
      if (axios.isAxiosError(error)) {
         if (error.response?.data?.errorMessage) {
          return NextResponse.json({ error: error.response.data.errorMessage }, { status: error.response.status });
        }
      }
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
