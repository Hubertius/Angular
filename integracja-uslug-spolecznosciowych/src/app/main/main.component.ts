import { Component, OnInit } from '@angular/core';
import { BazaService } from '../baza.service';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
 } from 'angularx-social-login';


@Component({
  selector: 'app-dane',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public userEmail = '';
    public isLoggedIn = false;
    public useCounter = 0;
  user: SocialUser;
  user2: User2 = {
    name: '',
    userName: '',
    id: 0,
    p0: '',
    p1: '',
    p2: '',
    p3: '',
    p4: '',
    p5: '',
    p6: '',
    p7: '',
    p8: '',
    p9: ''
};
  GoogleLoginProvider = GoogleLoginProvider;

  constructor(private authService: SocialAuthService, private baza: BazaService) { }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();

  }

  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }


}
// definicja obiektu user - struktura wynika z wcześniejszego opisu RestAPI
export interface User2 {
    id: number;
    name: string,
    userName: string,
    p0: string;
    p1: string,
    p2: string,
    p3: string,
    p4: string,
    p5: string,
    p6: string,
    p7: string,
    p8: string,
    p9: string;
}
