/* eslint-disable no-console */
const fs = require('fs').promises;
const Parser = require('rss-parser');
const unirest = require('unirest');

const parser = new Parser();

const req = unirest('GET', 'https://instagram40.p.rapidapi.com/account-info');

req.query({
  username: 'lol_olopez',
});

req.headers({
  'x-rapidapi-key': '3258f435dbmsh94fa8df886c8a79p1583d4jsnad8a9432523c',
  'x-rapidapi-host': 'instagram40.p.rapidapi.com',
  useQueryString: true,
});

let respuesta = req.end((res) => {
  console.log(res.body);
});

const LATEST_WORK_PLACEHOLDER = '%{{latest-work}}%';

(async () => {
  const markdownTemplate = await fs.readFile('./README.md.tpl', { encoding: 'utf-8' });
  const res = respuesta;
  // console.log(res.href);
  const latestArticleMarkdown = `<a href="${res.href}"></a>`;
  const newMarkdown = markdownTemplate.replace(LATEST_WORK_PLACEHOLDER, latestArticleMarkdown);
  // console.log(newMarkdown);
  await fs.writeFile('./README.md', newMarkdown);
})(respuesta);
