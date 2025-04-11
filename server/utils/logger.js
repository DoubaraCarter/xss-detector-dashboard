function logger(input, ip, detectionResult) {
    return {
      input,
      ip,
      detectedAt: new Date().toISOString(),
      severity: detectionResult.severity,
      isMalicious: detectionResult.isMalicious,
      matchedPatterns: detectionResult.matches,
    };
  }
  
  module.exports = logger;
  