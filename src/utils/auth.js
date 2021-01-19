import auth0 from "auth0-js"
import { navigate } from "gatsby"
import Auth0Lock from 'auth0-lock';



const isBrowser = typeof window !== "undefined"

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false,
}

let user = {}
let hash = "";
const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other'},
];

const classOptions = [
  { value: 'Private', label: 'Private' },
  { value: 'Group', label: 'Group' },
];

const engLevelOptions = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Low-Intermediate', label: 'Low-Intermediate' },
  { value: 'Intermediate', label: 'Intermediate'},
  { value: 'High', label: 'High'},
  { value: 'Fluent', label: 'Fluent'},
];

const timeOptions = [
  {
    value: "GMT-12:00",
    label: "Etc/GMT-12"
  },
  {
    value: "GMT-11:00",
    label: "Etc/GMT-11"
  },
  {
    value: "GMT-11:00",
    label: "Pacific/Midway"
  },
  {
    value: "GMT-10:00",
    label: "America/Adak"
  },
  {
    value: "GMT-09:00",
    label: "America/Anchorage"
  },
  {
    value: "GMT-09:00",
    label: "Pacific/Gambier"
  },
  {
    value: "GMT-08:00",
    label: "America/Dawson_Creek"
  },
  {
    value: "GMT-08:00",
    label: "America/Ensenada"
  },
  {
    value: "GMT-08:00",
    label: "America/Los_Angeles"
  },
  {
    value: "GMT-07:00",
    label: "America/Chihuahua"
  },
  {
    value: "GMT-07:00",
    label: "America/Denver"
  },
  {
    value: "GMT-06:00",
    label: "America/Belize"
  },
  {
    value: "GMT-06:00",
    label: "America/Cancun"
  },
  {
    value: "GMT-06:00",
    label: "America/Chicago"
  },
  {
    value: "GMT-06:00",
    label: "Chile/EasterIsland"
  },
  {
    value: "GMT-05:00",
    label: "America/Bogota"
  },
  {
    value: "GMT-05:00",
    label: "America/Havana"
  },
  {
    value: "GMT-05:00",
    label: "America/New_York"
  },
  {
    value: "GMT-04:30",
    label: "America/Caracas"
  },
  {
    value: "GMT-04:00",
    label: "America/Campo_Grande"
  },
  {
    value: "GMT-04:00",
    label: "America/Glace_Bay"
  },
  {
    value: "GMT-04:00",
    label: "America/Goose_Bay"
  },
  {
    value: "GMT-04:00",
    label: "America/Santiago"
  },
  {
    value: "GMT-04:00",
    label: "America/La_Paz"
  },
  {
    value: "GMT-03:00",
    label: "America/Argentina/Buenos_Aires"
  },
  {
    value: "GMT-03:00",
    label: "America/Montevideo"
  },
  {
    value: "GMT-03:00",
    label: "America/Araguaina"
  },
  {
    value: "GMT-03:00",
    label: "America/Godthab"
  },
  {
    value: "GMT-03:00",
    label: "America/Miquelon"
  },
  {
    value: "GMT-03:00",
    label: "America/Sao_Paulo"
  },
  {
    value: "GMT-03:30",
    label: "America/St_Johns"
  },
  {
    value: "GMT-02:00",
    label: "America/Noronha"
  },
  {
    value: "GMT-01:00",
    label: "Atlantic/Cape_Verde"
  },
  {
    value: "GMT",
    label: "Europe/Belfast"
  },
  {
    value: "GMT",
    label: "Africa/Abidjan"
  },
  {
    value: "GMT",
    label: "Europe/Dublin"
  },
  {
    value: "GMT",
    label: "Europe/Lisbon"
  },
  {
    value: "GMT",
    label: "Europe/London"
  },
  {
    value: "UTC",
    label: "UTC"
  },
  {
    value: "GMT+01:00",
    label: "Africa/Algiers"
  },
  {
    value: "GMT+01:00",
    label: "Africa/Windhoek"
  },
  {
    value: "GMT+01:00",
    label: "Atlantic/Azores"
  },
  {
    value: "GMT+01:00",
    label: "Atlantic/Stanley"
  },
  {
    value: "GMT+01:00",
    label: "Europe/Amsterdam"
  },
  {
    value: "GMT+01:00",
    label: "Europe/Belgrade"
  },
  {
    value: "GMT+01:00",
    label: "Europe/Brussels"
  },
  {
    value: "GMT+02:00",
    label: "Africa/Cairo"
  },
  {
    value: "GMT+02:00",
    label: "Africa/Blantyre"
  },
  {
    value: "GMT+02:00",
    label: "Asia/Beirut"
  },
  {
    value: "GMT+02:00",
    label: "Asia/Damascus"
  },
  {
    value: "GMT+02:00",
    label: "Asia/Gaza"
  },
  {
    value: "GMT+02:00",
    label: "Asia/Jerusalem"
  },
  {
    value: "GMT+03:00",
    label: "Africa/Addis_Ababa"
  },
  {
    value: "GMT+03:00",
    label: "Asia/Riyadh89"
  },
  {
    value: "GMT+03:00",
    label: "Europe/Minsk"
  },
  {
    value: "GMT+03:30",
    label: "Asia/Tehran"
  },
  {
    value: "GMT+04:00",
    label: "Asia/Dubai"
  },
  {
    value: "GMT+04:00",
    label: "Asia/Yerevan"
  },
  {
    value: "GMT+04:00",
    label: "Europe/Moscow"
  },
  {
    value: "GMT+04:30",
    label: "Asia/Kabul"
  },
  {
    value: "GMT+05:00",
    label: "Asia/Tashkent"
  },
  {
    value: "GMT+05:30",
    label: "Asia/Kolkata"
  },
  {
    value: "GMT+05:45",
    label: "Asia/Katmandu"
  },
  {
    value: "GMT+06:00",
    label: "Asia/Dhaka"
  },
  {
    value: "GMT+06:00",
    label: "Asia/Yekaterinburg"
  },
  {
    value: "GMT+06:30",
    label: "Asia/Rangoon"
  },
  {
    value: "GMT+07:00",
    label: "Asia/Bangkok"
  },
  {
    value: "GMT+07:00",
    label: "Asia/Novosibirsk"
  },
  {
    value: "GMT+08:00",
    label: "Etc/GMT+8"
  },
  {
    value: "GMT+08:00",
    label: "Asia/Hong_Kong"
  },
  {
    value: "GMT+08:00",
    label: "Asia/Krasnoyarsk"
  },
  {
    value: "GMT+08:00",
    label: "Australia/Perth"
  },
  {
    value: "GMT+08:45",
    label: "Australia/Eucla"
  },
  {
    value: "GMT+09:00",
    label: "Asia/Irkutsk"
  },
  {
    value: "GMT+09:00",
    label: "Asia/Seoul"
  },
  {
    value: "GMT+09:00",
    label: "Asia/Tokyo"
  },
  {
    value: "GMT+09:30",
    label: "Australia/Adelaide"
  },
  {
    value: "GMT+09:30",
    label: "Australia/Darwin"
  },
  {
    value: "GMT+09:30",
    label: "Pacific/Marquesas"
  },
  {
    value: "GMT+10:00",
    label: "Etc/GMT+10"
  },
  {
    value: "GMT+10:00",
    label: "Australia/Brisbane"
  },
  {
    value: "GMT+10:00",
    label: "Australia/Hobart"
  },
  {
    value: "GMT+10:00",
    label: "Asia/Yakutsk"
  },
  {
    value: "GMT+10:30",
    label: "Australia/Lord_Howe"
  },
  {
    value: "GMT+11:00",
    label: "Asia/Vladivostok"
  },
  {
    value: "GMT+11:30",
    label: "Pacific/Norfolk"
  },
  {
    value: "GMT+12:00",
    label: "Etc/GMT+12"
  },
  {
    value: "GMT+12:00",
    label: "Asia/Anadyr"
  },
  {
    value: "GMT+12:00",
    label: "Asia/Magadan"
  },
  {
    value: "GMT+12:00",
    label: "Pacific/Auckland"
  },
  {
    value: "GMT+12:45",
    label: "Pacific/Chatham"
  },
  {
    value: "GMT+13:00",
    label: "Pacific/Tongatapu"
  },
  {
    value: "GMT+14:00",
    label: "Pacific/Kiritimati"
  }
]

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: "future-eng.us.auth0.com", //process.env.AUTH0_DOMAIN,
      clientID: "Qy7y5utJXi9uKlwT962PTeDXFTmXCJvu", //process.env.AUTH0_CLIENTID,
      redirectUri: "https://futureleadership.online/callback", //process.env.AUTH0_CALLBACK,
      responseType: "token id_token",
      scope: "openid profile email user_metadata",
    })
  : {}

