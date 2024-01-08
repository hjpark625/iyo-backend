import type { Model, ObjectId } from 'mongoose';

export interface IDetailSchema {
  _id: ObjectId;
  name: string;
  engName: string;
  category?: string;
  address: string;
  detailAddress: string | null;
  nearestRoute: {
    subwayLine: string[] | null;
    routeInfo: string | null;
  } | null;
  operationTime: {
    day: string;
    startTime: string | null;
    endTime: string | null;
  }[];
  phoneNumber: string | null;
  lat: number;
  lng: number;
  description: string | null;
  updatedAt: Date;
}

export type DetailModel = Model<IDetailSchema, object, object>;
