import { Request } from "express";
import { Op } from "sequelize";

export function getWhere(req: Request) {
  const id = req.params.id;
  const queries = req.query as Record<string, string>;

  type WhereCondition = string | Record<string | symbol, string | number>;
  const where: Record<string, WhereCondition> = {};

  if (id) {
    where.id = id;
  } else {
    Object.keys(queries).forEach((key) => {

      if(key === "limit" || key === "page" ) return

      const value = queries[key];

      if (typeof value === "string") {
        where[key] = value;
      } else {
        const parsedValue = JSON.parse(value);

        if (Array.isArray(parsedValue) && parsedValue.length === 2) {
          const [operator, operand] = parsedValue as [
            keyof typeof Op,
            string | number,
          ];
          if (Op[operator]) {
            where[key] = {
              [Op[operator]]: operand,
            };
          } else {
            throw new Error(`Invalid operator: ${operator}`);
          }
        } else {
          throw new Error("Invalid query format");
        }
      }
    });
  }

  return where;
}
