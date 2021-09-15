/**
 * @format
 * @flow
 */
import {makeAutoObservable} from 'mobx';

export interface CredentialData {
  email: string;
  password: string;
}

export class Auth {
  constructor() {
    makeAutoObservable(this);
  }

  async login(credential: CredentialData): Promise<boolean> {
    const response = await fetch(
      'https://dev-api.pepelwerk.com/v1.0/auth/talent/signin',
      {
        method: 'POST',
        body: JSON.stringify(credential),
      },
    );
    const body = await response.json();
    console.log(body);
    return true;
    // if (response.status === 200) {
    //   return body.status === 200;
    //   // if (body.status === 200)
    //   // return true;
    // } else {
    //   return false;
    // }
  }
}
