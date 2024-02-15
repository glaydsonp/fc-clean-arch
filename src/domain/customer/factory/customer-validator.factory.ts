import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import CustomerValidatorYup from "../validator/customer-validator.yup";

export default class CustomerValidatorFactory {
    static create(): ValidatorInterface<Customer> {
        return new CustomerValidatorYup();
    }
}