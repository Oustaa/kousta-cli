export function authorizeAndLog(originalMethod: any, _context: any) {
  return function (this: any, ...args: any[]) {
    console.log("start:", originalMethod.name);
    const result = originalMethod.call(this, ...args);
    console.log("end:", originalMethod.name);
    return result;
  };
}
