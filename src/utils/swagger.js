module.exports = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Grocery store API",
    description: "SOLO CAPSTONE PROJECT Grocery store API.",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },

  host: process.env.BE_URL,
  basePath: "/api/",
  tags: [
    {
      name: "Users",
      description: "API for users in the system",
    },
  ],

  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    "/users": {
      post: {
        tags: ["Users"],
        description: "Create new user",
        parameters: [
          {
            name: "user",
            in: "body",
            description: "User that we want to create",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        ],
        produces: ["application/json"],
        responses: {
          200: {
            description: "New user is created",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        },
      },

      get: {
        tags: ["Users"],
        summary: "Get all users in system",
        responses: {
          200: {
            description: "OK",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        },
      },
    },

    "/users/{userId}": {
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          description: "ID of user that we want to find",
          type: "string",
        },
      ],

      get: {
        tags: ["Users"],
        summary: "Get user with given ID",
        responses: {
          200: {
            description: "User is found",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        },
      },
      delete: {
        summary: "Delete user with given ID",
        tags: ["Users"],
        responses: {
          200: {
            description: "User is deleted",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        },
      },
      put: {
        summary: "Update user with give ID",
        tags: ["Users"],
        parameters: [
          {
            name: "user",
            in: "body",
            description: "User with new values of properties",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        ],
        responses: {
          200: {
            description: "User is updated",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        },
      },
    },
  },
  definitions: {
    User: {
      required: ["email", "_id", "password"],
      properties: {
        _id: {
          type: "string",
          uniqueItems: true,
        },
        email: {
          type: "string",
          uniqueItems: true,
        },
        lastname: {
          type: "string",
        },
        firstname: {
          type: "string",
        },
        password: {
          type: "string",
        },
        role: {
          type: "string",
          enum: ["admin", "user"],
          default: "user",
        },
        cart: { type: "List of products" },
      },
    },
  },
};
