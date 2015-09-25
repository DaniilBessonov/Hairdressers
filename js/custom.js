function showMoreHaird() {
    var contMore = $('#hairdresser-container-more');
    contMore.slideDown();
    $('.button-more-h').hide();
    $('.button-less-h').show();
    /*if (contMore.children('.hairdresser').size() == 0) {
     var hs = getHairdressers();
     hs.splice(0, 2);
     addHairdressersToContainer(hs, contMore)
     }
     */
    try {
        yaCounter30665247.reachGoal('MORE_HAIRDRESSERS');
    } catch (e) {
        console.error('Yandex metrika was blocked. MORE_HAIRDRESSERS event happened.');
    }
}

function showLessHaird() {
    $('#hairdresser-container-more').slideUp();
    $('.button-more-h').show();
    $('.button-less-h').hide();
}

function upButtonClick() {
    $('#slider-body').animate({"margin-top": 0}, 800);
    $('#up-button').animate({opacity: 0});
    $('#down-button').animate({opacity: 1});
}

function downButtonClick() {
    var firstSlideH = $('#first-slide').innerHeight();
    $('#slider-body').animate({'margin-top': '-' + firstSlideH + 'px'}, 800);
    $('#up-button').animate({opacity: 1});
    $('#down-button').animate({opacity: 0});
}

function checkClientName(name) {
    var reg = /^[а-яА-ЯёЁa-zA-Z]{1,20}$/;
    return name != undefined && name.length > 0 && reg.test(name.trim());
}
function checkClientPhone(phone) {
    var reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    return phone != undefined && phone != 0 && reg.test(phone);
}

function checkCheckBoxes() {
    return $('input.my-checkbox:checked').size() > 0;
}
function checkRadioBoxes() {
    return $('input.my-radio:checked').size() > 0;
}

function checkFirstSlide() {
    var name = $("#client-name").val().trim();
    var phone = $("#client-phone").val();
    return checkClientName(name) && checkClientPhone(phone);
}

function showSecondSlide() {
    if (checkFirstSlide()) {
        if (getScreenSize() == 'xxs') {
            $('#second-slide').slideDown(800);
        } else {
            var firstSlideH = $('#first-slide').innerHeight();
            $('#slider-body').animate({'margin-top': '-' + firstSlideH + 'px'}, 800);
            $('#up-button').animate({opacity: 1}, 800);
            $('#down-button').animate({opacity: 0}, 800);
        }
    }
}

function showHairLength() {
    if (checkCheckBoxes()) {
        $("#hair_length").animate({opacity: 1});
        try {
            yaCounter30665247.reachGoal('SET_SERVICE');
        } catch (e) {
            console.error('Yandex metrika was blocked. SET_SERVICE event happened.');
        }
    } else {
        $("#hair_length").animate({opacity: 0});
    }

    if (checkRadioBoxes()) {
        $("#price-block").animate({opacity: 1});
        try {
            yaCounter30665247.reachGoal('SET_HAIR_LENGTH');
        } catch (e) {
            console.error('Yandex metrika was blocked. SET_HAIR_LENGTH event happened.');
        }
    } else {
        $("#price-block").animate({opacity: 0});
    }
}

function getScreenSize() {
    var width = $('.content-container').first().innerWidth();
    if (width >= 992) return 'md';
    if (width >= 768) return 'sm';
    if (width >= 500) return 'xs';
    return 'xxs';
}

