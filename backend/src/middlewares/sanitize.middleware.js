const sanitizeHtml = require('sanitize-html');

function sanitizeValue(value) {
  if (typeof value === 'string') return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });
  if (Array.isArray(value)) return value.map(sanitizeValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, sanitizeValue(v)]));
  }
  return value;
}

module.exports = function sanitize(req, res, next) {
  req.body = sanitizeValue(req.body);
  req.query = sanitizeValue(req.query);
  next();
};