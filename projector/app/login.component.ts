import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'login',
    templateUrl: 'templates/login.component.html'
})
export class LoginComponent {
    constructor (private auth: AuthService, private router: Router) {}

    login({ username, password }) {
        this.auth.login(username, password).subscribe(loggedIn => {
            if (loggedIn) {
                this.router.navigateByUrl('/home');
            }
        });
    }
}
