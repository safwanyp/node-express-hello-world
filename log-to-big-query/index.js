const { BigQuery } = require("@google-cloud/bigquery");
const bigquery = new BigQuery();

const datasetId = "logs_dataset";
const tableId = "logs_table";

exports.logToBigQuery = async (message, context) => {
    context.timestamp = new Date().toISOString();

    const logEntry = JSON.parse(Buffer.from(message.data, "base64").toString());
    const rows = [logEntry];

    try {
        await bigquery.dataset(datasetId).table(tableId).insert(rows);
        console.log(`Inserted ${rows.length} rows`);
    } catch (error) {
        console.error("Error inserting logs to BigQuery:", error);
    }
};
