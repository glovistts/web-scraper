const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const db = require("../config/db.config");
const pLimit = require('p-limit')
const pages = db.pages;
const limit = pLimit(1);
const PageModel = mongoose.model('pages', pages);
async function crawl_and_save(url){
    try{
      axios.get(url).then((response) => {
      const $ = cheerio.load(response.data);
  
      const page_title = $('title').text();
      const page_html = $('html').html();
      const page_link = response.config.url;
      const page_domain = new URL(page_link).hostname;
      const doc = new PageModel({ page_title:page_title, page_html:page_html, page_link:page_link, page_domain:page_domain });
      doc.save()
        .then(() => {
          console.log("Document inserted successfully");
        })
        .catch((error) => {
          console.error("Error occurred while inserting document: duplicated");
        });
      
          const links = [];
          $('a').each((index, element) => {
            const href = $(element).attr('href');
            const text = $(element).text();
            links.push({ href, text });
          });
  
  
          const promises = links.map(link => limit(() => crawl_and_save(link.href)));
          Promise.all(promises);
      }).catch((error) => {
      });
  
    }catch(exeption){
    }
  }
  async function fetchData() {
    console.log("calling crawller");
    try {
      const all = await PageModel.find().limit(1).sort({ random: 1 });
      all.forEach(result => {
        crawl_and_save(result.page_link);
      });
    } catch (err) {
      console.error(err);
    }
  }
  
module.exports={
    fetchData
}