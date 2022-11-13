import * as configOptions from "./knexfile";
import knex from "knex";

export const pg = knex(configOptions);
