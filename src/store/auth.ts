import {makeAutoObservable, runInAction} from 'mobx';
import {API_URL} from 'react-native-dotenv';

export interface CredentialData {
  email: string;
  password: string;
}

interface AuthData {
  baseProfileStatus: string;
  middlename: string | null;
  firstname: string;
  lastname: string;
  isEligibleForLoginAsTalent: boolean;
  incompleteSection: string;
  isFirsttimeProfileComplete: boolean;
  userid: string;
  session: string;
}

interface LoginResponse {
  status: number;
  inputErrors?: any;
  result?: AuthData;
}

export default class Auth {
  constructor() {
    makeAutoObservable(this);
  }

  isAuthenticated = false;
  authData: AuthData | null = null;

  async login(credential: CredentialData): Promise<boolean> {
    const response = await fetch(`${API_URL}/auth/talent/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credential),
    });
    const body = (await response.json()) as LoginResponse;

    console.log(JSON.stringify(body));

    const isAuth = response.status === 200 && !body.inputErrors;

    runInAction(() => {
      this.isAuthenticated = isAuth;
      this.authData = body.result ?? null;
    });

    return isAuth;
  }
}