function init() {
    $(window).load(function () {
        var count_h_in_main_cont = 3;
        var hs = getHairdressers();
        var main_hs = hs.splice(0, count_h_in_main_cont);
        var contMain = $('#hairdresser-container-main');
        var adding = addHairdressersToContainer(main_hs, contMain);
        adding.done(function () {
            $('#button-more-h-container').show();
            var loadCount = 0;
            $(".img-responsive").load(function () {
                loadCount++;
                if (loadCount >= 6 * count_h_in_main_cont) {
                    var contMore = $('#hairdresser-container-more');
                    addHairdressersToContainer(hs, contMore)
                }
            });
        });
    });


    var name_box = $("#client-name");
    name_box.keyup(function () {
        var name = name_box.val().trim();
        if (checkClientName(name)) {
            name_box.parent().removeClass("has-error").addClass("has-success");
            showSecondSlide();
            try {
                yaCounter30665247.reachGoal('SET_CLIENT_NAME');
            } catch (e) {
                console.error('Yandex metrika was blocked. SET_CLIENT_NAME event happened.');
            }
        } else {
            name_box.parent().addClass("has-error").removeClass("has-success");

        }
    });

    var phone_box = $("#client-phone");
    phone_box.mask("+7 (999) 999-99-99", {
        completed: function () {
            phone_box.parent().addClass("has-success");
            showSecondSlide();
            try {
                yaCounter30665247.reachGoal('SET_CLIENT_PHONE');
            } catch (e) {
                console.error('Yandex metrika was blocked. SET_CLIENT_PHONE event happened.');
            }
        }
    });

    $('input.my-checkbox').on('click', function () {
        //showHairLength();
        try {
            yaCounter30665247.reachGoal('SET_SERVICE');
            yaCounter30665247.reachGoal('SET_HAIR_LENGTH');
        } catch (e) {
            console.error('Yandex metrika was blocked. SET_SERVICE, SET_HAIR_LENGTH event happened.');
        }
    });

    initGallery($('.hairdresser-portfolio'));
}

function getOrder() {
    var hairdresser_id = parseInt($('#enroll-form').attr('data-hairdresser_id'));
    var client_name = $('#client-name').val().trim();
    var client_phone = $('#client-phone').val();
    var services = [];
    //var hair = $('input.my-radio[type="radio"]:checked').attr('id');
    //var cprice = $('#service-price').html();
    var calc_hairdresser_id = 0;

    $.each($('input.my-checkbox[type="checkbox"]:checked'), function (i, ch) {
        services.push($(ch).attr('id'));
    });
    return new Order(hairdresser_id, client_name, client_phone, services, undefined, undefined, calc_hairdresser_id);
}


function validateOrder(o) {
    //console.log('validation', o);
    return o.hairdresser_id != undefined && checkClientName(o.client_name) && checkClientPhone(o.client_phone) && o.client_phone.length != 0 && o.services.length > 0 /*&& o.hair_length != undefined*/;
}

function finishEnroll() {
    var ord = getOrder();
    if (validateOrder(ord)) {
        /*if (ord.hairdresser_id == 0) {
         ord.calc_hairdresser_id = findHairdresserIdForOrder(ord);
         }
         makeOrderAPI(ord);*/
        var load_bar = $('#loading_bar');
        load_bar.show();
        le.booking(ord, function (jsonResponse) {
            if (validateJSON(jsonResponse)) {
                var response = JSON.parse(jsonResponse);
                console.log("response", response);
                if (response.validation_error) {
                    console.error(response.validation_error.msg);
                    $('#failOrderModal').modal('show');
                    try {
                        yaCounter30665247.reachGoal('FAIL_ENROLL');
                    } catch (e) {
                        console.error('Yandex metrika was blocked. FAIL_ENROLL event happened.');
                    }
                } else {
                    if (response == "success") {
                        $('#successOrderModal').modal('show');
                        try {
                            yaCounter30665247.reachGoal('SUCCESS_ENROLL');
                        } catch (e) {
                            console.error('Yandex metrika was blocked. SUCCESS_ENROLL event happened.');
                        }
                    } else {
                        //TODO add ya counter for black list!
                    }
                }
            } else {
                console.error('JSON invalid');
                $('#failOrderModal').modal('show');
            }
            load_bar.hide();
        });
    } else {
        var msg = '';
        if (!checkClientName(ord.client_name)) msg += ', правильное имя';
        if (ord.client_phone == null || ord.client_phone.length == 0) msg += ', телефон';
        if (ord.services.length == 0) msg += ', вид услуги';
        //if (ord.hair_length == undefined) msg += ', длину волос';

        if (msg.length != 0) alert('Пожалуйста, укажите ' + msg.substr(2) + '.');
    }
    increaseYaCounter(ord);
}

