const parseGuardianNews = (articles) => {
    return articles.map((article) => {
        // Check if all the keys exist and are not null or undefined.
        const assets = article.hasOwnProperty('blocks') && article.blocks &&
        article.blocks.hasOwnProperty('main') && article.blocks.main &&
        article.blocks.main.hasOwnProperty('elements') && article.blocks.main.elements &&
        article.blocks.main.elements[0].hasOwnProperty('assets') && article.blocks.main.elements[0].assets ?
            article.blocks.main.elements[0].assets : null;
        const asset = assets && assets.length > 0 ? assets[assets.length - 1] : null;
        const image = asset && asset.hasOwnProperty('file') && asset.file ? asset.file : null;
        return {
            title: article.webTitle,
            image: image,
            section: article.sectionId,
            date: article.webPublicationDate,
            description: article.blocks.body[0].bodyTextSummary,
            share: article.webUrl,
            article: article.id,
            source: 'guardian'
        };
    });
};

const parseGuardianNewsArticle = (article) => {
    const content = article.hasOwnProperty('content') && article.content ? article.content : null;
    const blocks = content && content.hasOwnProperty('blocks') && content.blocks ? content.blocks : null;
    const main = blocks && blocks.hasOwnProperty('main') && blocks.main ? blocks.main : null;
    const elements = main && main.hasOwnProperty('elements') && main.elements ? main.elements : null;
    const assets = elements && elements[0].hasOwnProperty('assets') && elements[0].assets ? elements[0].assets : null;
    const asset = assets && assets.length > 0 ? assets[assets.length - 1] : null;
    const image = asset && asset.hasOwnProperty('file') && asset.file ? asset.file : null;
    return {
        title: article.content.webTitle,
        image: image,
        date: article.content.webPublicationDate,
        description: article.content.blocks.body[0].bodyTextSummary,
        share: article.content.webUrl,
        section: article.content.sectionId,
        article: article.content.id,
        source: 'guardian'
    };
};

const parseNytimes = (articles) => {
    return articles.map((article) => {
        const multimedia = article.hasOwnProperty('multimedia') && article.multimedia ?
            article.multimedia : null;
        let image = null;
        if (multimedia) {
            image = multimedia.find((element) => {
                return element.url && element.width && element.width >= 2000;
            });
        }
        return {
            title: article.title,
            image: image ? image.url : null,
            section: article.section,
            date: article.published_date,
            description: article.abstract,
            share: article.url,
            article: article.url,
            source: 'nytimes'
        };
    }).slice(0, Math.min(10, articles.length));
};

const parseNytimesArticle = (article, index = 0) => {
    const multimedia = article.docs[index].hasOwnProperty('multimedia') && article.docs[index].multimedia ?
        article.docs[index].multimedia : null;
    let image = null;
    if (multimedia) {
        image = multimedia.find((element) => {
            return element.url && element.width && element.width >= 2000;
        });
    }
    return {
        title: article.docs[index].headline.main,
        image: image ? `https://nyt.com/${image.url}` : null,
        date: article.docs[index].pub_date,
        description: article.docs[index].abstract,
        share: article.docs[index].web_url,
        article: article.docs[index].web_url,
        section: article.docs[index].news_desk,
        source: 'nytimes'
    };
};

module.exports = {
    parseGuardianNews: parseGuardianNews,
    parseGuardianNewsArticle: parseGuardianNewsArticle,
    parseNytimes: parseNytimes,
    parseNytimesArticle: parseNytimesArticle
};