export const lock = isBrowser
    ? new Auth0Lock('Qy7y5utJXi9uKlwT962PTeDXFTmXCJvu', 'future-eng.us.auth0.com', {

            //  language: 'zh',
            forgotPasswordLink: 'https://future-eng.us.auth0.com/reset-password',

              auth: {
                  audience: 'https://future-eng.us.auth0.com/api/v2/',
                  redirectUrl: 'https://futureleadership.online/us/profile', //'http://localhost:8000/us/profile',
                  responseType: 'token id_token',
                  autoParseHash: false,
                  params: {
                      scope: 'openid email profile'
                  }
              },
              additionalSignUpFields: [
                {
                  name: "student_name",
                  placeholder: "Enter your name",
                },
                // {
                //   name: "age",
                //   placeholder: "Enter your age",
                // },
                // {
                //   type: "select",
                //   name: "gender",
                //   options: genderOptions,
                //   placeholder: "Choose your gender",
                // },
                // {
                //   type: "select",
                //   name: "eng_level",
                //   placeholder: "Choose your english proficiency level",
                //   options: engLevelOptions,
                // },
                // {
                //   name: "country",
                //   placeholder: "Enter your country",
                // },
                // {
                //   name: "city",
                //   placeholder: "Enter your city",
                // },
                // {
                //   type: "select",
                //   name: "time_zone",
                //   placeholder: "Choose your time zone",
                //   options: timeOptions,
                // },
                {
                  name: "email",
                  placeholder: "Enter your email",
                },
                // {
                //   name: "number",
                //   placeholder: "Enter your number",
                // },
                // {
                //   type: "select",
                //   name: "class_option",
                //   options: classOptions,
                //   placeholder: "Choose class option",
                // },
                // {
                //   name: "parent_email",
                //   placeholder: "Enter a parent's email",
                // },
                // {
                //   name: "second_email_contact",
                //   placeholder: "Enter 2nd email"
                // }
            ],
          }
      ).on('authenticated', function(authResult) {
        console.log("IN Authenticatred", authResult)
          if (authResult && authResult.accessToken && authResult.idToken) {
              hash = authResult.idTokenPayload.at_hash
              setSession(authResult);
              // use authResult.idTokenPayload for profile information
          }
      }) : {};

      export const lockCn = isBrowser
          ? new Auth0Lock('Qy7y5utJXi9uKlwT962PTeDXFTmXCJvu', 'future-eng.us.auth0.com', {

                    language: 'zh',

                    auth: {
                        audience: 'https://future-eng.us.auth0.com/api/v2/',
                        redirectUrl: 'https://futureleadership.online/us/profile', //'http://localhost:8000/us/profile',
                        responseType: 'token id_token',
                        autoParseHash: false,
                        params: {
                            scope: 'openid email profile'
                        }
                    },
                    additionalSignUpFields: [
                      {
                        name: "student_name",
                        placeholder: "Enter your name",
                      },
                      // {
                      //   name: "age",
                      //   placeholder: "Enter your age",
                      // },
                      // {
                      //   type: "select",
                      //   name: "gender",
                      //   options: genderOptions,
                      //   placeholder: "Choose your gender",
                      // },
                      // {
                      //   type: "select",
                      //   name: "eng_level",
                      //   placeholder: "Choose your english proficiency level",
                      //   options: engLevelOptions,
                      // },
                      // {
                      //   name: "country",
                      //   placeholder: "Enter your country",
                      // },
                      // {
                      //   name: "city",
                      //   placeholder: "Enter your city",
                      // },
                      // {
                      //   type: "select",
                      //   name: "time_zone",
                      //   placeholder: "Choose your time zone",
                      //   options: timeOptions,
                      // },
                      {
                        name: "email",
                        placeholder: "Enter your email",
                      },
                      // {
                      //   name: "number",
                      //   placeholder: "Enter your number",
                      // },
                      // {
                      //   type: "select",
                      //   name: "class_option",
                      //   options: classOptions,
                      //   placeholder: "Choose class option",
                      // },
                      // {
                      //   name: "parent_email",
                      //   placeholder: "Enter a parent's email",
                      // },
                      // {
                      //   name: "second_email_contact",
                      //   placeholder: "Enter 2nd email"
                      // }
                  ],
                }
            ).on('authenticated', function(authResult) {
              console.log("IN Authenticatred", authResult)
                if (authResult && authResult.accessToken && authResult.idToken) {
                    hash = authResult.idTokenPayload.at_hash
                    setSession(authResult);
                    // use authResult.idTokenPayload for profile information
                }
            }) : {};

