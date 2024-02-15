import * as yup from "yup";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";

export default class ProductValidatorYup implements ValidatorInterface<Product>{
    validate(entity: Product): void {
        try {
            yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
                price: yup.number().required("Price is required").moreThan(0, "Price must be greater than zero"),
            }).validateSync({
                id: entity.id,
                name: entity.name,
                price: entity.price,
            }, { abortEarly: false });
        } catch (e) {
            const errors = e as yup.ValidationError;
            errors.errors.forEach((error) => {
                entity.notification.addError({
                    message: error,
                    context: "Product",
                });
            });
        }
    }
}