function extractUrl(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex);
    return urls ? urls[0].replace('**', '') : null;
}

module.exports = extractUrl;
