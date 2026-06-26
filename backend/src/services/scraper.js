require("dotenv").config();
const { chromium } = require("playwright");
const connectDB = require("./db");
const storyModel = require("../Models/storyModel.model.js"); // ✅ fixed import

const BASE_URL = "https://short-story.me";

async function scrapeStories() {
  await connectDB();

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });

  // 🔥 Step 1: collect story links
  const storyLinks = await page.$$eval("a", (links) =>
    links
      .map((a) => a.href)
      .filter((href) => href && href.includes("/short-stories/"))
  );

  const uniqueLinks = [...new Set(storyLinks)];

  console.log("Found stories:", uniqueLinks.length);

  for (const link of uniqueLinks) {
    try {
      console.log("Scraping:", link);

      await page.goto(link, { waitUntil: "domcontentloaded" });

      const data = await page.evaluate(() => {
        const title =
          document.querySelector("h1")?.innerText?.trim() || "No Title";

        const author =
          document.querySelector(".author, .post-author")?.innerText?.trim() ||
          "Unknown";

        const description =
          document.querySelector("meta[name='description']")?.content || "";

        const content =
          document.querySelector(".field-item, .story-content, article")
            ?.innerText?.trim() || "";

        const bookCover =
          document.querySelector("img")?.src || "";

        return {
          title,
          author,
          storyDescription: description,
          storyContent: content,
          bookCover,
        };
      });

      // 🔥 Save using storyModel (FIXED)
      const exists = await storyModel.findOne({ title: data.title });

      if (!exists) {
        await storyModel.create(data);
        console.log("Saved:", data.title);
      } else {
        console.log("Already exists:", data.title);
      }
    } catch (err) {
      console.log("Error scraping:", link, err.message);
    }
  }

  await browser.close();
  console.log("Scraping completed");
}

scrapeStories();