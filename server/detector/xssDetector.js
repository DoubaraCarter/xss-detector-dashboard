// Define patterns for various types of XSS attack vectors
const xssPatterns = [
    /<script.*?>.*?<\/script>/gi,
    /javascript:[^"'\s]+/gi,
    /on\w+\s*=\s*["']?[^"'>]+["']?/gi,
    /<.*?on\w+=.*?>/gi,
    /<img[^>]+onerror\s*=\s*["']?[^"'>]+["']?/gi,
    /s[\s\S]*?c[\s\S]*?r[\s\S]*?i[\s\S]*?p[\s\S]*?t/gi,
    /%3C.*?script.*?%3E/gi,
    /data:text\/html;base64,([a-zA-Z0-9+/=]+)/gi,
    /<iframe.*?>.*?<\/iframe>/gi,
    /<(svg|math|foreignObject).*?>.*?<\/(svg|math|foreignObject)>/gi,
    /<(object|embed).*?>.*?<\/(object|embed)>/gi,
  ];
  
  // Main detection function
  function xssDetector(input) {
    let severity = 'safe';
    let matches = [];
  
    xssPatterns.forEach(pattern => {
      const found = input.match(pattern);
      if (found) {
        matches.push(...found);
      }
    });
  
    if (matches.length >= 3) {
      severity = 'high';
    } else if (matches.length === 2) {
      severity = 'medium';
    } else if (matches.length === 1) {
      severity = 'low';
    }
  
    return {
      isMalicious: matches.length > 0,
      severity,
      matches,
    };
  }
  
  module.exports = xssDetector;
  