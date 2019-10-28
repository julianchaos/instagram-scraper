const puppeteer = require('puppeteer');

class Scraper {

    get url() {
        return `http://www.instagram.com/${this.path}`;
    }

    get max_items() {
        return 20;
    }

    constructor(path) {
        this.path = path;
    }

    async scrap() {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();

        await this.page.goto(this.url, {
            waitUntil: `networkidle0`
        });

        return this.evaluate();
    }

    async evaluate() {
        let previousHeight;
        this.items = new Set();

        while (this.items.size < this.max_items) {
            previousHeight = await this.page.evaluate('document.body.scrollHeight');
            await this.page.evaluate(`window.scrollTo(0, document.body.scrollHeight)`);
            await this.page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
            await this.page.waitFor(1000);

            const nodes = await this.page.evaluate(() => {
                const images = document.querySelectorAll(`a > div > div.KL4Bh > img`);
                return [].map.call(images, img => img.src);
            });

            nodes.forEach(element => {
                this.items.add(element)
            });

            return this.items;

        }

    }
}

module.exports = Scraper;
