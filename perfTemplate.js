'use strict';
module.exports = (obj) => {
  let str1 = `<html>
            <style>
                div {
                  font-family: arial, sans-serif;
                }
                table {
                  font-family: arial, sans-serif;
                  border-collapse: collapse;  
                  width: 100%;
                }
                td, th {
                  border: 1px solid #dddddd;
                  text-align: left;
                  padding: 8px;
                }
                tr:nth-child(even) {
                  background-color: #dddddd;
            </style>
            <body>
              <h2>Quick Read</h2>
              <div><p>Hey there! I ran a test of the page load speed of the anon home page of your website ${obj.targetSite}. <br/><br/>How did I do this? I acted as an anon user and ran some of my own checks and also got some real data from actual users data from Google's public data warehouse. </p>
              <p>    
              Remember page load speed should consider the user's entire experience and not just focus on a single moment.  Thus, it can't be reflected in a single number so I wanted to give you multiple data points to help you form an opinion on how fast your page loads for a user.</p>
           
              <p>So, let's start with some highlights. 

              <ul>
                <li>The total size of your page was <b>${obj.totPageMB}</b> (just saying that Google recommends that it be less than 0.5 MB).  In general, the more content that needs to be downloaded during the loading of a page, the slower the page. </li>
                <li>Based on a sample of real Chrome browser users visiting this page, about ${obj.cpdCtr}% of them see some content displayed on their screen in under a second (the higher the number the better). I abandon slow web sites do you?</li>
                <li>At ${obj.firstMeaningfulPaint} the user feels that the primary content of the page is displayed </li>
                <li>At ${obj.timeToInteractive} the page is displayed and able to consistently respond to user input</li>
                <li>As a note, tags on the page are making <b>${obj.thirdPartyCallsCtr}</b> calls to other (non-Audible) web sites while the page is being loaded for the first time. If you want even more details on the third party tags on your site, you know who to contact :)</li>
                </ul></p> 
              All the detailed data and links are below and can be used in conjunction with other data you are already collecting to effect performance changes. I'm sure your engineering buddies will be glad to help you make your page faster. </div>    
              <h2>Details</h2>
              <table>
                <tr>
                  <td>Target Website</td>
                  <td>${obj.targetSite}</td>
                </tr>
                <tr>
                  <td><a href="https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/">Total size of page</a></td>
                  <td>${obj.totPageSize}</td>
                </tr>
                <tr>
                  <td><a href="https://developers.google.com/web/tools/lighthouse/audits/bootup">Time for processing JavaScript during loading of page</a></td>
                  <td>${obj.jsParseTime}</td>
                </tr>
                  <td><a href="https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics">Distribution of time when first content displayed</a></td>
                  ${obj.contentfulPaintDistro}
                </tr>
                <tr>
                  <td><a href="https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint">First time meaningful content displayed</a></td>
                  <td>${obj.firstMeaningfulPaint}</td>
                </tr>
                <tr>
                <tr>
                  <td><a href="https://developers.google.com/web/updates/2018/05/first-input-delay">Distribution of time from when a user first interacts with page to when browser responds</a></td>
                  ${obj.inputDelayDistro}
                </tr>
                <tr>
                  <td><a href="https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint">Time something meaningful displayed</a></td>
                  <td>${obj.firstMeaningfulPaint}</td>
                </tr>
                <tr>
                  <td><a href="https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#time_to_interactive">Time when page displayed and responds to input</a></td>
                  <td>${obj.timeToInteractive}</td>
                </tr>
                <tr>
                  <td><a href="https://developers.google.com/web/tools/lighthouse/audits/critical-request-chains">Critical files being downloaded (for Engineering)</a></td>
                  <td>${obj.crc} </td>
                </tr>
                <tr>
                  <td>Large files downloaded by page</td>
                  <td>URI</td>
                </tr>
                <tr>
                  ${obj.largeAssetsDisplay} 
                </tr>
                <tr>
                  <td>Third party site calls during page load</td>
                  ${obj.thirdPartyCallsDisplay}
                </tr>
              </table>
            </body>
          </html>`;

        return str1;
}