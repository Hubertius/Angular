import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User2} from './main/main.component';

@Injectable({
  providedIn: 'root'
})
export class BazaService {

  readonly host = 'https://imsi.pl:5000/';

  constructor(private http: HttpClient) {
  }

  addUser(username: string): Observable<number> {
    return this.http.put<number>(this.host + 'players', {
      name: username
    }).pipe(map(data => (data as any).id));
  }

  getUser(username: string): Observable<User2> {
    return this.http.get<User2>(this.host + 'player/' + username)
      .pipe(map(data => data[0] || null));
  }

  updateUser(user: User2) {
    return this.http.put(this.host + 'players/' + user.id, {
      p0: user.p0,
      p1: user.p1,
      p2: user.p2,
      p3: user.p3,
      p4: user.p4,
      p5: user.p5,
      p6: user.p6,
      p7: user.p7,
      p8: user.p8,
      p9: user.p9
    });
  }

  async getCurrentUserCreateIfNotExists(username: string): Promise<User2> {
    let user = await this.getUser(username).toPromise();

    if (user === null) {
      const newUserId = await this.addUser(username).toPromise();
      if (newUserId <= 0) {
        throw new Error('User was not created.');
      }
      user = await this.getUser(username).toPromise();
    }

    return user;
  }

  async increaseUseCounter(username: string): Promise<number> {
    const user = await this.getCurrentUserCreateIfNotExists(username);

    if (user === null) {
      throw new Error('Cannot get current user data.');
    }

    user.p0 = (+user.p0 + 1).toString();
    await this.updateUser(user).toPromise();
    return +user.p0;
  }
}
