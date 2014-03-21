$(document).ready(function() {
    $(".media-image").fancybox({
        prevEffect  : 'none',
        nextEffect  : 'none',
        helpers : {
            title   : {
                type: 'inside'
            },
            thumbs  : {
                width   : 100,
                height  : 100
            }
        }
    });

    var generateFancyboxVideo = function(target) {
        var url = target.attr('href');
        var webm = target.data('webm');
        target.fancybox({
            type: 'html',
            
            content: '<video controls="controls" width="100%" height="100%">' +
                '<source src="' + webm + '" type="video/webm"/>' +
                '<source src="' + url + '" type="video/mp4"/>' +
                '<object width="200" height="200" type="video/quicktime" data="' + url + '">' +
                    '<param name="src" value="' + url + '"/>' +
                '</object>' +
            '</video>',
            
            //content: '<iframe src="' + webm + '" width="100%" height="100%"></iframe>',
            prevEffect  : 'none',
            nextEffect  : 'none',
            helpers : {
                title   : {
                    type: 'inside'
                }
            }
        });
    };
    var mediaVideo = $(".media-video");
    for (var index = 0, total = mediaVideo.length; index < total; ++index) {
        generateFancyboxVideo($(mediaVideo[index]));
    }

});
