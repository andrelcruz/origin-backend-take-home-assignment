import { Response } from 'express'

export type HttpResponseType = {
  statusCode: number,
  errors?: string[]
  data?: any
}

const makeResponse = (res: Response, { statusCode, errors = [], data = {} }: HttpResponseType): Response =>
  res.status(statusCode).json({
    statusCode,
    errors,
    data
  })

export const HttpResult = {
  OK: (res: Response, data: any) => makeResponse(res, { statusCode: 200, data }),
  CREATED: (res: Response, data: any) => makeResponse(res, { statusCode: 201, data }),
  NO_CONTENT: (res: Response, errors: string[]) => makeResponse(res, { statusCode: 204, errors }),
  BAD_REQUEST: (res: Response, errors: string[]) => makeResponse(res, { statusCode: 400, errors }),
  INTERNAL_SERVER_ERROR: (res: Response, errors: string[]) => makeResponse(res, { statusCode: 500, errors }),
  FORBIDDEN: (res: Response, errors: string[]) => makeResponse(res, { statusCode: 403, errors }),
  NOT_FOUND: (res: Response, errors: string[]) => makeResponse(res, { statusCode: 404, errors }),
  CONFLICT: (res: Response, errors: string[]) => makeResponse(res, { statusCode: 409, errors }),
  UNAUTHORIZED: (res: Response, errors: string[]) => makeResponse(res, { statusCode: 401, errors })
}
