const { BigQuery } = require("@google-cloud/bigquery");
const bigquery = new BigQuery();

async function processErrorLogs(req, res) {
    const datasetId = "logs_dataset";
    const sourceTableId = "logs_table";
    const destinationTableId = "req_error_logs";

    // find where level = error
    const errorTracingIdsQuery = `
        SELECT DISTINCT tracingId
        FROM \`${datasetId}.${sourceTableId}\`
        WHERE level = 'error'
    `;

    const [errorTracingIds] = await bigquery.query({
        query: errorTracingIdsQuery,
    });

    for (let { tracingId } of errorTracingIds) {
        const relatedLogsQuery = `
            SELECT *
            FROM \`${datasetId}.${sourceTableId}\`
            WHERE tracingId = @tracingId
            ORDER BY timestamp ASC
        `;

        const options = {
            query: relatedLogsQuery,
            params: { tracingId },
            location: "europe-west3",
        };

        const [relatedLogs] = await bigquery.query(options);

        // insert into table
        await bigquery
            .dataset(datasetId)
            .table(destinationTableId)
            .insert(relatedLogs);
    }

    res.status(200).send("Processed error logs");
}

module.exports = processErrorLogs;
