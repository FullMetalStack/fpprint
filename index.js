var express = require("express");
var app = express();
var cors = require("cors");

app.use(cors());
app.use(express.json());

var printJobs = [];

app.get("/api/printJobsAfter/:lastJobId", function (req, res) {
  console.log(printJobs);
  var newPrintJobs = printJobs.filter((job) => job.id > req.params.lastJobId);
  console.log(newPrintJobs);
  res.send(newPrintJobs);
});

app.post("/api/receivePrintJob", function (req, res) {
  let price = 0;

  console.log("/api/receivePrintJob", req.body);
  console.log(req);

  const tableNumber = req.body.tableNumber;
  const items = req.body.items;
  const total = items.reduce((acc, item) => acc + item.price, 0);

  const receiptText = `
      Table: ${tableNumber}\n\n
      Items: ${items.map((item) => item.name).join("\n")}
      Total: ${total} EUR
   `;

  var newJob = {
    id: printJobs.length + 1,
    name: req.query.name,
    content: receiptText,
  };

  printJobs.push(newJob);

  res.send("DK Print job received");
});

app.use(express.static("static"));

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("DK Print app listening at port", port);
});
