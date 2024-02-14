// Helpers
import { Express } from 'express'
// Controllers
import * as version from './version'
import * as jira from './jira'

export const addControllers = (apiPrefix: string, app: Express) => {
  // Version
  app.get(`/${apiPrefix}/version`, version.get)

  // Jira
  app.get(`/${apiPrefix}/jira/:ticketId`, jira.getJiraTicket)
};
