const BASE_URL = 'http://ingestionjob.sanil.me:3000';

export const GET_LIST_OF_FILES_URL = () => `${BASE_URL}/files/`;
export const GET_FILE_DETAIL_URL = (fileId) => `${BASE_URL}/file/${fileId}`;
export const SUBMIT_FILE_URL = () => `${BASE_URL}/files/`;
