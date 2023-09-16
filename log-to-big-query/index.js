const { BigQuery } = require("@google-cloud/bigquery");
const bigquery = new BigQuery();

const datasetId = "logs_dataset";
const tableId = "logs_table";

exports.logToBigQuery = async (message, context) => {
    context.timestamp = new Date().toISOString();

    const logEntry = JSON.parse(Buffer.from(message.data, "base64").toString());
    // stringify the "meta" object to be able to insert it into BigQuery
    logEntry.meta = JSON.stringify(logEntry.meta);
    const rows = [logEntry];
    console.log("Message is: ", rows);

    try {
        await bigquery.dataset(datasetId).table(tableId).insert(rows);
        console.log(`Inserted ${rows.length} rows`);
    } catch (error) {
        console.error("Error inserting logs to BigQuery:", error);
    }
};
