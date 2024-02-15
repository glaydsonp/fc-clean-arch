import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from 'yup';

export default class CustomerValidatorYup implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        try {
            yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
            }).validateSync({
                id: entity.id,
                name: entity.name,
            }, { abortEarly: false });
        } catch (e) {
            const errors = e as yup.ValidationError;
            errors.errors.forEach((error) => {
                entity.notification.addError({
                    message: error,
                    context: "Customer",
                });
            });
        }
    }
} 