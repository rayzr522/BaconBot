
exports.blankLine = function () {
    return '```\n ```\n';
}

exports.randRange = function (start, finish) {
    return start + Math.round(Math.random() * (finish - start));
}

exports.isIpod = function (author) {
    return this.isUser(author, 'ipodtouch0218#0400');
}

exports.isUser = function (user, userString) {
    return user.username === userString.split('#')[0] && user.discriminator === userString.split('#')[1];
}