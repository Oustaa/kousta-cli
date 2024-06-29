const posibleResourceValues = ["getAll", "getOne",] 

export type resourceType = Record<
  keyof typeof posibleResourceValues,
  (string | [string, string])[]
>;
