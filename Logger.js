const Logger = {
  log: (level, message, metadata = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...metadata,
    };
    localStorage.setItem('logs', JSON.stringify([...(JSON.parse(localStorage.getItem('logs') || '[]')), logEntry]));
  },
  info: (message, metadata) => Logger.log('INFO', message, metadata),
  error: (message, metadata) => Logger.log('ERROR', message, metadata),
  warn: (message, metadata) => Logger.log('WARN', message, metadata),
};

export default Logger;