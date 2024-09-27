import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputError } from "./middleware";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The product name
 *           example: "Apple"
 *         price:
 *           type: number
 *           description: The product price
 *           example: 1.99
 *         availability:
 *           type: boolean
 *           description: The product availability
 *           example: true
 */

/**
* @swagger
* /api/products:
*   get:
*     summary: Get a list of all products
*     tags:
*       - Products
*     description: Returns an array with all products in the database
*     responses:
*       200:
*         description: Successful response
*         content:
*           application/json:
*             schema:
*             type: array
*             items:
*               $ref: '#/components/schemas/Product'
*/

router.get("/", getProduct);

/**
* @swagger
* /api/products/{id}:
*   get:
*     summary: Get a product by ID
*     tags:
*       - Products
*     description: Returns a single product based on the ID
*     parameters:
*       - in: path
*         name: id
*         description: The ID of the product to retrieve
*         required: true
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Successful response
*         content: 
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       404:
*         description: Product not found
*       400:
*        description: Invalid ID
*/

router.get(
  "/:id",
  param("id")
    .isNumeric()
    .withMessage("Id must be a number")
    .custom((value) => value > 0)
    .withMessage("Id must be greater than 0"),
  handleInputError,
  getProductById
);

/**
* @swagger
* /api/products:
*  post:
*    summary: Create a new product
*    tags:
*      - Products
*    description: Create a new product with the provided name and price
*    requestBody:
*      required: true
*      content:
*        application/json:
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*               example: "Monitor Stand" 
*             price:
*               type: number
*               example: 19.99
*    responses:
*       201:
*         description: Product created successfully
*       400:
*         description: Invalid input data
* 
*/

router.post(
  "/",
  // Validate the request
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),
  handleInputError,
  createProduct
);

/**
* @swagger
* /api/products/{id}:
*  put:
*    summary: Update a product by ID
*    tags:
*       - Products
*    description: Update a product with the provided name and price 
*    parameters:
*          - in: path
*            name: id
*            description: The ID of the product to retrieve
*            required: true
*            schema:
*              type: integer
*    requestBody:
*      required: true
*      content:
*        application/json:
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*               example: "Monitor Stand" 
*             price:
*               type: number
*               example: 19.99
*             availability:
*               type: boolean
*               example: true
*    responses:
*      200:
*        description: Product updated successfully
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Product' 
*      400:
*        description: Invalid input data or invalid ID
*      404:
*        description: Product not found       
*
*/

router.put(
  "/:id",
  // Validate the request
  param("id")
    .isNumeric()
    .withMessage("Id must be a number")
    .custom((value) => value > 0)
    .withMessage("Id must be greater than 0"),
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),
  handleInputError,
  updateProduct
);

/**
* @swagger
* /api/products/{id}:
*   patch:
*     summary: Update the availability of a product by ID
*     tags:
*       - Products
*     description: Update the availability of a product based on the ID
*     parameters:
*       - in: path
*         name: id
*         description: The ID of the product to update
*         required: true
*         schema:
*           type: integer
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               availability:
*                 type: boolean
*                 example: true
*     responses:
*       200:
*         description: Product updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       400:
*         description: Invalid input data or invalid ID
*       404:
*         description: Product not found
*/

router.patch(
  "/:id",
  // Validate the request
  param("id")
    .isNumeric()
    .withMessage("Id must be a number")
    .custom((value) => value > 0)
    .withMessage("Id must be greater than 0"),
  handleInputError,
  updateAvailability
);

/**
* @swagger
* /api/products/{id}:
*  delete:
*    summary: Delete a product by ID
*    tags:
*      - Products
*    description: Delete a product based on the ID
*    parameters:
*       - in: path
*         name: id
*         description: The ID of the product to update
*         required: true
*         schema:
*           type: integer
*    responses:
*      200:
*        description: Product deleted successfully
*      400:
*        description: Invalid input data or invalid ID
*      404:
*        description: Product not found
*/

router.delete(
  "/:id",
  // Validate the request
  param("id")
    .isNumeric()
    .withMessage("Id must be a number")
    .custom((value) => value > 0)
    .withMessage("Id must be greater than 0"),
  handleInputError,
  deleteProduct
);

export default router;
