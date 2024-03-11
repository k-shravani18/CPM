import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

/**
   * This method is used to fetch all the realms from keycloak.
   * @param req
   * @return NextResponse{data:<List> All Realms} 
   */
export async function GET(req: Request) {

  try {

    const params = new URLSearchParams();
    params.append("grant_type", `${process.env.NEXT_PUBLIC_SSO_GRANT_TYPE}`)
    params.append("client_id", `${process.env.NEXT_PUBLIC_SSO_CLIENT_ID}`)
    params.append("username", `${process.env.NEXT_PUBLIC_SSO_USERNAME}`)
    params.append("password", `${process.env.NEXT_PUBLIC_SSO_PASSWORD}`)

    //generating token for master realm from keycloak
    const masterResponse = await axios.post(`${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_SSO_REALM}/protocol/openid-connect/token`, params)
    const access_token = masterResponse.data.access_token

    //fetching all the realms from keycloak 
    const response = await axios.get(`${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/admin/realms`, {
      headers: {
        Authorization:
          `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });
    const realms = response.data.map(({ realm }: any) => {
      return realm

    })

    return NextResponse.json({ data: realms })

  } catch (error) {
    console.log(error);

  }
}
