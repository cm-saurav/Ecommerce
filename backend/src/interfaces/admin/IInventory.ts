export enum InventoryStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IInventory {
  id?: string;
  product_id: string;
  quantity: number;
  created_by: string;
  status?: InventoryStatus;
  last_restocked_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
