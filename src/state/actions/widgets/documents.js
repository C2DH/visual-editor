export const CHOOSE_DOCUMENT = 'CHOOSE_DOCUMENT'

export const chooseDocument = (doc) => ({
  type: CHOOSE_DOCUMENT,
  payload: doc,
})

export const SELECT_DOCUMENT = 'SELECT_DOCUMENT'
export const selectDocument = (docId) => ({
  type: SELECT_DOCUMENT,
  payload: docId,
})

export const SELECT_DOCUMENTS = 'SELECT_DOCUMENTS'
export const selectDocuments = (docIds) => ({
  type: SELECT_DOCUMENTS,
  payload: docIds,
})

export const UNSELECT_DOCUMENT = 'UNSELECT_DOCUMENT'
export const unselectDocument = (docId) => ({
  type: UNSELECT_DOCUMENT,
  payload: docId,
})

export const UNSELECT_DOCUMENTS = 'UNSELECT_DOCUMENTS'
export const unselectDocuments = (docIds) => ({
  type: UNSELECT_DOCUMENTS,
  payload: docIds,
})

export const SELECT_ALL_DOCUMENTS = 'SELECT_ALL_DOCUMENTS'
export const selectAllDocuments = (params = {}) => ({
  type: SELECT_ALL_DOCUMENTS,
  payload: {
    params,
  }
})

export const UNSELECT_ALL_DOCUMENTS = 'UNSELECT_ALL_DOCUMENTS'
export const unselectAllDocuments = () => ({
  type: UNSELECT_ALL_DOCUMENTS,
})

export const SELECTION_DONE = 'SELECTION_DONE'
export const selectionDone = () => ({
  type: SELECTION_DONE,
})
