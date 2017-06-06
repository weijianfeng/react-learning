import request from '../common/request';

export function queryPopularList(options) {
  return request('http://api.github.com/search/repositories', {
    ...options
  });
}
