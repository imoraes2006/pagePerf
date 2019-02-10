'use strict';

const fs = require('fs');
const createString = require('./perfTemplate.js');
const consts = require('./constants.js');
const roundTo = require('round-to');

/**
 * stripEndOfUrl() rips out the query params
 * at the end of Url
 */
function stripEndOfUrl(val) {
  const firstCut = val.indexOf('.');
  let s1 = val;
  let secondCut = val.indexOf(';', firstCut);
  if (secondCut < 0) {
    secondCut = val.indexOf('?', firstCut);
  }
  if (secondCut < 0) {
    secondCut = val.indexOf('%', firstCut);
  }
  if (secondCut > 0) {
    s1 = val.substring(0, secondCut);
  }
  return s1;
}

/**
 * getContentfulPaintDistro() gets the Contentful Paint
 * distribution in an html string
 */
function getContentfulPaintDistro(obj) {
  const cpd = obj.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions;
  let distroLine = '';
  let distro1 = '';
  let underASec = 0;
  cpd.forEach(function(value) {
    let distro = `More than ${value.min}ms`;
    if (value.max !== undefined) {
      distro = `${value.min}-${value.max}ms`;
    }
    let prop1 = value.proportion * 100;
    prop1 = roundTo(prop1, 2);
    if (value.min === 0) {
      underASec = prop1;
    }
    distro1 = `${distro}: ${prop1}% <br>`;
    distroLine += distro1;
  });
  distroLine = `<td>${distroLine}</td>`;
  const cpdOutput = {
    ctr: underASec,
    display: distroLine
  };
  return cpdOutput;
}

/**
 * getFirstInputDelayDistro() gets the First Input Delay
 * distribution in an html string
 */
function getFirstInputDelayDistro(obj) {
  const fid = obj.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.distributions;
  let distroLine = '';
  let distro1 = '';
  fid.forEach(function(value) {
    let distro = '';
    if (value.max === undefined) {
      distro = `More than ${value.min}ms`;
    } else {
      distro = `${value.min}-${value.max}ms`;
    }
    let prop1 = value.proportion * 100;
    prop1 = roundTo(prop1, 2);
    distro1 = `${distro}: ${prop1}% <br>`;
    distroLine += distro1;
  });
  distroLine = `<td>${distroLine}</td>`;
  return distroLine;
}

/**
 * getThirdPartyCalls() gets the list of 3P calls in an
 * html string
 */
function getThirdPartyCalls(obj) {
  const objThirdP =  obj['network-requests'].details.items;
  let thirdPLine = '';
  let ctrThirdParty = 0;
  objThirdP.forEach(function(value) {
    const val = value.url;
    const firstCut = val.indexOf('.');
    const secondCut = val.indexOf(consts.AMAZON_DOMAIN, firstCut);
    if (secondCut < 0) {
      const thirdCut = val.indexOf(consts.AUDIBLE_DOMAIN, firstCut);
      if (thirdCut < 0) {
        const fourthCut = val.indexOf(consts.DATA_URI, firstCut);
        if (fourthCut < 0) {
          const latency = roundTo((value.endTime - value.startTime), 2);
          const strippedUrl = stripEndOfUrl(value.url);
          ctrThirdParty++;
          thirdPLine += `${strippedUrl} took ${latency}ms<br>`;
        }
      }
    }
  });

  const badBoys = `<td>There were ${ctrThirdParty} third party calls during initial page load<br>${thirdPLine}</td>`;
  const thirdParty = {
    ctr: ctrThirdParty,
    display: badBoys
  };
  return thirdParty;
}

/**
 * getFileName() rips out asset name from URI
 */
function getFileName(str) {
  // strip out after domain name
  const n = str.lastIndexOf('/');
  const queryParamId = str.indexOf('?');
  let val = str;
  if (n > 0) {
    // if str only comprises query param and no asset name
    if ((n + 1) === queryParamId) {
      val = str.substring(0, n);
    } else {
      val = str.substring(n + 1);
    }
  }
  return val;
}

/**
 * getLargeItems() gets the list of large assets for page in an
 * html string
 */
