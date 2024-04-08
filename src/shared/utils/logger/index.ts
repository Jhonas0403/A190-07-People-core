import pino from "pino";
import * as os from "os";
const version = process.env.APP_VERSION || '1.0.0';
const serviceName = process.env.APP_SERVICE_NAME || 'core-academics-schedule';

const loggerOptions: pino.LoggerOptions = {
  level: process.env.LOGGER_LEVEL || "info",  
  base: {
    serviceName,
    version,
    urlService: os.hostname + "",
    action: "logging", // startup, start/end Transaction, request to/response from name-service
    event: "", // request.method + ' ' + request.url,
    idTransaccion: "", // b36ef3340827654a
    responseTime: 0, // 500
    status: 0, // 200, 404, 500
    code: "", // EG000, EF000, ET000
  },
  timestamp: () => {
    return ',"time":"' + new Date().toISOString() + '"';
  },
  messageKey: "message",
  enabled: true,
};

const logger = pino(loggerOptions);

export default logger;

