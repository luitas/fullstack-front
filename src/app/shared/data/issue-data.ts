import {LabelData} from './label-data';
import {UserData} from './user-data';

export class IssueData {
    id: number;
    title: string;
    number: number;
    repository_url: string;
    labels: LabelData[];
    user: UserData;
    created_at: string;
    comments: number;
    state: string;
    body: string;
}
