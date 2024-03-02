export interface AddCarRequest {
    plate: string;
    kilometer: number;
    dailyPrice: number;
    modelYear: number;
    minFindeksRate: number;
    imagePath: string;
    modelId: number;
    colorId: number;
    carType: CarType;
    fuelType: FuelType;
    transmissionType: TransmissionType;
    available:Available;
}
export enum Available{
    YES='YES',
    NO='NO',
}
export enum FuelType {
    DIESEL = 'Dizel',
    GASOLINE = 'Benzin',
  }
export enum TransmissionType {
    AUTOMATIC = 'AUTOMATIC',
    MANUAL = 'MANUAL',
}
export enum CarType {
    ECOHATCHBACK = 'ECOHATCHBACK',
    ECOSEDAN = 'ECOSEDAN',

    MIDHATCHBACK = 'MIDHATCHBACK',
    MIDSEDAN = 'MIDSEDAN',

    LUXURYSEDAN = 'LUXURYSEDAN',
    PREMIUMSEDAN = 'PREMIUMSEDAN',

    SUV = 'SUV',

    VAN = 'VAN',
}