// Helpers
import { Request, Response } from 'express'
import { SuccessResponse, InternalErrorResponse, SuccessResponseWithCookie, CookieData } from '../../helpers/api'
import conf from '../../helpers/conf'
import { generateToken } from '../../helpers/auth'
import { instance as jiraInstance } from './jira'
import { TicketData, UserData } from './types'

// Initialize the Jira Client instance
jiraInstance.initialize(conf.jiraApiURL, conf.jiraUsername, conf.jiraApiToken)

export async function getJiraTickets (req: Request, res: Response) {
  try {
    const ticketsData: TicketData[] = await jiraInstance.getIssues()
    return new SuccessResponse(req, res, ticketsData)
  } catch (error) {
    return new InternalErrorResponse(req, res, error)
  }
}

export async function getJiraTicket (req: Request, res: Response) {
  try {
    const ticketData: TicketData = await jiraInstance.getIssue(req.params.ticketId)
    return new SuccessResponse(req, res, ticketData)
  } catch (error) {
    return new InternalErrorResponse(req, res, error)
  }
}

export async function getCurrentUser (req: Request, res: Response) {
  try {
    const userData: UserData = await jiraInstance.getCurrentUser()
    const token = generateToken(userData);
    const cookieData: CookieData = {
      name: 'access_token',
      val: token,
      options: {
        httpOnly: true,
        secure: false,
        sameSite: true,
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000
      }
    }
    delete userData.password;
    return new SuccessResponseWithCookie(req, res, cookieData, userData)
  } catch (error) {
    return new InternalErrorResponse(req, res, error)
  }
}

export async function validateOAuth2 (req: Request, res: Response) {
  try {
    return new SuccessResponse(req, res, { ok: true, state: req.query['state'], code: req.query['code']})
  } catch (error) {
    return new InternalErrorResponse(req, res, error)
  }
}
