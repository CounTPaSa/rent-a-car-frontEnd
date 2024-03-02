import { GetByIdBrandResponse } from "../../brands/response/getByIdBrandResponse";

export interface GetByIdModelResponse{
    id:number;
    name:string;
    brandResponse: GetByIdBrandResponse;
}