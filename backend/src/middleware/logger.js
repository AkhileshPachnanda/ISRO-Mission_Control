import morgan from 'morgan'

// 'dev' format: METHOD /path STATUS response-time ms
export const logger = morgan('dev')