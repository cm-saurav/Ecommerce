export enum PincodeStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IPincode {
  id?: string;
  city_id: string;
  pincode: string;
  area_name?: string;
  delivery_available?: boolean;
  status?: PincodeStatus;
  created_at?: Date;
  updated_at?: Date;
}