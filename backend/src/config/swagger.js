const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TMS Backend API — Auth & Users',
            version: '1.0.0',
            description: 'Authentication, JWT/RBAC, and user management endpoints',
        },
        servers: [{ url: 'http://localhost:3000' }],
        components: {
            securitySchemes: {
                cookieAuth: { type: 'apiKey', in: 'cookie', name: 'token' },
            },
        },
    },
    apis: ['./src/modules/**/*.routes.js'],
};

module.exports = swaggerJsdoc(options);
