import axios, { AxiosResponse } from "axios";

export interface Report {
  standup_id: number;
  answers: any;
}

export const getDailyStandup = async (report: string[]) => {
  const token: string = process.env.GEEKBOT_TOKEN || "";
  const apiUrl: string = process.env.GEEKBOT_STANDUP_API || "";

  let uniquePayload = [...new Set(report)].join("\n");
  try {
    const response: AxiosResponse = await axios.get(apiUrl, {
      headers: {
        Authorization: ` ${token}`,
      },
    });
    const standupData = response.data[0];
    let dailyStandupReport: Report = {
      standup_id: standupData?.id,
      answers: {},
    };

    for (const { id, text } of standupData.questions) {
      const key = id;
      const answer = text.includes("What did")
        ? { text: uniquePayload }
        : text.includes("What will")
        ? { text: "sprint" }
        : { text: "No" };

      dailyStandupReport.answers[key] = answer;
    }
    console.log(dailyStandupReport, "Geekbot standup");
    return dailyStandupReport;
  } catch (error) {
    console.error("Error fetching Geekbot standup:", error);
  }
};
