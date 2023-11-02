const errorObj = {
  'any.required': 400,
  'string.empty': 400,
  'string.email': 400,
  'string.min': 400,
  CONFLICT: 409,
  'BAD REQUEST': 400,
};

const objMessage = {
  'Some required fields are missing': ['any.required', 'string.empty'],
  'Invalid fields': ['string.email', 'string.min', 'object.unknown'],
  'User already registered': ['CONFLICT'],
};

const errorGenerator = (errorType, erMessage = '') => {
  const status = errorObj[errorType] || 500;
  let payload = erMessage;
  if (payload !== '') return { status, payload: { message: payload } };
  payload = Object.entries(objMessage).find((errors) => {
    const [message, arr] = errors;
    if (arr.includes(errorType)) {
      return message;
    }
    return undefined;
  });
  payload = payload ? payload[0] : errorType;
  return { status, payload: { message: payload } };
};

module.exports = {
  errorGenerator,
};
