///////////////////////////////////
// ✅ Full Working Backend Code  //
///////////////////////////////////

import express from "express";
import cors from "cors";
import { InfluxDB, Point } from "@influxdata/influxdb-client";

const app = express();
app.use(cors());
app.use(express.json());

// ENV based configs
const port = 5000;
const influxURL = process.env.INFLUX_URL || "http://localhost:8087";
const influxToken = "c_hpsTAXIrstNnvL0_f2-N6EatdXNLym2c7ZZeipGoWPFOpq4usXyZ_P1gxsj58HFYW8cgr997WBf-uIgBwkng==";
const org = "Devlogix";
const bucket = "metrics";

// InfluxDB Client
const influxDB = new InfluxDB({ url: influxURL, token: influxToken });
const writeApi = influxDB.getWriteApi(org, bucket);
const queryApi = influxDB.getQueryApi(org);

///////////////////////////
// Get Temperature Route //
///////////////////////////

app.get("/get-temp", (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== "admin123") return res.send("unauthorized access");

  const fluxQuery = `from(bucket: "${bucket}") |> range(start: -1h)`;

  const data = [];
  queryApi.queryRows(fluxQuery, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      data.push(o);
    },
    error(error) {
      console.error(error);
      res.status(500).send("Error fetching data");
    },
    complete() {
      res.json(data);
    },
  });
});

///////////////////////////
// Log Temperature Route //
///////////////////////////

app.post("/log-temp", (req, res) => {
  const auth = req.headers.authorization;
  if (auth !== "admin123") return res.send("unauthorized access");

  const { location, value } = req.body;

  const point = new Point("temperature")
    .tag("location", location)
    .floatField("value", value);

  writeApi.writePoint(point);
  writeApi.flush()
    .then(() => res.send("Data logged"))
    .catch((err) => res.status(500).send("Error writing data"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
