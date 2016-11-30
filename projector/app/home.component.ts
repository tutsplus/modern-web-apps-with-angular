import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'home',
    templateUrl: 'templates/home.component.html'
})
export class HomeComponent implements OnInit {
    loggedIn: boolean = false;

    constructor(private auth: AuthService) {}

    ngOnInit() {
        this.auth.currentUser.subscribe(user => {
            this.loggedIn = !!user;
        });
    }
}
