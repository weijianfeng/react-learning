import logger from 'minimal-logger';

function parseJSON(response) {
  // logger.log('parseJSON', JSON.stringify(response, null, 2));
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    logger.warn(response.status);
    return response;
  }
  logger.warn(response.status);
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function queryParams(params) {
  return Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function fetchRequest(url, options = {}) {
  logger.log('fetchRequest');

  options = {
    // your default options
    credentials: 'include',
    mode: 'no-cors',
    ...options
  };

  if (options.queryParams) {
    url += (url.indexOf('?') === -1
      ? '?'
      : '&') + queryParams(options.queryParams);
    delete options.queryParams;
  }

  logger.log(JSON.stringify(url, null, 2));
  return fetch(url, options).then(checkStatus).then(parseJSON).then(data => {
    logger.log(JSON.stringify(data, null, 2));
    return data;
  }).catch(error => {
    logger.error('error');
    error.response = error.response || {};
    if (!error.response) {
      logger.error(error.message);
    }
    if (error.response.status == 404) {
      logger.error(404);
    } else if (error.response.status == 302) {
      logger.error(302);
    } else {
      logger.error('other');
    }
    throw error;
  });
}

export default function request(url, options = {}) {
  return fetchRequest(url, options);
}
