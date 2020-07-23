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
