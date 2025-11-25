

export enum CityStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface ICity {
  id?: string;
  state_id: string; // it shoulb not be optional 
  name: string;
  status: CityStatus;
  city_code: string;
  created_at?: Date;
  updated_at?: Date;
}
