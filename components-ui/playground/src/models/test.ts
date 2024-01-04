import {Test} from '@/domain/test';

export default {
  namespace: 'test',
  state: {
    count: 0,
  },

  effects: {
    *test({ payload, state }: any, { call, put }: any) {
      yield put({ type: 'testSuccess', data: 1 });
    },
  },
  reducers: {
    testSuccess(state: any, { data }) {
      const test = new Test(state.count);
      test.add(data);
      return test.toStates();
    },

    clear(state: any, action: any) {
      const test = new Test(state.count);
      test.clear();
      return test.toStates();
    },
  },
};
