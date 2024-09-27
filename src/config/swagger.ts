import swaggerJSDoc from "swagger-jsdoc";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.2",
        tags: [
            {
                name: "Products",
                description: "API for products in the store",
            }
        ],
        info: {
            title: "REST API Node.js - Express - Sequelize",
            version: "1.0.0",
            description:
                "A simple REST API that allows you to perform CRUD operations on products"
        }
    },
    apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;