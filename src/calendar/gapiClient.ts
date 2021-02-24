const googleCalendarClient = {
  apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  discoveryDocs: [process.env.VUE_APP_GOOGLE_DISCOVERY_DOC],
  scope: process.env.VUE_APP_GOOGLE_SCOPE
};

const gapiClient = {
  startClient(firstLogin: boolean) {
    return new Promise<any>((resolve, reject) => {
      gapi.load("client:auth2", () => {
        if (firstLogin) {
          console.log("first login!");
          return resolve(this.initClient());
        } else {
          console.log("not the first login!");
          this.getAllEvents();
          return resolve("done?");
        }
      });
    });
  },
  initClient() {
    return new Promise<gapi.auth2.GoogleUser>((resolve, reject) => {
      gapi.client
        .init(googleCalendarClient)
        .then(() => {
          return gapi.auth2.getAuthInstance().signIn();
        })
        .then((googleUser: any) => {
          console.log("resolving in initClient");
          return resolve(googleUser);
        })
        .catch((e: any) => {
          console.log("rejecting in initclient");
          return reject(e);
        });
    });
  },
  getAllEvents() {
    gapi.auth2.authorize(
      {
        // eslint-disable-next-line @typescript-eslint/camelcase
        client_id: googleCalendarClient.clientId,
        scope: googleCalendarClient.scope,
        prompt: "none"
      },
      authResponse => {
        console.log("authorized?????");
        console.log(authResponse);
        if (authResponse.error) {
          console.log("here's the error: " + authResponse.error);
        }
        gapi.client
          .request({
            path:
              "https://www.googleapis.com/calendar/v3/calendars/primary/events",
            params: {
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: "startTime"
            }
          })
          .then(res => {
            console.log("response!");
            console.log(res.body);
          })
          .catch(err => {
            console.log("error!");
            console.log(err);
          });
      }
    );
  }
};

export default gapiClient;
