// Helpers
import { Logger } from './helpers/logger';
import conf from './helpers/conf';
import { server } from './helpers/server';
// Constants
const logger = new Logger('/app.ts');

server.listen(conf.port, () => {
  logger.info(`Service running on port "${conf.port}"`);
});
