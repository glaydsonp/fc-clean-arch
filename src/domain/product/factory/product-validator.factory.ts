import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductValidatorYup from "../validator/product-validator.yup";

export default class ProductValidatorFactory {
    static create(): ValidatorInterface<Product> {
        return new ProductValidatorYup();
    }
}