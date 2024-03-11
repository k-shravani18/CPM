import { NextResponse } from 'next/server';
import axios from 'axios';

/**
   * This method is used to logout from the application .
   * @param req
   * {
   *  String refresh_token 
   *  String realm
   *  String client
   *  }
   * @return NextResponse{204 No Content} 
   */
export async function POST(req: Request) {
  const { refresh_token ,realm , client} = await req.json();
  
  try {  
    const params = new URLSearchParams()
    params.append("client_id", process.env.NEXT_PUBLIC_SSO_CLIENT!)
    params.append("client_secret", client)
    params.append("refresh_token", refresh_token)
    
    //logging out from application 
    const response = await axios.post(`${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${realm}/protocol/openid-connect/logout`,params)
    
    if (response.status === 204) {
        return new Response(null, { status: 204 });
      } else {
        return NextResponse.json({ error: 'Logout failed' }, { status: response.status });
      }
      
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
