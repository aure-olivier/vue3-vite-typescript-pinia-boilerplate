// Helpers
import { Request, Response } from 'express';
import { SuccessResponse } from '../../helpers/api';
import conf from '../../helpers/conf';

export function get (req: Request, res: Response) {
  return new SuccessResponse(req, res, {
    version: conf.version,
    jiraUsername: conf.jiraUsername
  });
}
