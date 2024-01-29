import express, { Request, Response } from 'express';
import { ListProductUseCase } from '../../../usecase/product/list/list-product.use-case';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import { CreateProductUseCase } from '../../../usecase/product/create/create-product.use-case';
import { InputCreateProductDto } from '../../../usecase/product/create/create-product.dto';

export const productRoutes = express.Router();
const repository = new ProductRepository();

productRoutes.get('/', async (_req: Request, res: Response) => {
    const useCase = new ListProductUseCase(repository);

    try {
        const products = await useCase.execute();

        res.status(200).json(products.products);
    } catch (e) {
        res.status(400).json(e);
    }
});

productRoutes.post('/', async (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(repository);

    try {
        const productDto: InputCreateProductDto = {
            name: req.body.name,
            price: req.body.price
        }

        const product = await useCase.execute(productDto);

        res.status(201).json(product);
    } catch (e) {
        res.status(400).json(e);
    }
});