function increaseYaCounter(ord) {
    var h = ord.hairdresser_id == 0 ? 'ch_id=' + ord.calc_hairdresser_id : 'h_id=' + ord.hairdresser_id;
    var g = [];
    $.each(ord.services, function (i, s) {
        g.push({
            id: "1",
            name: s,
            price: 0,
            quantity: 1
        });
    });

    var yaParams = {
        order_id: h + ' ' + ord.client_name + ' ' + ord.client_phone,
        order_price: ord.cprice,
        currency: "RUR",
        exchange_rate: 1,
        goods: g
    };
    try {
        yaCounter30665247.reachGoal('CLICK_ENROLL', yaParams);
    } catch (e) {
        console.error('Yandex metrika was blocked. CLICK_ENROLL event happened.');
    }
}

function findHairdresserIdForOrder(ord) {
    var res = undefined;
    var maxCountServ = 0;
    var secondHaird = undefined;
    var hs = getHairdressers();
    //var egorova = getHairdresserById(16);
    //hs.unshift(egorova);
    $.each(hs, function (i, h) {
            if (res == undefined) {
                var isAllServicesAvailiable = true;
                var countServ = 0;
                $.each(ord.services, function (j, serv) {
                    if (h.price[serv] == undefined) {
                        isAllServicesAvailiable = false;
                    } else {
                        countServ++;
                    }
                });
                if (countServ > maxCountServ) {
                    maxCountServ = countServ;
                    secondHaird = h.id;
                }
                if (isAllServicesAvailiable) {
                    res = h.id;
                }
            }
        }
    );
    return res == undefined ? secondHaird : res;
}

function makeOrderAPI(ord) {
    console.log('makeOrderAPI', ord);
    var load_bar = $('#loading_bar');
    load_bar.show();
    if (le) {
        le.booking(ord.hairdresser_id, ord.client_name, ord.client_phone, ord.services);
    }
    $.post("scripts/makeOrder.php", {order: JSON.stringify(ord)}).done(
        function (jsonResponse) {
            //console.log("response", jsonResponse);
            if (validateJSON(jsonResponse)) {
                var response = JSON.parse(jsonResponse);
                console.log("response", response);
                if (response.validation_error) {
                    console.error(response.validation_error.msg);
                    $('#failOrderModal').modal('show');
                    try {
                        yaCounter30665247.reachGoal('FAIL_ENROLL');
                    } catch (e) {
                        console.error('Yandex metrika was blocked. FAIL_ENROLL event happened.');
                    }
                } else {
                    if (response.emailNotification) {
                        $('#successOrderModal').modal('show');
                    } else {
                        $('#failOrderModal').modal('show');
                    }
                    try {
                        yaCounter30665247.reachGoal('SUCCESS_ENROLL');
                    } catch (e) {
                        console.error('Yandex metrika was blocked. SUCCESS_ENROLL event happened.');
                    }
                }
            } else {
                console.error('JSON invalid');
                $('#failOrderModal').modal('show');
            }
        }).fail(
        function () {
            $('#failOrderModal').modal('show');
            console.error("AJAX connection error");
        }).always(function () {
            load_bar.hide();
        });
}

function scrollToElementWithId(id) {
    var offset = $(id).offset().top;
    $('body').animate({scrollTop: offset}, 1500);
}

function togglePrice(el) {
    var haird = $(el).parents('.hairdresser');
    var pr = $('.hairdresser-prices', haird);
    if (pr.css('display') == 'none') {
        pr.slideDown();
        $(el).html('Скрыть цены');
        var offset = pr.offset().top;
        if (getScreenSize() == 'md') offset -= 120;
        $('body').animate({scrollTop: offset}, 1500);
    } else {
        pr.slideUp();
        $(el).html('Посмотреть цены');
    }
    try {
        yaCounter30665247.reachGoal('TOGGLE_PRICE');
    } catch (e) {
        console.error('Yandex metrika was blocked. TOGGLE_PRICE event happened.');
    }
}

