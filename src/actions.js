import { markdown } from 'markdown';
import Helpers from './helpers';

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
    ast: markdown.parse(rawText),
    tree: Helpers.nestByHeaderLevel(markdown.parse(rawText)),
    url,
  }),
};

const fetchSampleMD = url => ((dispatch) => {
  dispatch(sampleMD.request(url));
  return fetch(url)
    .then(response => response.text())
    .then(rawText => dispatch(sampleMD.receive(url, rawText)));
});

export const NAVI = {
  HOME: { type: 'NAVI_HOME', routeName: 'Home' },
  TREE: { type: 'NAVI_TREE', routeName: 'Tree' },
};

const switchNavi = {
  home: () => ({
    type: NAVI.HOME.type,
    routeName: NAVI.HOME.routeName,
  }),
  tree: () => ({
    type: NAVI.TREE.type,
    routeName: NAVI.TREE.routeName,
  }),
};

export default class Actions {
    static fetchSampleMD = fetchSampleMD;
    static switchNavi = switchNavi;
}
