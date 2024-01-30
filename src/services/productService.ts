import axios from "axios";
import { GetAllProductsModel } from "../models/responses/GetAllProductsModel";
import { ProductModel } from "../models/responses/ProductModel";
import axiosInstance from "../utils/interceptors/axiosInterceptors";
class ProductService{
    getAll(){
        return axiosInstance.get<GetAllProductsModel>(
            "products");
    }
    getById(id:number)
    {
        return axiosInstance.get<ProductModel>(
            "products/" +id)
    }
}
export default ProductService;