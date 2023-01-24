export interface ILocation {
    name: string;
    district: IDistrict[];
}

export interface IDistrict {
    name: string;
    pickup_point: IPickup_point[];
}

export interface IPickup_point {
    name: string;
}
