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

Runs a performance check using Lambda for each web page configured and pulls from synthetic and real user data. The check results in the creation of a report (HTML version) for that page that gets stored in a configured S3 bucket.  

## Use Cases

- Transcribe your audio file (voice messages, phone recordings) to text using AWS Transcribe

## Setup

- Edit `serverless.yml` and configure the S3 bucket: 
`bucket: <S3 bucket name>`

- Make sure region is defined correctly

## Deploy

In order to deploy the you endpoint simply run

```bash
serverless deploy
```


## Usage

- tester
- html file describing performance will be created in the configured S3 bucket
