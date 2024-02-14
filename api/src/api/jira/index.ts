// Helpers
import { Request, Response } from 'express'
import { SuccessResponse, InternalErrorResponse } from '../../helpers/api'
import conf from '../../helpers/conf'
import { instance as jiraInstance } from './jira'
import { TicketData } from './types'

// Initialize the Jira Client instance
jiraInstance.initialize(conf.jiraApiURL, conf.jiraUsername, conf.jiraApiToken)

export async function getJiraTicket (req: Request, res: Response) {
  try {
    const ticketData: TicketData = await jiraInstance.getIssue(req.params.ticketId)
    return new SuccessResponse(req, res, ticketData)
  } catch (error) {
    return new InternalErrorResponse(req, res, error)
  }
}