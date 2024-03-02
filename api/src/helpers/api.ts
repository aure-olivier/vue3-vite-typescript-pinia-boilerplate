// Helpers
import * as Express from 'express';
import * as fs from 'fs';
// Types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SafeAny = any;

export type Request<T = SafeAny> = Express.Request<Record<string, string>, SafeAny, SafeAny, T, SafeAny>;

export type Response = Express.Response;

export type CookieData = {
  name: string
  val: string;
  options?: Express.CookieOptions;
}

export class SuccessResponse {
  constructor (req: Request, res: Response, data?: unknown) {
    res.status(200).json({
      status: {
        code: 200,
        message: 'OK'
      },
      data
    });
  }
}

export class SuccessResponseWithCookie {
  constructor (req: Request, res: Response, cookie:CookieData, data?: unknown) {
    res.cookie(cookie.name, cookie.val, cookie.options).status(200).json({
      status: {
        code: 200,
        message: 'OK'
      },
      data
    });
  }
}

export class DownloadResponse {
  constructor (req: Request, res: Response, filePath: string) {
    res.status(200).download(filePath, () => {
      fs.unlinkSync(filePath);
    });
  }
}

export class InternalErrorResponse {
  constructor (req: Request, res: Response, error?: unknown) {
    res.status(500).json({
      status: {
        code: 500,
        message: 'Internal Error'
      },
      error
    });
  }
}

export class BadRequestErrorResponse {
  constructor (req: Request, res: Response, error?: unknown) {
    res.status(400).json({
      status: {
        code: 400,
        message: 'Bad Request'
      },
      error
    });
  }
}
