import type { Model, ObjectId } from 'mongoose';
import type { IDetailData } from '@/dto/detail.dto';

export interface IPinData {
  _id: ObjectId;
  lat: number;
  lng: number;
  name: string;
  engName: string;
}

export class PinDTO implements IPinData {
  _id: ObjectId;
  lat: number;
  lng: number;
  name: string;
  engName: string;

  constructor(data: IDetailData) {
    this._id = data._id;
    this.lat = data.coord.lat;
    this.lng = data.coord.lng;
    this.name = data.name;
    this.engName = data.engName;
  }
}

export class PinResponseDTO {
  pins: PinDTO[];
  constructor(pins: PinDTO[]) {
    this.pins = pins;
  }
}

export type PinModel = Model<PinDTO>;
