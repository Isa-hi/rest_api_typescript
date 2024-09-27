import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProduct = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [["price", "DESC"]],
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
   
    res.json({ data: products });
};

export const getProductById = async (req: Request, res: Response) => {
    const products = await Product.findByPk(req.params.id);

    if (!products) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json({ data: products });
};

export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body);
    res.status(201).json("Product created: " + { data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    await product.update(req.body);
    await product.save();

    res.json({ data: product });
};

export const updateAvailability = async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    product.availability = !product.dataValues.availability;
    await product.update(req.body);
    await product.save();

    res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.destroy();
        res.json({ message: "Product deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
