import { getDailyStandup } from "./src/getDailyStandup";
import lastWorkDay from "./src/helpers/lastWorkDay";
import { jiraTicketInfo } from "./src/jiraTicketInfo";
import { sendReportToGeekBot } from "./src/sendReport";
import { makeTempoRequest } from "./src/tempoRequest";
import "dotenv/config";

async function main() {
  let fromDate: string = lastWorkDay();
  let tickets = await makeTempoRequest(fromDate);
  let jiraTickets = await jiraTicketInfo(tickets);
  let report = await getDailyStandup(jiraTickets);
  return sendReportToGeekBot(report);
}
main();
