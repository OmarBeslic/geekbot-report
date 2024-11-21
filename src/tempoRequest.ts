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
