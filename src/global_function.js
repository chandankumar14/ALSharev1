pe = require('parse-error'); //parses error so you can read error message and handle them accordingly
// The error returned by this function is handled in the error handler middleware in app.js.
createStatusCodeError = function (statusCode, message) {
  return Object.assign(new Error(), {
    statusCode,
    message,
  });
}

to = function (promise) { //global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
  return promise
    .then(data => {
      return [null, data];
    }).catch(err => [pe(err)]);
};

badRequestError = function (msg) {
  return createStatusCodeError(400, msg);
}

unverifiedError = function (message) {
  return createStatusCodeError(412, message);
}

blockedError = function (message) {
  return createStatusCodeError(409, message);
}

unverifiedError = function (message, body) {
  return createStatusCodeError(412, message, body);
}

forbiddenError = function (msg) {
  return createStatusCodeError(403, msg);
}

unauthorizedError = function (msg) {
  return createStatusCodeError(401, msg);
}

notFoundError = function (msg) {
  return createStatusCodeError(404, msg);
}

errorResponse = function (res, data, message, code) {
  res.statusCode = code;
  return res.json({
    success: false,
    code,
    data,
    message
  })
}

// Response handlers
successResponse = function (res, code, data, message) {
  return res.status(code || 200).json({
    success: true,
    data,
    message
  })
}

okResponse = function (res, data, message) {
  res.statusCode = 200;
  if (!message) {
    message = "";
  }
  return successResponse(res, 200, data, message);
}

createdResponse = function (res, data, message) {
  return successResponse(res, 201, data, message);
}

noContentResponse = function (res, message) {
  return successResponse(res, 204, {}, message);
}

// Utility functions
slugify = function (Text) {
  Text = Text || '';
  return Text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

basePath = function () {
  let baseurl = global.gconfig.URL
  return `${baseurl}/`;

}

ErrorResponse = function (message, code) {
  return Object.assign(new Error(), {
    message,
    code
  });
}

handleError = (err) => {
  return new Promise((resolve, reject) => {
    reject(err)
  })
}

getTodaysDate = () => {
  var date = new Date()
  date = date.toISOString()
  date = date.substr(0, 10)
  date = date.replace(/-/g, '')
  return date;
}