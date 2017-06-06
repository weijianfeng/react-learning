import queryPopularList from '../services/github';

export default {
  namespace: 'popular',

  state: {
    items: [],
    toPage: 1,
    pageSize: 10,
    noMore: false
  },

  effects: {
    *query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
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
    *refresh({ payload }, { call, put }) {
      yield put({ type: 'showRefreshing' });
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
        yield put({ type: 'refreshFailed' });
      }
    }
  },

  reducers: {
    showLoading(state) {
      return {
        ...state,
        loading: true
      };
    },
    querySuccess(state, action) {
      let payload = action.payload;

      let { toPage, noMore } = state;
      if (payload.total_num >= state.pageSize) {
        toPage++;
      } else {
        noMore = true;
      }
      return {
        ...state,
        toPage: toPage,
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
      let { toPage, noMore } = state;
      toPage = 1;
      if (payload.total_num >= state.pageSize) {
        toPage++;
      } else {
        noMore = true;
      }
      return {
        ...state,
        toPage: toPage,
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
