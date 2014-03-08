module.exports = [
    {
        id: 'home',
        url: '/',
        controller: '@website.controllers.Home',
        action: 'index'
    },
    {
        id: 'imageThumbnail',
        url: '/image/thumbnail/:file',
        controller: '@website.controllers.Home',
        action: 'imageThumbnail'
    },
    {
        id: 'imageNormalized',
        url: '/image/normalized/:file',
        controller: '@website.controllers.Home',
        action: 'imageNormalized'
    },
    {
        id: 'videoThumbnail',
        url: '/video/thumbnail/:file',
        controller: '@website.controllers.Home',
        action: 'videoThumbnail'
    },
    {
        id: 'videoNormalized',
        url: '/video/normalized/:file',
        controller: '@website.controllers.Home',
        action: 'videoNormalized'
    }



];

