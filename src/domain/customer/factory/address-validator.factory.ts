import ValidatorInterface from "../../@shared/validator/validator.interface";
import AddressValidatorYup from "../validator/address-validator.yup";
import Address from "../value-object/address";

export default class AddressValidatorFactory {
    static create(): ValidatorInterface<Address> {
        return new AddressValidatorYup();
    }
}