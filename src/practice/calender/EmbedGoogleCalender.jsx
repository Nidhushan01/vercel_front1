import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleCalendarApp = () => {
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
  const REDIRECT_URI = "http://localhost:5173"; // Change for production

  const [accessToken, setAccessToken] = useState("");
  const [email, setEmail] = useState("");

  const responseGoogle = async (response) => {
    try {
      const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: response.code,
          grant_type: "authorization_code",
          redirect_uri: REDIRECT_URI,
        }),
      });

      const data = await res.json();
      setAccessToken(data.access_token);
      console.log("Access Token:", data.access_token);

      // Fetch User Profile to get email
      const userRes = await fetch(
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        {
          headers: { Authorization: `Bearer ${data.access_token}` },
        }
      );

      const userData = await userRes.json();
      setEmail(userData.email);
      console.log("User Email:", userData.email);
    } catch (error) {
      console.log("Error getting access token:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div>
        <h1>Google Calendar API</h1>

        {!accessToken ? (
          <GoogleLogin
            onSuccess={responseGoogle}
            onError={(err) => console.log(err)}
          />
        ) : (
          <div>
            <h2>Welcome, {email}</h2>
            <iframe
              src={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
                email
              )}&ctz=UTC`}
              style={{ border: "none", width: "100%", height: "600px" }}
              title="Google Calendar"
            ></iframe>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleCalendarApp;
