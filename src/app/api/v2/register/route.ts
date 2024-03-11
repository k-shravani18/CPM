import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

/**
   * This method is used to register a new user
   * @param req
   * {
   * String firstName, 
   * String lastName,
   * String email,
   * String username, 
   * String password, 
   * String confirmPassword, 
   * String realm
   *  }
   * @return NextResponse{message,statuscode} 
   */
export async function POST(req: Request) {
  const { firstName, lastName, email, username, password, confirmPassword, realm } = await req.json();

  try {
    if (password != confirmPassword) {
      return NextResponse.json({ error: 'Password mismatch' }, { status: 500 });
    }

    const params = new URLSearchParams();
    params.append("grant_type", process.env.NEXT_PUBLIC_SSO_GRANT_TYPE!)
    params.append("client_id", process.env.NEXT_PUBLIC_SSO_CLIENT_ID!)
    params.append("username", process.env.NEXT_PUBLIC_SSO_USERNAME!)
    params.append("password", process.env.NEXT_PUBLIC_SSO_PASSWORD!)

    //generating a access token for master realm from keycloak
    const masterResponse = await axios.post(`${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_SSO_REALM}/protocol/openid-connect/token`, params)
    const access_token = masterResponse.data.access_token


    const data = {
      "username": username,
      "enabled": true,
      "totp": false,
      "emailVerified": true,
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "disableableCredentialTypes": [],
      "requiredActions": [],
      "notBefore": 0,
      "credentials": [
        {
          "type": "password",
          "value": password,
          "temporary": false
        }
      ],
      "access": {
        "manageGroupMembership": true,
        "view": true,
        "mapRoles": true,
        "impersonate": false,
        "manage": true
      },
      "realmRoles": []
    }

    //creating a new user in keycloak
    const response = await axios.post(`${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/admin/realms/${realm}/users`, data, {
      headers: {
        Authorization:
          `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });


    if (response.status === 201) {
      return NextResponse.json({ message: 'User Created Successfully' }, { status: response.status });
    }
    else {
      if (response.status === 409) {
        return NextResponse.json({ error: 'User exists' }, { status: response.status });
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
