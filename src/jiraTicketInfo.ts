import axios, { AxiosRequestConfig } from "axios";

interface JiraResponse {
  key: string;
  fields: {
    summary: string;
  };
}

export async function jiraTicketInfo(issuesFromTempo: string[]) {
  const jiraUsername: string = process.env.JIRA_USERNAME || "";
  const jiraOauthToken: string = process.env.JIRA_OUTH_TOKEN || "";

  const encoded = Buffer.from(`${jiraUsername}:${jiraOauthToken}`).toString(
    "base64"
  );

  const axiosConfig: AxiosRequestConfig = {
    method: "get",
    headers: {
      Authorization: `Basic ${encoded}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const requests = issuesFromTempo.map(async (issue) => {
      const config: AxiosRequestConfig = { ...axiosConfig, url: issue };
      const response = await axios(config);
      const responseData: JiraResponse = response.data;
      return `${responseData.key} - ${responseData.fields.summary}`;
    });
    const responses = await Promise.all(requests);
    console.log(responses, " Jira tickets");
    return responses;
  } catch (error) {
    console.error("Cannot parse JSON");
    throw error;
  }
}