export const isAuthenticated = () => {
  if (!isBrowser) {
    return;
  }

  return localStorage.getItem("isLoggedIn") === "true"
}

export const silentAuth = callback => {
  console.log("Authed", isAuthenticated())
  // if (!isAuthenticated()) {
  //   return callback()
  // }

  //auth.checkSession({}, setSession(callback))
  lock.checkSession({}, setSession(callback))
}

export const login = (lang) => {
  if (!isBrowser) {
    return
  }

console.log (lang)

if (lang != "cn") {
  console.log("Inside us login")
  lock.show()

}
else {
  lockCn.show()
}


}

export const logout = () => {
  localStorage.setItem("isLoggedIn", false)
  lock.logout()
}

const setSession = (cb = () => {}) => (err, authResult) => {
  console.log(authResult)
  if (err) {
    console.log(err, "error setting session")
    cb()
    return
  }
  console.log("RESULT BEFORE", authResult)
  if (authResult && authResult.accessToken && authResult.idToken) {
    console.log("RESULT ", authResult)
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    tokens.accessToken = authResult.accessToken
    tokens.idToken = authResult.idToken
    tokens.expiresAt = expiresAt
    user = authResult.idTokenPayload
    lock.getUserInfo(tokens.accessToken, function(error, profile) {

      if (!error) {
        console.log(profile)
        user = profile
      }
      else {
        console.log("Can't get profile", error)
      }
    })

    localStorage.setItem("isLoggedIn", true)
  //  navigate("/us/profile")
    cb()
  }
}

export const handleAuthentication = () => {
  if (!isBrowser) {
    return;
  }
  console.log("HASH", hash)
  lock.resumeAuth(hash, setSession())
//  auth.parseHash(setSession())
}

export const getProfile = () => {
  return user
}
