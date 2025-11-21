export enum CategoryStatus{
    ACTIVE= "active",
    INACTIVE= "inactive"

}

export interface ICategory{
    id?: string;
    name?: string;
    slug?: string;
    status?: CategoryStatus;
    description?: string;
    created_at?:Date;
    updated_at?: Date;
}