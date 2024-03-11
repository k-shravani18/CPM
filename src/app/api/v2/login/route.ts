import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

/**
   * This method is used to generate a access token from keycloak
   * to login into the application .
   * @param req
   * {
   *  String username 
   *  String password
   *  String realm
   *  String client
   *  }
   * @return NextResponse{data} 
   */

export async function POST(req: Request) {

  const { username, password ,realm ,client} = await req.json()

  try {
     
    const params = new URLSearchParams();
    params.append("grant_type", process.env.NEXT_PUBLIC_SSO_GRANT_TYPE!)
    params.append("client_id", process.env.NEXT_PUBLIC_SSO_CLIENT!)
    params.append("client_secret", client)
   
    params.append("username", username)
    params.append("password", password)

    //logging into keycloak and generating the token 
    const response = await axios.post(`${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${realm}/protocol/openid-connect/token`, params)
    return NextResponse.json(response.data)
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }

}

