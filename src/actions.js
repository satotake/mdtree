import { markdown } from 'markdown';

export const SAMPLEMD = {
  REQUEST: 'SAMPLEMD_REQUEST',
  RECEIVE: 'SAMPLEMD_RECEIVE',
};

const sampleMD = {
  request: url => ({
    type: SAMPLEMD.REQUEST,
    url,
  }),
  receive: (url, rawText) => ({
    type: SAMPLEMD.RECEIVE,
    receivedAt: Date.now(),
    ast: markdown.parse(rawText),
    url,
  }),
};

const fetchSampleMD = url => ((dispatch) => {
  dispatch(sampleMD.request(url));
  return fetch(url)
    .then(response => response.text())
    .then(rawText => dispatch(sampleMD.receive(url, rawText)));
});

export default class Actions {
    static fetchSampleMD = fetchSampleMD;
}
