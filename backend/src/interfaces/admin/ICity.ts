

export enum CityStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface ICity {
  id?: string;
  state_id?: string;
  name?: string;
  status?: CityStatus;
  created_at?: Date;
  updated_at?: Date;
}
