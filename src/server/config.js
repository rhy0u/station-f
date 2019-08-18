import convict from 'convict'
import path from 'path'

const DEFAULT_PUBLIC_PATH = path.join(__dirname, '../../public')

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  database: {
    url: {
      doc: 'the database url',
      env: 'DATABASE_URL',
      default: 'mongodb://localhost:27017/development',
    },
  },
  server: {
    secure: {
      doc: 'Specify if the server is using https or not.',
      format: Boolean,
      default: false,
    },
    externalUrl: {
      doc: 'The server external url',
      format: 'url',
      default: 'http://localhost:8000',
      env: 'EXTERNAL_URL',
    },
    sessionSecret: {
      env: 'SESSION_SECRET',
      doc: 'Session secret',
      format: String,
      default: 'the secret is here',
    },
    port: {
      doc: 'The server port number',
      format: 'port',
      default: 8000,
      env: 'PORT',
    },
    publicPath: {
      doc: 'The public path',
      format: String,
      default: DEFAULT_PUBLIC_PATH,
    },
  },
})

const env = config.get('env')
config.loadFile(path.join(__dirname, `../../config/${env}.json`))

config.validate()

export const getClientConfig = () => ({
  baseUrl: config.get('server.externalUrl'),
})

export default config
