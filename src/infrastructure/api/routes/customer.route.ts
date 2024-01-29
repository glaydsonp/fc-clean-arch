import express, { Request, Response } from 'express';
import { CreateCustomerUseCase } from '../../../usecase/customer/create/create-customer.use-case';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import { ListCustomerUseCase } from '../../../usecase/customer/list/list-customer.use-case';

export const customerRoutes = express.Router();
const repository = new CustomerRepository();

customerRoutes.get('/', async (_req: Request, res: Response) => {
    const useCase = new ListCustomerUseCase(repository);

    try {
        const customers = await useCase.execute();
        console.log({ customers: customers.customers })

        res.status(200).json(customers.customers);
    } catch (e) {
        res.status(400).json(e);
    }
});

customerRoutes.post('/', async (req: Request, res: Response) => {
    const useCase = new CreateCustomerUseCase(repository);

    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip,
            }
        }

        const customer = await useCase.execute(customerDto);

        res.status(201).json(customer);
    } catch (e) {
        res.status(400).json(e);
    }
});