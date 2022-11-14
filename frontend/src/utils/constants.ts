// URLs
export const baseBeUrl = "http://localhost:3001";
export const ordersUrl = baseBeUrl + "/orders";

// QUERY KEYS
export const GET_ORDERS = "GET_ORDERS";
export const POST_ORDERS = "POST_ORDERS";

// DATA VALIDATION RULES
export const ordersValidationRules = {
  id: /\d{5}/,
  date: /\d{4}-\d{2}-\d{2}/,
};

// ORDER TYPES
export const orderTypes = ["Typ 1", "Typ 2", "Typ 3", "Typ 4"] as const;
