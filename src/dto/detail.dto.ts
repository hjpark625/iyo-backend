import type { Model, ObjectId } from 'mongoose';

export interface IDetailDTO {
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
  coord: { lat: number; lng: number };
  description: string | null;
  concept: string[] | null;
  updatedAt: Date;
}

export type DetailModel = Model<IDetailDTO, object, object>;