function getLargeItems(obj1) {
  let large = '';
  let summary = consts.NO_LARGE_ITEM_SUMMARY;
  let bigFiles = false;
  const tbw = obj1['total-byte-weight'].details.items;
  tbw.forEach(function(value) {
    if (value.totalBytes > consts.MAX_ASSET_LIMIT) {
      bigFiles = true;
      const size1 = (value.totalBytes) / 1000000;
      const fileName = getFileName(value.url);
      large += `<td>${fileName}</td><td>${size1} MB</td>`;
    }
  });
  if (!bigFiles) {
    large = '<td>No big files</td>ns';
  } else {
    summary = consts.LARGE_ITEM_SUMMARY;
  }
  const largeItems = {
    summaryDisplay: summary,
    display: large
  };
  return largeItems;
}

/**
 * getTarget() gets the list of large assets for page in an
 * html string
 */
function getTarget(obj) {
  let target = obj.loadingExperience.id;
  const cut = target.indexOf('?');
  if (cut > 0) {
    target = target.substring(0, cut - 1);
  }
  return target;
}

/**
 * getTotalPageSize() gets the size of the page
 */
function getTotalPageSize(obj) {
  const val = obj['total-byte-weight'].displayValue;
  return val;
}

/**
 * getJSParseTime() gets time to parse JS during page load
 */
function getJSParseTime(obj) {
  const val = obj['bootup-time'].displayValue;
  return val;
}

/**
 * convertToMB() get page size in MB
 */
function convertToMB(str) {
  let mbVal = -1;
  let str1 = 'None';
  if ((str !== null) || (str !== '')) {
    const cut = str.indexOf('Total Size was ');
    if (str.length > 3) {
      str1 = str.substring(cut + 16, str.length - 3);
      str1 = str1.replace(',', '');
      mbVal = roundTo(parseInt(str1, 10) / 1000, 2);
    }
  }
  if (mbVal === -1) {
    str1 = str;
  } else {
    str1 = mbVal + ' MB';
  }
  return str1;
}

/**
 * getFirstMeaningfulPaint() gets the First Meaningful Paint value
 */
function getFirstMeaningfulPaint(obj) {
  const val = obj['first-meaningful-paint'].displayValue;
  return val;
}

/**
 * getTimeToInteractive() gets the TTI value
 */
function getTimeToInteractive(obj) {
  const val = obj['interactive'].displayValue;
  return val;
}

/**
 * getCriticalRequestChains() gets the resources in the critical path
 */
function getCriticalRequestChains(obj) {
  const val = obj['critical-request-chains'].displayValue;
  return val;
}

module.exports = (obj) => {
  let html = '';
  const obj1 = obj.lighthouseResult.audits;
  const contentfulPaintDistro = getContentfulPaintDistro(obj);
  const fidDistro = getFirstInputDelayDistro(obj);
  const thirdPartyCalls = getThirdPartyCalls(obj1);
  const totalSize = getTotalPageSize(obj1);
  const javaScriptParseTime = getJSParseTime(obj1);
  const totalPageMB = convertToMB(totalSize);
  const tTI = getTimeToInteractive(obj1);
  const fMPaint = getFirstMeaningfulPaint(obj1);
  const largeAssets = getLargeItems(obj1);
  const targetSiteName = getTarget(obj);
  const largeFileDisplay = largeAssets.display;
  const largeAssetsOverview = largeAssets.summaryDisplay;
  const thirdPtyCallsDisplay = thirdPartyCalls.display;
  const thirdPtyCallsCtr = thirdPartyCalls.ctr;
  const critReqChains = getCriticalRequestChains(obj1);
  const core = {
    targetSite: targetSiteName,
    totPageMB: totalPageMB,
    cpdCtr: contentfulPaintDistro.ctr,
    contentfulPaintDistro: contentfulPaintDistro.display,
    firstMeaningfulPaint: fMPaint,
    thirdPartyCallsCtr: thirdPtyCallsCtr,
    largeAssetsSummary: largeAssetsOverview,
    jsParseTime: javaScriptParseTime,
    timeToInteractive: tTI,
    inputDelayDistro: fidDistro,
    largeAssetsDisplay: largeFileDisplay,
    crc: critReqChains,
    thirdPartyCallsDisplay: thirdPtyCallsDisplay,
    totPageSize: totalSize
  };
  // pass data to creaee HTML page
  html = createString(core);
  return html;
};
