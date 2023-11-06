import axios, { AxiosRequestConfig } from "axios";

interface Author {
  accountId: string;
}

interface Issue {
  self: string;
}

interface Worklog {
  issue: Issue;
  author: Author;
}

interface TempoResponse {
  results: Worklog[];
}

//Steps to get oauth token
//https://autaut.atlassian.net/plugins/servlet/ac/io.tempo.jira/oauth-authorize/?client_id=F5cGnavZSZWno3wqY40d9tCOW0ECAf2eOvTBEqkaczn9ngqSbg&redirect_uri=geekbot-report
//where client id and redirect url is tempo-settings-oauth2, type that url in browser you will get the code and then go to postman
//send post to this https://api.tempo.io/oauth/token/
//add this to boddy under x-www-form-urlencoded
// grant_type:authorization_code
// client_id:F5cGnavZSZWno3wqY40d9tCOW0ECAf2eOvTBEqkaczn9ngqSbg
// client_secret:BkJRtSjHAt5jMHq5N0O4fCAMs2coGXTgtSqrBzeYuH8s3p1jkIFXFBBpWCsZvEKp2hV6j58SCLs1BcKJLNBixsyfdzpX2YP1iG606uHNkJSrkObIR0W5dPNpd3xyFUMH
// redirect_uri:geekbot-report
// code:MQgE4A6bBavKGKljQR1_lHcRgLhYyEc7GsO99-1E0Qg // previously got code from url

export async function makeTempoRequest(fromDate: string) {
  const tempoOauthToken: string = process.env.TEMPO_OAUTH_TOKEN || "";
  const tempoUrl: string = process.env.TEMPO_API || "";

  const axiosConfig: AxiosRequestConfig = {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tempoOauthToken}`,
    },
  };

  try {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const formattedToday = today.toISOString().slice(0, 10);
    const queryParams = new URLSearchParams({
      from: fromDate,
      to: formattedToday,
      limit: "5000",
    });

    const config = {
      ...axiosConfig,
      url: `${tempoUrl}?${queryParams.toString()}`,
    };
    const response = await axios(config);
    const responseData: TempoResponse = response.data;
    const issueLinks: string[] = responseData.results.map((worklog) => {
      return worklog.issue.self;
    });

    console.log(issueLinks, "Tempo links");
    return issueLinks;
  } catch (error) {
    console.error("Error occurred during request: ", error);
    throw error;
  }
}
