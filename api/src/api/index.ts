// Helpers
import { Express } from 'express'
// Controllers
import * as version from './version'
import * as jira from './jira'

export const addControllers = (apiPrefix: string, app: Express) => {
  // Version
  app.get(`/${apiPrefix}/version`, version.get)

  // Jira
  app.get(`/${apiPrefix}/jira/me`, jira.getCurrentUser)
  app.get(`/${apiPrefix}/jira/list`, jira.getJiraTickets)
  app.get(`/${apiPrefix}/jira/validateOAuth2`, jira.validateOAuth2)
  app.get(`/${apiPrefix}/jira/:ticketId`, jira.getJiraTicket)

};
