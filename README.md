# Job Ingestion Queue System

This application allows the user to upload really large CSV files which are uploaded asynchronously.
Users also can use an API to poll for the status of the current file uploads.

## Installation

First install npm packages. This has to be done for both the data-app and web-app

```bash
cd data-app
npm install
```

```bash
cd web-app
npm install
```

Make sure you have docker and docker-compose installed.
If you do, just run the following command after doing a git clone

```bash
docker-compose up
```

## Usage