function enroll(id) {
    id = parseInt(id);
    $('#enroll-form').attr('data-hairdresser_id', id);
    $('#order-master-name').html($("#" + id + " h3 span").html());
    disablePriceCheckBoxes(id);
    scrollToElementWithId('#enroll-form');
    try {
        yaCounter30665247.reachGoal('ENROLL_GO_TO_FORM');
    } catch (e) {
        console.error('Yandex metrika was blocked. ENROLL_GO_TO_FORM event happened.');
    }
}

function enrollFromGallery() {
    var id = $('.active-gallery').parents('.hairdresser').attr("id");
    $('#galleryModal').modal('toggle');
    enroll(id);
    try {
        yaCounter30665247.reachGoal('ENROLL_FROM_GALLERY');
    } catch (e) {
        console.error('Yandex metrika was blocked. ENROLL_FROM_GALLERY event happened.');
    }
}

function convertJsToHTML(obj, str) {
    for (var prop in obj) {
        var find = 'obj.' + prop;
        var re = new RegExp(find, 'g');
        str = str.replace(re, obj[prop]);
    }
    return str;
}

function convertStrToHTML(key, val, str) {
    var find = 'obj.' + key;
    var re = new RegExp(find, 'g');
    str = str.replace(re, val);
    return str;
}

function disableUnknownPrice(str) {
    var find = '(от obj.[a-zA-Z_]+ руб.)|(от null руб.)|(от 0 руб.)';
    var re = new RegExp(find, 'g');
    str = str.replace(re, 'услуга не предоставляется');
    return str;
}

function getHairdresserHTMLTemplate() {
    return '<div id="obj.id" class="hairdresser"><div class="row"><div class="col-xs-12 col-sm-5 col-md-4 col-lg-4 hairdresser-photo"><div><img src="/img/obj.screenSize/avatar/obj.id.jpg" alt="Парикмахер obj.name"><div class="hairdresser-name"><div><span>obj.name</span><br><span>парикмахер</span></div></div></div><div class="center-block"><button type="button" class="btn btn-lg btn-purple btn-block" onclick="enroll(obj.id)">Записаться</button><button type="button" class="btn btn-lg btn-pink btn-block" onclick="togglePrice(this)">Посмотреть цены</button></div></div><div class="col-xs-12 col-sm-7 col-md-8 col-lg-8 hairdresser-portfolio-container"><div class="hidden-xs"><h3><span>obj.name</span>, парикмахер</h3><p>obj.description</p></div><div class="hairdresser-portfolio container-fluid"><div class="row"><div class="col-xxs-6 col-xs-6 col-sm-6 col-md-4 col-lg-4"><img class="img-responsive center-block" alt="Работа парикмахера на дом" src="obj.portfolio"></div></div></div></div></div><div class="row"><div class="col-xs-0 col-sm-0 col-md-4 col-lg-4 hairdresser-photo"></div><div class="col-xs-12 col-sm-12 col-md-8 col-lg-8"><div class="hairdresser-prices"><div class="page-header"><h3>Цены на парикмахерские услуги</h3></div><div class="row"><div class="col-xxs-4 col-xs-3 col-sm-3 col-md-3 col-lg-3"><img src="/img/pr/svadebnaiy.png" alt="Свадебная прическа" class="center-block"><p>Свадебная прическа<br><span>от obj.svadebnaiy руб.</span></p></div><div class="col-xxs-4 col-xs-3 col-sm-3 col-md-3 col-lg-3"><img src="/img/pr/vechernaiy.png" alt="Вечерняя укладка" class="center-block"><p>Вечерняя укладка<br><span>от obj.vechernaiy руб.</span></p></div><div class="col-xxs-4 col-xs-3 col-sm-3 col-md-3 col-lg-3"><img src="/img/pr/ukladka.png" alt="Укладка" class="center-block"><p>Укладка<br><span>от obj.ukladka руб.</span></p></div><div class="col-xxs-4 col-xs-3 col-sm-3 col-md-3 col-lg-3"><img src="/img/pr/modelnay.png" alt="Модельная стрижка" class="center-block"><p>Модельная стрижка<br><span>от obj.modelnay руб.</span></p></div><div class="col-xxs-4 col-xs-3 col-sm-3 col-md-3 col-lg-3"><img src="/img/pr/himia.png" alt="Химическая завивка" class="center-block"><p>Химическая завивка<br><span>от obj.himia руб.</span></p></div><div class="col-xxs-4 col-xs-3 col-sm-3 col-md-3 col-lg-3"><img src="/img/pr/viprimlenie.png" alt="Кератиновое выпрямление" class="center-block"><p>Кератиновое выпрямление<br><span>от obj.viprimlenie руб.</span></p></div><div class="col-xxs-4 col-xs-3 col-sm-3 col-md-3 col-lg-3"><img src="/img/pr/vosstanovlenie.png" alt="Восстановление" class="center-block"><p>Восстановление<br><span>от obj.vosstanovlenie руб.</span></p></div><div class="col-xxs-4 col-xs-3 col-sm-3 col-md-3 col-lg-3"><div style="max-height:85px;margin-right:-26px;"><img src="/img/pr/naraschivanie.png" alt="Наращивание" class="center-block"></div><p>Наращивание<br><span>от obj.naraschivanie руб.</span></p></div><div class="col-xxs-4 col-xs-3 col-sm-3 col-md-3 col-lg-3"><img src="/img/pr/okrashivanie.png" alt="Окрашивание" class="center-block"><p>Окрашивание<br><span>от obj.okrashivanie руб.</span></p></div><div class="col-xxs-4 col-xs-3 col-sm-3 col-md-3 col-lg-3"><img src="/img/pr/melirovanie.png" alt="Мелирование" class="center-block"><p>Мелирование<br><span>от obj.melirovanie руб.</span></p></div><div class="col-xxs-4 col-xs-3 col-sm-3 col-md-3 col-lg-3"><img src="/img/pr/male_modelnay.png" alt="Мужская стрижка" class="center-block"><p>Мужская стрижка<br><span>от obj.male_modelnay руб.</span></p></div><div class="col-xxs-4 col-xs-3 col-sm-3 col-md-3 col-lg-3"><img src="/img/pr/podmashinku.png" alt="Стрижка под машинку" class="center-block"><p>Стрижка под машинку<br><span>от obj.podmashinku руб.</span></p></div></div></div></div></div>';
}

