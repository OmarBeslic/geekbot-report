GeekBot automation report 
Description
This TypeScript script automates the process of retrieving logged tickets from the Tempo service, gathering information about these tickets from Jira, and sending a daily standup report via Geekbot. The script is designed to retrieve data from the last working day, ensuring accurate and up-to-date information for the generated report.

Installation
Clone the repository from GitHub.
bash
Copy code
git clone https://github.com/your_username/your_repository.git
Install the required dependencies.
bash
Copy code
npm install
Configure the necessary API keys and credentials for Tempo, Jira, and Geekbot. Ensure that the appropriate access permissions are granted for the script to function properly.Add them to .env file like it is in .env.example
Usage
Run the script using the following command:

bash
Copy code
ts-node index //to start script
The script will automatically perform the following actions:

Connect to the Tempo API to retrieve logged tickets from the last working day.
Retrieve additional information for each ticket from Jira.
Fetch the daily standup report from Geekbot.
Send a post request to Geekbot to submit the generated report.
Configuration
Ensure that you have set the required configuration parameters in the config.json file. This includes the following:

Tempo API credentials
Jira API credentials
Geekbot API credentials
