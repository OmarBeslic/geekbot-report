import axios, { AxiosRequestConfig } from "axios";

export async function sendReportToGeekBot(payload: any) {

  let token: string = process.env.GEEKBOT_REPORTS_TOKEN || "";
  let url: string = process.env.GEEKBOT_REPORTS_TOKEN || "";
  
  try {
    const config: AxiosRequestConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: `${token}`,
        "Content-type": "application/json",
      },
      data: payload,
    };
    const response = await axios(config);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error("Cannot parse JSON");
    throw error;
  }
}
