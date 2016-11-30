import { Component, OnInit, OnDestory } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { ProjectsService } from './projects.service';
import { AuthService } from './auth.service';
import { Conversation } from './conversation';
import { Project } from './project';

@Component({
    selector: 'conversation',
    templateUrl: 'templates/conversation.component.html',
    providers: [ ProjectsService ]
})
export class ConversationComponent implements OnInit, OnDestroy {
    conv: Conversation;
    project: Observable<Project>;
    writable: boolean = false;
    message: string;
    sub: Subscription;

    constructor(private auth: AuthService,
                private service: ProjectsService,
                private router: Router,
                private route: ActivatedRoute) {
                    this.conv_id = route.params.map((params: Params) => params['conv_id'])
                    this.username = auth.currentUser.map(u => u.username);

                    this.project = router
                        .routerState
                        .parent(route)
                        .params
                        .map((params: Params) => params['id'])
                        .flatMap(id => this.service.getProject(id));
                }

    ngOnInit() {
        this.username.subscribe(username => {
            this.project.subscribe(project => {
                this.writable = project.users.indexOf(username) > -1;
            });
        });

        this.sub = Observable.timer(0, 5000)
            .flatMap(() => this.conv_id.flatMap(id => this.service.getConversation(id)))
            .subscribe((conversation: Conversation) => {
                this.conv = conversation;
            });
    }

    handleClick() {
        this.username.subscribe(username => {
            let msg = { text: this.message, username };

            this.conv_id
                .flatMap(id => this.service.createMessage(id, msg))
                .subscribe(message => {
                    this.conv.messages.push(message);
                    this.message = '';
                });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
