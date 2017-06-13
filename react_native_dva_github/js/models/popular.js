import { queryPopularList } from '../services/github';
import logger from 'minimal-logger';

export default {
  namespace : 'popular',

  state : {
    items: [],
    page: 1,
    per_page: 10,
    noMore: false
  },

  effects : {
    *query({ payload }, {call, put}) {
      yield put({
        type: 'showLoading',
        payload: {
          ...payload.queryParams
        }
      });

      const data = yield call(queryPopularList, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            items: data.items,
            total_num: data.total_count
          }
        });
      }
    },

    *refresh({ payload }, {call, put}) {
      yield put({
        type: 'showLoading',
        payload: {
          ...payload.queryParams
        }
      });
      try {
        const data = yield call(queryPopularList, payload);
        if (data) {
          yield put({
            type: 'refreshSuccess',
            payload: {
              items: data.items,
              total_num: data.total_count
            }
          });
        }
      } catch (err) {
        yield put({type: 'refreshFailed'});
      }
    }
  },

  reducers : {
    showLoading(state) {
      return {
        ...state,
        loading: true
      };
    },
    querySuccess(state, action) {
      let payload = action.payload;

      let {page, noMore} = state;
      if (payload.total_num >= state.per_page) {
        page++;
      } else {
        noMore = true;
      }
      return {
        ...state,
        page: page,
        noMore: noMore,
        items: [
          ...state.items,
          ...payload.items
        ],
        loading: false
      };
    },
    showRefreshing(state) {
      return {
        ...state,
        loading: false,
        refreshing: true
      };
    },

    refreshSuccess(state, action) {
      let payload = action.payload;
      let {page, noMore} = state;
      page = 1;
      if (payload.total_num >= state.per_page) {
        page++;
      } else {
        noMore = true;
      }
      return {
        ...state,
        page: page,
        noMore: noMore,
        items: payload.items,
        loading: false,
        refreshing: false
      };
    },
    refreshFailed(state) {
      return {
        ...state,
        refreshing: false
      };
    }
  }
};
