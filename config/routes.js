module.exports = [
    {
        id: 'home',
        url: '/',
        controller: '@website.controllers.Home',
        action: 'index'
    },
    {
        id: 'thumbnail',
        url: '/thumbnail/:file',
        controller: '@website.controllers.Home',
        action: 'thumbnail'
    },
    {
        id: 'imageNormalized',
        url: '/image/normalized/:file',
        controller: '@website.controllers.Home',
        action: 'imageNormalized'
    }


];

