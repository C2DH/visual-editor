import { put, fork } from 'redux-saga/effects'
import { identity } from 'lodash'
import { takeLatestAndCancel } from '../effects'

// Saga for a generic paginated collection
const makeCollection = apiCall => (
  actionType,
  apiFn,
  selectState,
  pageSize = 1000,
  transform = identity,
) => {
  function* handleGetCollection({ payload: { params }  }) {
    yield put({ type: `${actionType}_LOADING` })
    try {
      const { results, count } = yield apiCall(apiFn, {
        limit: pageSize,
        ...params,
      })
      yield put({
        type: `${actionType}_SUCCESS`,
        payload: {
          results: transform(results),
          count,
        },
      })
    } catch (error) {
      yield put({ type: `${actionType}_FAILURE`, error })
    }
  }

  return function* watchGetCollection() {
    yield fork(
      takeLatestAndCancel,
      actionType,
      `${actionType}_UNLOAD`,
      handleGetCollection
    )
  }
}

export default makeCollection
