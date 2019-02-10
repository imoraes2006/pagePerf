<!--
title: Web Page Performance Check
description: Runs a performance check using Lambda for each web page configured based on synthetic and real user data. The check results in the creation of a web page that gets stored in a defined S3 bucket. 
layout: Doc
framework: v1
platform: AWS
language: nodeJS
authorLink: 'https://github.com/imoraes2006'
authorName: 'Ian Moraes'
authorAvatar: 'https://avatars0.githubusercontent.com/u/2223362?v=4&s=140'
-->
# Web Page Performance Check 

Tool that runs a performance check each web page configured (e.g., anon Home Page for global web sites--US, EU and APAC sites).  It collects both synthetic and real user data on the page's performance. The check results in the creation of a report (HTML version) for that page that gets stored in a configured S3 bucket. The name of the report uses a date time stamp and domain name.  

The report provides a summary that can be consumed by business and marketing partners.   The tool will data such as: total size of page, time for processing JS during page load, presents sample of real user data of when content is first displayed, first time meaningful content displayed, find any large files being downloaded, and explicitly list third party calls and their latency during page load.

Some advantages of this tool:
- Report can be useful for our business and marketing partners.  It provides performance explanations in an understandable format.
- Complements existing tools and metrics.  It provides performance data not provided by team's current toolset.
- Maintenance and licensing costs are negligible.  There is no licensing cost and no hosts to maintain as serverless will be used


## Use Cases

- Runs a page performance check for a web page and produces a report that gets stored in S3

## Setup

- Edit `serverless.yml` and configure the S3 bucket: 
`bucket: <S3 bucket name>`

- Make sure region is defined correctly

- Enable permissions to allow lambda function to store report in S3 bucket

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```


## Usage
In order to execute manually simply run
```bash
- tester
```bash
- Report (html version) of performance check is created in the configured S3 bucket
