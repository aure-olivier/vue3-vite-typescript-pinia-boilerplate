// Helpers
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Global configuration object.
 */
export default new class Configuration {
  public dev: boolean;
  public port: number;
  public version: string;
  public jiraApiURL: string;
  public jiraUsername: string;
  public jiraApiToken: string;
  public JWTSecret: string;
  constructor () {
    this.dev = process.env.TS_NODE_DEV === 'true';
    this.port = +process.env.PORT || 8080;
    this.version = this.dev ? 'dev' : 'unknown';
    if (!this.dev) {
      const confPath = path.resolve(__dirname, '../conf.json');
      if (fs.existsSync(confPath)) {
        const conf = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../conf.json'), 'utf8'));
        this.version = conf.version;
      }
    }
    this.jiraApiURL = process.env.JIRA_API_URL || '';
    this.jiraUsername = process.env.JIRA_USERNAME || '';
    this.jiraApiToken = process.env.JIRA_API_TOKEN || '';
    this.JWTSecret = process.env.JWT_SECRET || 'MyJwtSecret';
  }
}();
