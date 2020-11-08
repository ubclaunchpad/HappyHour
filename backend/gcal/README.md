Steps to run:
1) Get OAuth 2.0 Client IDs from GCP: Go to
 project's GCP console, then APIs & Services
 , then Credentials, and download OAuth 2.0
  Client IDs to the project directory. This
   file will be used in the code to get an access
    token to
    use the Google APIs. <br/>
NOTE: The way this works now is not ideal as we
 need to manually visit a URL and copy an
  authorization code to the terminal in order
   to get an access token. However, once
    Firebase authentication with Google is
     implemented
    , this will give us an access token that
     the frontend can pass over to the backend.
2) Run the project: go run . <br/>
3) Check: Go to project's Google Calendar, and
 check if all the future events were retrieved
 , and the event hardcoded in the code was created
  successfully. 