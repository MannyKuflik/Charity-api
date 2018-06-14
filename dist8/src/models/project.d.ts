import { Entity } from '@loopback/repository';
export declare class Project extends Entity {
    id?: number;
    name: string;
    description: string;
    getId(): number | undefined;
}
