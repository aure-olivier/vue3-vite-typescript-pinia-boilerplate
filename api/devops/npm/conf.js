/**
 * Global configuration object.
 */
module.exports = new class Configuration {
  constructor () {
    this.dev = process.env.TS_NODE_DEV === 'true';
  }
}();
