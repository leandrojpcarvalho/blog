const errorObj = {
  'any.required': 400,
  'string.empty': 400,
  'string.email': 400,
  'string.min': 400,
};

const objMessage = {
  'Some required fields are missing': ['any.required', 'string.empty'],
  'Invalid fields': ['string.email', 'string.min', 'object.unknown'],
};

const errorGenerator = (errorType) => {
  const errorCode = errorObj[errorType] || 500;
  let errorMessage = Object.entries(objMessage).find((errors) => {
    const [message, arr] = errors;
    if (arr.includes(errorType)) {
      return message;
    }
    return undefined;
  });
  errorMessage = errorMessage ? errorMessage[0] : errorType;
  return { errorCode, errorMessage };
};

module.exports = {
  errorGenerator,
};
