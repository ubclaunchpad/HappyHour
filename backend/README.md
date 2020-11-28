## What's what
`main.go` - contains the actual source code for the Hello World example.
`go.mod` - contains dependency information
`Dockerfile` - contains instructions for how to build the Docker image
`test_firestore.go` - contains a test endpoint
 to save dummy data to firestore under the
  "test" collection

## Development
To run the app locally, do `go run .` in this directory.

### Docker
To build the container, do `docker build -t when3meet:latest .` and `docker run -p 8080:8080 when3meet:latest` to run it.

## Firebase Admin SDK
Documented [here](https://firebase.google.com/docs/admin/setup#:~:text=The%20Admin%20SDK%20lets%20you,data%20with%20full%20admin%20privileges.&text=Access%20Google%20Cloud%20Platform%20resources,associated%20with%20your%20Firebase%20projects.), the Admin SDK
 allows using Firebase services from our app. The steps to set this up are:
 1. Navigate to the project's [Firebase console
 ](https://console.firebase.google.com/u/2/project/when3meet-6fc22/overview).
 2. Go to `Project Settings` at the top left, and
  then to the `Service accounts` tab.
 3. On this page, click `Generate new private
  key` at the bottom, which will download a
   JSON file containing credentials to use the
    service account. 
 4. Assuming this file is located at the
  root `backend` folder, see `test_firestore.go` for an example usage. 
  
 NOTE: This file should be kept private, and
  shouldn't be committed.
  
## Google API Keys for Calendar Access
Google oauth2 credentials need to be
 downloaded from GCP:
 1. Go to APIs & Services tab on GCP 
 2. Download OAuth2.0 ClientIDs
 3. Save as `GoogleAPI.json` to root directory
 