import type { Model, ObjectId, Schema } from 'mongoose';

export interface IDetailData {
  _id: ObjectId;
  name: string;
  engName: string;
  socialLink: string | null;
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
  introduce: string | null;
  phoneNumber: string | null;
  coord: { lat: number; lng: number };
  description: string | null;
  concept: string[];
  updatedAt: Date;
  storeImages: {
    file_path: string;
    photoId: ObjectId;
    width: number;
    height: number;
  }[];
}

export class DetailDTO implements IDetailData {
  _id: Schema.Types.ObjectId;
  name: string;
  engName: string;
  socialLink: string | null;
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
  introduce: string | null;
  phoneNumber: string | null;
  coord: { lat: number; lng: number };
  description: string | null;
  concept: string[];
  updatedAt: Date;
  storeImages: {
    file_path: string;
    photoId: ObjectId;
    width: number;
    height: number;
  }[];

  constructor(data: IDetailData) {
    this._id = data._id;
    this.name = data.name;
    this.engName = data.engName;
    this.socialLink = data.socialLink;
    this.category = data.category;
    this.address = data.address;
    this.detailAddress = data.detailAddress;
    this.nearestRoute = data.nearestRoute;
    this.operationTime = data.operationTime;
    this.introduce = data.introduce;
    this.phoneNumber = data.phoneNumber;
    this.coord = data.coord;
    this.description = data.description;
    this.concept = data.concept;
    this.updatedAt = data.updatedAt;
    this.storeImages = data.storeImages;
  }
}

export class DetailResponseDTO {
  data: DetailDTO;
  constructor(data: DetailDTO) {
    this.data = data;
  }
}

export type DetailModel = Model<DetailDTO, object, object>;
