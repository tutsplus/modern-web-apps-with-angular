import { Conversation } from './conversation';

export class Project {
    id: string;
    name: string;
    description: string;
    conversations: Conversation[]
    users: any[]
}
