export const DOCUMENT = 'DOCUMENT';

export const GET_DOCUMENTS = 'GET_DOCUMENTS';
export const GET_DOCUMENTS_SUCCESS = 'GET_DOCUMENTS_SUCCESS'
export const GET_DOCUMENTS_UNLOAD = "GET_DOCUMENTS_UNLOAD";

export const loadDocuments = (params = {}) => ({
  type: GET_DOCUMENTS,
  payload: {
    params,
    reset: true
  }
});

export const loadMoreDocuments = (params = {}) => ({
  type: GET_DOCUMENTS,
  payload: {
    params,
    crossFacets: false,
    reset: false
  }
});

export const unloadDocuments = () => ({
  type: GET_DOCUMENTS_UNLOAD
});

export const DELETE_DOCUMENT = 'DELETE_DOCUMENT';
export const DELETE_DOCUMENT_LOADING = 'DELETE_DOCUMENT_LOADING';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_FAILURE = 'DELETE_DOCUMENT_FAILURE';
export const deleteDocument = (id) => ({
  type: DELETE_DOCUMENT,
  payload: id
});
