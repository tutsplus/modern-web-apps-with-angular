import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Project } from './project';
import { Conversation } from './conversation';

@Injectable()
export class ProjectsService {
    constructor(private http: Http) {}

    extractData(res: Response) {
        return res.json();
    }

    getUsers(): Observable<any[]> {
        return this.http.get('/api/users').map(this.extractData);
    }

    getProject(id: string) : Observable<Project> {
        return this.http.get('/api/projects/' + id).map(this.extractData);
    }

    getProjects(): Observable<Project[]> {
        return this.http.get('/api/projects').map(this.extractData);
    }

    createProject(attrs): Observable<Project> {
        return this.http.post('/api/projects', attrs).map(this.extractData);
    }

    getConversation(id: string) : Observable<Conversation> {
        return this.http.get('/api/conversations/' + id).map(this.extractData);
    }

    createConversation(id: string, name: string) : Observable<Conversation> {
        return this.http.post(`/api/projects/${id}/conversations`, { name }).map(this.extractData);
    }

    createMessage(conv_id: string, message: string) {
        return this.http.post('/api/conversations/' + conv_id + '/messages', message).map(this.extractData);
    }
}
