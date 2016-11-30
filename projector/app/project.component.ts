import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { EmitterService } from './emitter.service';
import { ProjectsService } from './projects.service';
import { AuthService } from './auth.service';
import { Project } from './project';

import { ConversationComponent } from './conversation.component';
import { NewConversationComponent } from './newConversation.component';

export const projectChildRoutes = [
    { path: '', component: ProjectComponent },
    { path: 'conversations/new', component: NewConversationComponent },
    { path: 'conversations/:conv_id', component: ConversationComponent }
];

@Component({
    selector: 'project',
    templateUrl: 'templates/project.component.html',
    providers: [ProjectsService]
})
export class ProjectComponent implements OnInit, OnDestroy {
    project: Project;
    canWork: boolean = false;

    constructor(private auth: AuthService,
                private route: ActivatedRoute,
                private emitter: EmitterService,
                private service: ProjectsService) {}

    ngOnInit() {
        this.route.params
            .map((params: Params) => params['id'])
            .flatMap(id => this.service.getProject(id))
            .subscribe((project: Project) => {
                this.project = project;

                this.sub = this.emitter.subscribe(conv => this.project.conversations.push(conv));

                this.auth.currentUser.subscribe(user => {
                    this.canWork = project.users.indexOf(user.username) > -1;
                });
            });
    }

    ngOnDestroy () {
        this.sub.unsubscribe();
    }
}
