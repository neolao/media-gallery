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

    var mediaVideo = $(".media-video");
    mediaVideo.fancybox({
        content: function(index) {
            var url = $(mediaVideo[index]).attr('href');
            return '<video src="' + url + '" controls width="100%" height="100%">' +
                '</video>';
        },
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

});
