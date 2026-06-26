const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user.route');
const storyRoute = require('./routes/story.routes');
const aiRoutes = require('./routes/ai.routes');
const videoRoutes = require('./routes/video.route.js');
const commentRoute = require("./routes/comment.route");
const { chromium } = require('playwright');
const storyModel = require('./Models/storyModel.model.js');
const ytDlp = require("yt-dlp-exec");
const videoModel = require('./Models/video.model.js');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const app = express();

app.use(express.json());

const allowedOrigins = [
    'http://localhost:3000',
    'http://192.168.0.101:5173',
    'http://localhost:5173',
    'http://192.168.0.101:5173/',
    '192.168.0.101:5173'
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(cookieParser());

app.use('/user', userRoute);
app.use('/story', storyRoute);
app.use('/api/ai', aiRoutes);
app.use('/api/video', videoRoutes);
app.use("/api/comments", commentRoute);

app.get('/sraper/story', async (req, res) => {
    const browser = await chromium.launch({
        headless: true
    });

    const page = await browser.newPage();

    try {

        const listingPages = [
            "https://short-story.me/stories/general-stories",
            "https://short-story.me/stories/general-stories?start=100",
            "https://short-story.me/stories/general-stories?start=200",
            "https://short-story.me/stories/general-stories?start=300",
            "https://short-story.me/stories/general-stories?start=400"
        ];

        const storyLinks = new Set();

        // Step 1: Collect all story URLs
        for (const url of listingPages) {

            await page.goto(url, {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            });

            const links = await page.$$eval(
                'table a',
                anchors =>
                    anchors
                        .map(a => a.href)
                        .filter(link =>
                            link.includes('/stories/general-stories/')
                        )
            );
            links.forEach(link => storyLinks.add(link));
            console.log(`Collected ${links.length} links from ${url}`);
        }
        console.log(
            `Total unique stories found: ${storyLinks.size}`
        );
        let inserted = 0;
        // Step 2: Visit every story
        for (const storyUrl of storyLinks) {
            try {
                const storyPage = await browser.newPage();
                await storyPage.goto(storyUrl, {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000
                });
                const title =
                    (await storyPage
                        .locator('h1')
                        .first()
                        .textContent())?.trim() || '';
                const author =
                    (await storyPage
                        .locator('text=/Written by/i')
                        .first()
                        .textContent())?.replace('Written by', '').trim() || 'Unknown';
                // Main article content
                const paragraphs = await storyPage.$$eval(
                    '.item-page p, .com-content-article p, article p',
                    els => els.map(el => el.innerText.trim())
                );
                const storyContent = paragraphs.join('\n\n');
                if (!title || !storyContent) {
                    console.log(`Skipped: ${storyUrl}`);
                    await storyPage.close();
                    continue;
                }
                await storyModel.updateOne(
                    { title },
                    {
                        $setOnInsert: {
                            title,
                            author,
                            storyContent,
                            storyDescription:
                                storyContent.substring(0, 300),
                            bookCover: ''
                        }
                    },
                    { upsert: true }
                );
                inserted++;
                console.log(`Saved: ${title}`);
                await storyPage.close();
            } catch (err) {
                console.log(
                    `Error in story: ${storyUrl}`,
                    err.message
                );
            }
        }
        await browser.close();
        res.json({
            success: true,
            totalLinks: storyLinks.size,
            inserted
        });
    } catch (err) {
        await browser.close();
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

app.get("/import-videos", async (req, res) => {
    try {
        const data = await ytDlp(
            "https://www.youtube.com/@HindiFairyTales/videos",
            {
                dumpSingleJson: true,
                flatPlaylist: true,
            }
        );

        let inserted = 0;
        let skipped = 0;

        for (const item of data.entries || []) {
            if (!item.id) continue;

            const videoUrl = `https://www.youtube.com/watch?v=${item.id}`;

            const exists = await videoModel.findOne({ videoUrl });

            if (exists) {
                skipped++;
                continue;
            }

            await videoModel.create({
                title: item.title || "Untitled",
                description: "",
                videoUrl,
            });

            inserted++;
        }

        return res.status(200).json({
            success: true,
            totalVideos: data.entries?.length || 0,
            inserted,
            skipped,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


//https://www.urdupoint.com/kids/category/moral-stories.html
//https://www.urdupoint.com/kids/category/moral-stories-page2.html

module.exports = app;