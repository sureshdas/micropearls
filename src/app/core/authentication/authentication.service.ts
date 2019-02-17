import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SharedService} from '@app/shared/shared.service';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null;

  constructor(public http: HttpClient, private router: Router,  public snackBar: MatSnackBar,public sharedService: SharedService) {
    const savedCredentials =
      sessionStorage.getItem(credentialsKey) ||
      localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    this.sharedService.showLoader = true;
    // Replace by proper authentication call
    const cred = {
      email: context.username,
      password: context.password
    };
    console.log('cred ::', cred);
    const url = 'user/signin';
    const data = {
      username: context.username,
      token: ''
    };
    this.http.post(url, cred).subscribe(
      (res: any) => {
        this.sharedService.showLoader = false;
        console.log('login res ::', res);
        if(res.data && res.data.token){
          this.openSnackBar('Successfully LoggedIn');
            data.token = res.data.token;
            localStorage.token = 'Bearer' + res.token;
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('token')
           });
           this.router.navigate(['/home'], { replaceUrl: true });
        }
        if(!res.data){
          this.openSnackBar('Invalid Credentials');
        }
    }, (error) =>{
      this.openSnackBar('Login Error');
    });
    this.setCredentials(cred, context.remember);
    return of(data);
  }



  openSnackBar(action: string, message?: string) {
    this.snackBar.open(action, message, { duration: 3000 });
  }


  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: any, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
