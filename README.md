# Serverless TypeScript Template

Want to develop serverless applications with TypeScript on AWS? This is the project template for you.

## Features

* NPM v7 workspace monorepo
* Infrastructure as code: [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/home.html)
* [JetKit/CDK anti-framework](https://www.jetkit.dev/)

## Quickstart

Peruse the [@jetkit/cdk README](https://github.com/jetbridge/jetkit-cdk#readme) and [documentation](https://www.jetkit.dev/).

1. [Use this template to start a new repo](https://github.com/jetbridge/jkv2-ts-template/generate).
1. Install dependencies:

    ```shell
    npm i -g aws-cdk@latest npm@latest
    npm i
    ```

1. Start developing:

    ```shell
    npm run start
    ```

1. Deploy backend and infrastructure:

    ```shell
    npm run deploy:infra
    ```
