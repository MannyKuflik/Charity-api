import { Entity, property, model } from '@loopback/repository';

@model({
    name: "charity"
})
export class Charity extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name: number;

  @property({
    type: 'string',
  })
  slogan: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phonenumber: string;

  getId() {
    return this.id;
  }
}