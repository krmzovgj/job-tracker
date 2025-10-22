export class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}

export const badRequest = (msg: string) => new ApiError(400, msg);
export const unauthorized = (msg: string) => new ApiError(401, msg);
export const notFound = (msg: string) => new ApiError(404, msg);
export const conflict = (msg: string) => new ApiError(409, msg);
