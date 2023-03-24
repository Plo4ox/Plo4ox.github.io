import"./react-5d4b96d5.js";import{e as u}from"./react-router-d0b48985.js";import{c,b as f,E as d}from"./@remix-run-bb1230c9.js";/**
 * React Router DOM v6.8.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function s(){return s=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(r[a]=n[a])}return r},s.apply(this,arguments)}function w(r,e){return c({basename:e==null?void 0:e.basename,history:f({window:e==null?void 0:e.window}),hydrationData:(e==null?void 0:e.hydrationData)||m(),routes:u(r)}).initialize()}function m(){var r;let e=(r=window)==null?void 0:r.__staticRouterHydrationData;return e&&e.errors&&(e=s({},e,{errors:h(e.errors)})),e}function h(r){if(!r)return null;let e=Object.entries(r),n={};for(let[a,t]of e)if(t&&t.__type==="RouteErrorResponse")n[a]=new d(t.status,t.statusText,t.data,t.internal===!0);else if(t&&t.__type==="Error"){let o=new Error(t.message);o.stack="",n[a]=o}else n[a]=t;return n}var i;(function(r){r.UseScrollRestoration="useScrollRestoration",r.UseSubmitImpl="useSubmitImpl",r.UseFetcher="useFetcher"})(i||(i={}));var l;(function(r){r.UseFetchers="useFetchers",r.UseScrollRestoration="useScrollRestoration"})(l||(l={}));export{w as c};
