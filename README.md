<!--
title: Audible Page Performance
description: Runs a performance check using Lambda for each web page configured based on synthetic and real user data. The check results in the creation of a web page that gets stored in a defined S3 bucket. 
layout: Doc
framework: v1
platform: AWS
language: nodeJS
authorLink: 'https://github.com/imoraes2006'
authorName: 'Ian Moraes'
authorAvatar: 'https://avatars0.githubusercontent.com/u/2223362?v=4&s=140'
-->
# Simple web page performance check

This example demonstrates how to setup a lambda function to transcribe your audio file (.wav format) into a text transcription. The lambda will be triggered whenever a new audio file is uploaded to S3 and the transcription (JSON format) will be saved to a S3 bucket.

## Use Cases

- Creates a web page that has output from a web page test of a configured URI

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
