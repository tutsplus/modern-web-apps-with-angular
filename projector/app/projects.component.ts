import { Component, OnInit } from '@angular/core';

import { ProjectsService } from './projects.service';
import { Project } from './project';

@Component({
    selector: 'projects',
    templateUrl: 'templates/projects.component.html',
    providers: [ProjectsService]
})
export class ProjectsComponent implements OnInit {
    projects: Project[];

    constructor(private service: ProjectsService) {}

    ngOnInit() {
        this.service.getProjects().subscribe(projects =>
            this.projects = projects);
    }

}
