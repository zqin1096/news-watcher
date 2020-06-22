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
            description: article.blocks.body[0].bodyTextSummary
        };
    });
}

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
            description: article.abstract
        };
    });
}

module.exports = {
    parseGuardianNews: parseGuardianNews,
    parseNytimes: parseNytimes
};