function addHairdressersToContainer(hs, cont) {
    var adding = $.Deferred();
    var template = getHairdresserHTMLTemplate();
    cont.children().remove();
    $.each(hs, function (i, h) {
        var html = convertJsToHTML(h, template);
        html = convertStrToHTML('screenSize', getScreenSize() == 'sm' ? 'md' : getScreenSize(), html);
        html = convertJsToHTML(h.price, html);
        html = disableUnknownPrice(html);

        var block = $.parseHTML(html);
        $('p:contains("услуга не предоставляется")', block).parent().css('opacity', 0.5);
        var li = $('.hairdresser-portfolio .row > div:first', block).prop('outerHTML');
        var target = $('.hairdresser-portfolio .row', block);
        target.children().remove();
        try {
            h.photos_xs = (Array.isArray(h.photos_xs)) ? h.photos_xs : h.photos_xs.split('<br>');
            h.photos = (h.photos) ? h.photos : h.photos_xs;
            $.each(h.photos, function (i, photo) {
                if (i < 6) {
                    var photoSrc = (h.photos_xs.length - 1 >= i) ? h.photos_xs[i] : photo;
                    //console.log(photoSrc, i, h);
                    target.append(convertStrToHTML('portfolio', photoSrc, li));
                }
            });
        } catch (e) {
            console.error('Check photo_xs for hairdresser with id=' + h.id, e);
        }
        cont.append(block);
        if (hs.length - 1 == i) { //last element add
            initGallery(cont);
            adding.resolve();
        }
    });
    return adding;
}

function validateJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function disablePriceCheckBoxes(h_id) {
    $('#second-slide input[type="checkbox"]').prop("disabled", true).parent().addClass('disabled-checkbox');
    var h = getHairdresserById(h_id);
    var ps = (h.price) ? h.price : h;
    for (var prop in ps) {
        if (ps[prop]) {
            $('#' + prop).prop("disabled", false).parent().removeClass('disabled-checkbox');
        }
    }
}