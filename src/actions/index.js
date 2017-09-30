import { markdown } from 'markdown';
import Helpers from '../helpers';

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

export const STACK_NAVI = {
  HOME: { type: 'NAVI_HOME', routeName: 'Home' },
  TREE: { type: 'NAVI_TREE', routeName: 'Tree' },
};

export const TAB_NAVI = {
  REMOTE: { type: 'NAVI_HOME_REMOTE', routeName: 'Remote' },
  LOCAL: { type: 'NAVI_HOME_LOCAL', routeName: 'Local' },
};

const switchStackNavi = {
  home: () => ({
    type: STACK_NAVI.HOME.type,
    routeName: STACK_NAVI.HOME.routeName,
  }),
  tree: () => ({
    type: STACK_NAVI.TREE.type,
    routeName: STACK_NAVI.TREE.routeName,
  }),
};

const switchTabNavi = {
  remote: () => ({
    type: TAB_NAVI.REMOTE.type,
    routeName: TAB_NAVI.REMOTE.routeName,
  }),
  local: () => ({
    type: TAB_NAVI.LOCAL.type,
    routeName: TAB_NAVI.LOCAL.routeName,
  }),
};

export default class Actions {
    static fetchSampleMD = fetchSampleMD;
    static switchStackNavi = switchStackNavi;
    static switchTabNavi = switchTabNavi;
}
