import JiraApi from 'jira-client'
import { TicketData, UserData } from './types'
import { AppError } from '../../helpers/exception'

/**
 * JIRA HELPER
 */
export class JiraHelper {
  jiraClient = null
  personalAccessToken = null

  /**
   * Init method
   * @param jiraApiURL the JIRA API URL
   * @param user  the JIRA username
   * @param password the JIRA password/API token
   */
  public initialize (jiraApiURL: string, user: string, password: string): void {
    this.personalAccessToken = password
    this.jiraClient = new JiraApi({
      protocol: 'https',
      host: jiraApiURL,
      username: user,
      password: password,
      apiVersion: '2',
      strictSSL: true
    })
    console.log(`Jira Client initialized for server '${jiraApiURL}' with ${user} credentials ${password}`)
  }

    /**
   * Gets the JIRA ticket
   * @param issueIdOrKey the JIRA ticket key or identified
   * @returns the data object
   */
    public async getIssues (): Promise<TicketData[]> {
      console.log(`getIssues() for users`);
      try {
        const searchData = await this.jiraClient.searchJira("assignee = currentUser() AND status = Open ORDER BY priority DESC");
        if (searchData && searchData.issues) {
          const result: TicketData[] = [];
          searchData.issues.forEach(issue => {
            result.push({
              key: issue.key,
              summary: issue?.fields?.summary || ''
            })
          });
          return result;
        } else {
          console.error(' ')
          console.error(`/!\\ There is no results for Jira Task for current user !!!`)
          console.error(' ')
          throw new AppError({
            id: 200,
            name: 'jira_no_results',
            message: `There is no results for Jira Task for current user`
          });
        }
      } catch(jiraError) {
        this.handleJiraError('currentUser()', jiraError);
      } finally {
        console.log('{JiraAPI} getIssue done/finally');
      }
    };

  /**
   * Gets the JIRA ticket
   * @param issueIdOrKey the JIRA ticket key or identified
   * @returns the data object
   */
  public async getIssue (issueIdOrKey: string): Promise<TicketData> {
    console.log(`getIssue() for task '${issueIdOrKey}'`);
    try {
      const searchData = await this.jiraClient.getIssue(issueIdOrKey, ['key', 'summary']);
      if (searchData) {
        return {
          key: searchData.key,
          summary: searchData.fields.summary
        };
      } else {
        console.error(' ')
        console.error(`/!\\ There is no results for Jira Task with ID "${issueIdOrKey}" !!!`)
        console.error(' ')
        throw new AppError({
          id: 200,
          name: 'jira_no_results',
          message: `There is no results for Jira Task with ID "${issueIdOrKey}"`
        });
      }
    } catch(jiraError) {
      this.handleJiraError(issueIdOrKey, jiraError);
    } finally {
      console.log('{JiraAPI} getIssue done/finally');
    }
  };

  /**
   * Updates the JIRA ticket
   * @param issueIdOrKey the JIRA ticket key or identified
   * @param issueUpdate the data to update
   */
  public async updateIssue (issueIdOrKey: string, issueUpdate: object): Promise<void> {
    try {
      await this.jiraClient.updateIssue(issueIdOrKey, issueUpdate);
    } catch(jiraError) {
      this.handleJiraError(issueIdOrKey, jiraError);
    }
  }


  /**
   * Gets the current user
   * @returns the user data object
   */
  public async getCurrentUser (): Promise<UserData> {
    console.log('getCurrentUser()');
    try {
      const currentUserData = await this.jiraClient.getCurrentUser();
      if (currentUserData) {
        const me: UserData = {
          accountId: currentUserData.accountId,
          password: this.personalAccessToken,
          emailAddress: currentUserData.emailAddress,
          displayName: currentUserData.displayName,
          locale: currentUserData.locale
        }
        return me
      } else {
        console.error(' ')
        console.error(`/!\\ There is no results for user !!!`)
        console.error(' ')
        throw new AppError({
          id: 200,
          name: 'jira_no_results',
          message: `There is no results for user !!!`
        });
      }
    } catch(jiraError) {
      this.handleJiraError('no_user_data', jiraError);
    } finally {
      console.log('{JiraAPI} getCurrentUser done/finally');
    }
  };

  /**
   * Handle JIRA API error by throwing a proper Error Exception
   * @param issueIdOrKey the JIRA ticket key or identifier
   * @param jiraError the JIRA error object
   */
  private handleJiraError (issueIdOrKey, jiraError): void {
    try {
      const error = JSON.parse(jiraError.message);
      if (error['status-code'] === 401 || error['status-code'] === 403) {
        console.error(' ')
        console.error(`{JiraAPI} getIssue error /!\\ Your credentials seems incorrect. ${error?.errorMessages?.join(',')}`);
        console.error(' ')
        throw new AppError({
          id: error['status-code'],
          name: 'jira_invalid_creds',
          message: `Your credentials seems incorrect: ${error?.errorMessages?.join(',')}`
        });
      } else {
        console.error(`{JiraAPI} getIssue error: ${error?.errorMessages?.join(',')} /!\\`)
        throw new AppError({
          id: error['status-code'],
          name: 'jira_unknown_error',
          message: `${issueIdOrKey}: ${error?.errorMessages?.join(',')}`
        });
      }
    } catch(jsonError) {
      throw new AppError({
        id: 0,
        name: 'invalid_jira_error_json',
        message: 'Unable to parse Jira error'
      });
    }
  }

}

export const instance = new JiraHelper()
