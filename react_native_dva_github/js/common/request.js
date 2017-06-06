import logger from 'minimal-logger';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  logger.warn(response.status + response.statusText);
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function queryParams(params) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function fetchRequest(url, options = {}) {
  logger.warn('fetchRequest');

  options = {
    // your default options
    credentials: 'include',
    mode: 'no-cors',
    redirect: 'error',
    ...options
  };

  if (options.queryParams) {
    url +=
      (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams);
    delete options.queryParams;
  }

  if (options.showLoading) {
    //Toast.loading('', 600000);
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      if (options.showLoading) {
        //Toast.hide();
      }

      return data;
    })
    .catch(error => {
      if (options.showLoading) {
        //Toast.hide();
      }

      error.response = error.response || {};
      if (!error.response) {
        logger.error(error.message);
      }
      if (error.response.status == 404) {
        //Toast.fail(`请求的服务:${error.response.url}不存在`);
      } else if (error.response.status == 302) {
        //Toast.fail(`会话超时，请重新进入`);
      } else {
        //Toast.fail(`服务异常:${error.response.status} ${JSON.stringify(error)}`);
      }
      throw error;
    });
}

export default function request(url, options = {}) {
  return fetchRequest(url, options);
}
