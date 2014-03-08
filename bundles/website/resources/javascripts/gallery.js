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
        target.fancybox({
            content: '<video src="' + url + '" controls width="100%" height="100%"></video>',
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
    };
    var mediaVideo = $(".media-video");
    for (var index = 0, total = mediaVideo.length; index < total; ++index) {
        generateFancyboxVideo($(mediaVideo[index]));
    }

});
