import * as yup from "yup";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import Address from "../value-object/address";

export default class AddressValidatorYup implements ValidatorInterface<Address>{
    validate(entity: Address): void {
        try {
            yup.object().shape({
                street: yup.string().required("Street is required"),
                number: yup.number().required("Number is required"),
                zip: yup.string().required("Zip is required"),
                city: yup.string().required("City is required"),
            }).validateSync({
                street: entity.street,
                number: entity.number,
                zip: entity.zip,
                city: entity.city,
            }, { abortEarly: false });
        } catch (e) {
            const errors = e as yup.ValidationError;
            errors.errors.forEach((error) => {
                entity.notification.addError({
                    message: error,
                    context: "Address",
                });
            });
        }
    }
}