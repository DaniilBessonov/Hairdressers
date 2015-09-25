var isGalleryButtonsShown = false;
function initGallery(cont) {
    $('.hairdresser-portfolio img', cont).on('click', function () {
        var index = $(this).parent().index();
        var h_id = parseInt($(this).parents('.hairdresser').attr('id'));

        var src = getPortfolioPhoto(h_id, index);
        var img = '<img src="' + src + '" class="img-responsive"/>';

        $(this).parents('.hairdresser-portfolio').addClass("active-gallery");
        //var html = '<a class="controls next gallery-screen" href="' + (index + 1) + '" style="float: none; padding:0;background: url(img/g_loading.jpg) no-repeat;background-position: center;min-height:200px">' + img + '</a>';
        var html = '<a class="controls next gallery-screen" href="' + (index + 1) + '" style="float: none; padding:0;min-height:200px">' + img + '</a>';
        html += '<a class="controls next right carousel-control" href="' + (index + 1) + '"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a>';
        html += '<a class="controls previous left carousel-control" href="' + (index - 1) + '"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a>	';
        html += '<div style="height:45px;clear:both;display:block;">';
        html += '<button class="btn btn-purple center-block" onclick="enrollFromGallery()">Записаться</button>';
        html += '</div>';

        $('#galleryModal .gallery-container').html(html);
        manageButtons(index, h_id);
        $('#galleryModal').modal();
        /*$('#galleryModal').on('shown.bs.modal', function () {
            $('#galleryModal .gallery-container').html(html);
            if (!isGalleryButtonsShown) {
                setTimeout(
                    function () {
                        $('#galleryModal a.next.right').addClass('animated').addClass('myflash');
                        setTimeout(
                            function () {
                                $('#galleryModal a.next.right').removeClass('flash').removeClass('animated');
                                isGalleryButtonsShown = true;
                            }, 1000);
                    }, 1500);
            }
        });*/
        $('#galleryModal').on('hidden.bs.modal', function () {
            $('#galleryModal .gallery-container').html('');
            $('.active-gallery').removeClass('active-gallery');
        });
        try{
            yaCounter30665247.reachGoal('OPEN_PORTFOLIO');
        } catch (e) {
            console.error('Yandex metrika was blocked. OPEN_PORTFOLIO event happened.');
        }
    });
}


$(document).on('click', 'a.controls', function () {
    var index = parseInt($(this).attr('href'));
    var h_id = parseInt($('.active-gallery').parents('.hairdresser').attr('id'));
    var src = getPortfolioPhoto(h_id, index);

    $('#galleryModal .modal-body img').attr('src', src);

    $('a.next').attr('href', index + 1);
    $('a.previous').attr('href', index - 1);

    manageButtons(index, h_id);
    try{
        yaCounter30665247.reachGoal('NEXT_PHOTO');
    } catch (e) {
        console.error('Yandex metrika was blocked. NEXT_PHOTO event happened.');
    }
    return false;
});

function manageButtons(index, h_id){
    var total = getPortfolioSize(h_id) - 1;
    if (index >= total) {
        $('a.next.right').hide();
        $('a.gallery-screen').css('pointer-events', 'none').attr('href',total);
    } else {
        $('a.gallery-screen').css('pointer-events', 'auto');
        $('a.next.right').show()
    }
    if (index <= 0) {
        $('a.previous').hide();
    } else {
        $('a.previous').show()
    }
}