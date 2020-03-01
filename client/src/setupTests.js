// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
// import fetch from "jest-fetch-mock";

// mock local storage if necessary
// const localStorageMock = {
//     getItem: jest.fn(),
//     setItem: jest.fn(),
//     removeItem: jest.fn(),
//     clear: jest.fn(),
//   };
//   global.localStorage = localStorageMock;

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

// mock global Fetch API
// require("jest-fetch-mock").enableMocks();
// fetch.enableMocks();
// global.fetch = require("node-fetch");

import fetch from "./__mocks__/fetch";

global.fetch = fetch;
// {"children":
// <Provider store={{"dispatch": [Function dispatch], "getState": [Function getState], "replaceReducer": [Function replaceReducer], "subscribe": [Function subscribe], Symbol(observable): [Function observable]}}><withRouter(SearchForm) /></Provider>
// , "history": {"action": "POP", "block": [Function block], "canGo": [Function canGo], "createHref": [Function createPath], "entries": [{"hash": "", "key": "cb11by", "pathname": "/", "search": "", "state": undefined}], "go": [Function go], "goBack": [Function goBack], "goForward": [Function goForward], "index": 0, "length": 1, "listen": [Function listen], "location": {"hash": "", "key": "cb11by", "pathname": "/", "search": "", "state": undefined}, "push": [Function push], "replace": [Function replace]}
// }
