import JiraApi from 'jira-client'
import { TicketData } from './types'

export class JiraHelper {
  jiraClient = null

  public initialize (apiUrl: string, user: string, password: string): void {
    this.jiraClient = new JiraApi({
      protocol: 'https',
      host: apiUrl,
      username: user,
      password: password,
      apiVersion: '2',
      strictSSL: true
    })
    console.log(`Jira Client initialized with API '${apiUrl}' for '${user}' with password: ${password}`)
  }

  public getIssue (issueIdOrKey: string): Promise<TicketData> {
    console.log(`getIssue() for task ${issueIdOrKey}`);
    return new Promise((resolve, reject) => {
      this.jiraClient.getIssue(issueIdOrKey, ['key', 'summary'])
        .then(searchData => {
          if (searchData) {
            resolve({
              key: searchData.key,
              summary: searchData.fields.summary,
            })
          } else {
            console.error(' ')
            console.error(`/!\\ There is no results for Jira Task with ID "${issueIdOrKey}" !!!`)
            console.error(' ')
            // Resolving as empty (not a big deal...)
            reject({
              jiraStatusCode: 200,
              errorMessage: `There is no results for Jira Task with ID "${issueIdOrKey}"`
            })
          }
        })
        .catch(jiraError => {
          console.dir(jiraError);
          const error = JSON.parse(jiraError.message);
          if (error['status-code'] === 401 || error['status-code'] === 403) {
            console.error(' ')
            console.error(`{JiraAPI} getIssue error /!\\ Your credentials seems incorrect. ${error?.errorMessages?.join(',')}`);
            console.error(' ')
            reject({
              jiraStatusCode: error['status-code'],
              errorMessage: `Your credentials seems incorrect: ${error?.errorMessages?.join(',')}`
            })
          } else {
            console.error(`{JiraAPI} getIssue error: ${error?.errorMessages?.join(',')} /!\\`)
            reject({
              jiraStatusCode: error['status-code'],
              errorMessage: `${issueIdOrKey}: ${error?.errorMessages?.join(',')}`
            })
          }
        });
    });
  }

  public updateIssue (issueId: string, issueUpdate: object): Promise<void> {
    return new Promise((resolve, reject) => {
      this.jiraClient.updateIssue(issueId, issueUpdate)
        .then(() => {
          resolve();
        })
        .catch(jiraError => {
          const error = JSON.parse(jiraError.message);
          if (error['status-code'] === 401 || error['status-code'] === 403) {
            console.error(' ')
            console.error(`{JiraAPI} updateIssue error /!\\ Your credentials seems incorrect. ${error?.errorMessages.join(',')}`);
            console.error(' ')
            reject({
              jiraStatusCode: error['status-code'],
              errorMessage: `Your credentials seems incorrect: ${error?.errorMessages.join(',')}`
            })
          } else {
            console.error(`{JiraAPI} updateIssue error: ${error?.errorMessages.join(',')} /!\\`)
            reject({
              jiraStatusCode: error['status-code'],
              errorMessage: `${issueId}: ${error?.errorMessages.join(',')}`
            })
          }
        });
    });
  }
}

export const instance = new JiraHelper()
