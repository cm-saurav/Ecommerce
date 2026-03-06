export enum StateStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IState {
  id?: string;
  name?: string;
  code?: string; // MH, GJ, RJ
  status?: StateStatus;
  created_at?: Date;
  updated_at?: Date;
}
