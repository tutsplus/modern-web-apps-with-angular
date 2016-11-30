import { Component, OnInit, Input } from '@angular/core';

import { Project } from './project';
import { ProjectsService } from './projects.service';

@Component({
    selector: 'project-summary',
    templateUrl: 'templates/projectSummary.component.html',
    providers: [ProjectsService]
})
export class ProjectSummaryComponent implements OnInit {
    @Input() project: Project;
    avatars: string[];

    constructor(private service: ProjectsService) {}

    ngOnInit() {
        this.service.getUsers().subscribe(users => {
            this.avatars = users
                .filter(u => this.project.users.indexOf(u.username) > -1)
                .map(u => u.avatar);
        });
    }
}
