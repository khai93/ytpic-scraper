import express from "express";
var app = express();
import { load } from "cheerio";
import { get } from "axios";
const PORT = process.env.PORT || 3000;

function retObject(status, result) {
  return {
    status: status,
    message: "Powered by gimenz.id",
    result: result,
  };
}

app.get("/api/ytpic", (req, res) => {
  const url = req.query.url;
  get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0",
    },
  })
    .then((response) => {
      let $ = load(response.data);
      let cerpen = [];

      $('link[rel="image_src"]').each(() => {
        cerpen = $(this).attr("href");
      });
      return res.json(retObject(true, cerpen));
    })
    .catch((err) => {
      return res.json(retObject(false, err));
    });
});

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
