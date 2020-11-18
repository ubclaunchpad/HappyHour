### work in progress!!
#### instructions to test gcal

1) download oauth2 creds from GCP --> APIs
 & Services --> OAuth2.0 ClientIDs --> save as
  credentials.json to root directory
2) startup the server, `go run .` or with Docker
3) the main driver code is in test_gcal.go- there's one working endpoint there (the
  work-in-progress ones are commented): /createUserCalendar
4) the frontend makes a request to here, see
: frontend/src/components/LoginPage.vue
5) startup the frontend server: `yarn serve`
6) go to http://localhost:8080/login --> login
 with Google, choose an account
7) once the app is verified (consent screen and
 stuff), we should be able to retrieve the user
 's calendar blocks based on their GCal events
  between startTime & endTime. check this
   from the terminal window running our
    backend server (there's a function
     that simply prints these blocks). startTime
   & endTime for now are hardcoded in the
    code:) - it's a bit unclear to me
     what they will need to be, depending on
      our use cases, so please let me know if
       you have ideas about it (see backend
       /test_gcal lines 31 & 32).