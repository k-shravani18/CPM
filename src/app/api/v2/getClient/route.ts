import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

/**
   * This method is used to get Client details i.e, client_secret.
   * @param req 
   * {
   *   String  realm : Name of the realm.
   * } 
   * @return NextResponse{data:client_secret}.
   */
export async function POST(req: Request) {
  const { realm } = await req.json()
  try {

    const params = new URLSearchParams();
    params.append("grant_type", `${process.env.NEXT_PUBLIC_SSO_GRANT_TYPE}`)
    params.append("client_id", `${process.env.NEXT_PUBLIC_SSO_CLIENT_ID}`)
    params.append("username", `${process.env.NEXT_PUBLIC_SSO_USERNAME}`)
    params.append("password", `${process.env.NEXT_PUBLIC_SSO_PASSWORD}`)

    //generating token for master realm
    const masterResponse = await axios.post(`${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_SSO_REALM}/protocol/openid-connect/token`, params)
    const access_token = masterResponse.data.access_token

    //retrieving client details
    const response = await axios.get(`${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/admin/realms/${realm}/clients`, {
      headers: {
        Authorization:
          `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    //the following are to map clientId to clientSecret from response
    const clientId = response.data.map(({ clientId }: any) => clientId);
    const secret = response.data.map(({ secret }: any) => secret);

    // Find the index of "abg" in the clientId array
    const index = clientId.indexOf(`${process.env.NEXT_PUBLIC_SSO_CLIENT}`)
    const abgSecret = (index !== -1) ? secret[index] : "Client ID 'abg' not found."

    return NextResponse.json({ data: abgSecret })

  } catch (error) {
    console.log(error);

  }
}
