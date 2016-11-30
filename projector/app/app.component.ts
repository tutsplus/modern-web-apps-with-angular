import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: 'templates/app.component.html'
})
export class AppComponent implements OnInit {
    user;

    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit() {
        this.auth.currentUser.subscribe(user => this.user = user);
    }

    logout() {
        this.auth.logout();
        this.router.navigateByUrl('/');
        return false;
    }
}
