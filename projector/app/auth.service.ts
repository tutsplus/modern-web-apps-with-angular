import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class AuthService {
    currentUser: BehaviorSubject = new BehaviorSubject(false);

    constructor(private http: Http) {
        this.currentUser.next(this.getUser());
    }

    login(username: string, password: string) : Observable<boolean> {
        return this.http.post('/api/login', { username, password })
            .map(res => res.json())
            .map(user => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.currentUser.next(user);
                }
                return !!user;
            });
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUser.next(false);
    }

    getUser() {
        var user = localStorage.getItem('user');
        return user ? JSON.parse(user) : false;
    }

    isLoggedIn(): boolean {
        return !!this.getUser();
    }
}
