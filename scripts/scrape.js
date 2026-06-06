import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

async function scrape() {
  const url = "https://quotes.toscrape.com/";
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  const quotes = [];

  $(".quote").each((i, el) => {
    const text = $(el).find(".text").text().trim();
    const author = $(el).find(".author").text().trim();

    quotes.push({ text, author });
  });

  fs.writeFileSync("./data/results.json", JSON.stringify(quotes, null, 2));

  console.log("Scraping completado. Guardado en data/results.json");
}

scrape();
