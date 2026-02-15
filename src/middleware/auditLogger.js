import logger from '../utils/logger.js';

export const auditLogger = (action) => {
  return (req, res, next) => {
    const userId = req.user?.id || req.user?._id || 'anonymous';
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip || req.connection.remoteAddress;

    logger.info(`[AUDIT] Action: ${action} | User: ${userId} | ${method} ${url} | IP: ${ip}`);

    res.on('finish', () => {
      logger.debug(`[AUDIT COMPLETE] ${method} ${url} -> Status: ${res.statusCode}`);
    });

    next();
  };
};

export default auditLogger;
