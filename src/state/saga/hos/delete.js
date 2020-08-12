import { put, takeEvery } from 'redux-saga/effects'
import * as api from '../../../api'

const makeDelete = apiCall => (
  type,
  deleteCall = api.deleteStory,
) => {

  function* handleDelete({ payload }) {
    const id = payload
    yield put({ type: `DELETE_${type}_LOADING`, payload: id })
    try {
      yield apiCall(deleteCall, id)
      yield put({ type: `DELETE_${type}_SUCCESS`, payload: id })
    } catch (error) {
      yield put({ type: `DELETE_${type}_FAILURE`, error, payload: id })
    }
  }

  return function* watchDelete() {
    yield takeEvery(`DELETE_${type}`, handleDelete)
  }
}

export default makeDelete
