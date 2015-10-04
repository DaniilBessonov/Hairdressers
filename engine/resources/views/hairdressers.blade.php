<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="NOINDEX, NOFOLLOW">
    <title>Base</title>
    <link rel="icon" type="image/x-icon" href="/img/icon.png">
    <link href="http://fonts.googleapis.com/css?family=Lobster&subset=cyrillic,latin" rel="stylesheet" type="text/css">
    <!-- Bootstrap -->
    <link href="/css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <style type="text/css">
        #body-wrapper{
            margin: 0 20px;
        }
        .table-responsive{
            margin-bottom: 20px;
        }

        #alert-container-wrap {
            position: fixed;
            width: 100%;
            margin-left: -20px;
            padding: 20px;
        }

        #alert-container {
            float: right;
        }

        img.avatar {
            height: 90px;
            width: 68px;
            background: url(/img/xxs/avatar/obj.id_xxxs.jpg) no-repeat red;
        }

        #form-container tr th:first-child, #form-container tr td:first-child {
            display: none;
        }

        [draggable] {
            -moz-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            user-select: none;
            /* Required to make elements draggable in old WebKit */
            -khtml-user-drag: element;
            -webkit-user-drag: element;
        }

        .my-img {
            max-width: 250px;
            height: auto;
        }

        .my-img-container {
            height: 150px;
            overflow: hidden;
            display: inline-block;
            margin: 2px;
        }

        .my-img-container:hover {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .draggable-over {
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.8); /* Параметры тени */
        }

        h1 > span {
            font-family: lobster, sans-serif;
        }

        h1 > .dropdown, h2 > .dropdown {
            display: inline-block;
        }

        h1 > .dropdown > button, h1 > .dropdown > button:hover, h1 > .dropdown > button:focus, h2 > .dropdown > button, h2 > .dropdown > button:hover, h2 > .dropdown > button:focus {
            font-weight: 400;
            line-height: 1;
            color: #777;
            font-size: 20px;
        }
        .selectable{
            cursor: pointer;
        }
        .selectable:hover{
            transform: rotate(2deg);
        }
        .btn-default{
            margin-top: 5px;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
<div id="body-wrapper">
<div id="alert-container-wrap">
    <div id="alert-container"></div>
</div>

<div class="page-header">
    <h1><span>Base</span> Парикмахер на дом
        <div class="dropdown">
            <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="true">
                <?php echo \App\Utils::getCityNameById($city_id);?>
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><a href="hairdressers.95">Нижний Новгород</a></li>
                <li><a href="hairdressers.49">Екатеринбург</a></li>
                <li><a href="hairdressers.42">Воронеж</a></li>
            </ul>
        </div>
    </h1>
</div>

<div class="page-header">
    <h2>Наши Парикмахеры
        <div class="dropdown">
            <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="true">
                Все
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><a href="#"
                       onclick="hairdresserEngine.allByCity(hairdressersCallback);$('h2 button').html('Все <span class=caret></span>');">Все</a>
                </li>
                <li><a href="#"
                       onclick="hairdresserEngine.onlyActiveByCity(hairdressersCallback);$('h2 button').html('Только активные <span class=caret></span>');">Только
                        активные</a></li>
                <li><a href="#"
                       onclick="hairdresserEngine.onlyNotActiveByCity(hairdressersCallback);$('h2 button').html('Только не активные <span class=caret></span>');">Только
                        не активные</a></li>
            </ul>
        </div>
    </h2>
</div>
<p>
    <a class="btn btn-default" href="bookings.<?php echo $city_id; ?>" role="button">Посмотреть заказы</a>
    <a class="btn btn-default" href="home" role="button">В Личный кабинет</a>
    <a class="btn btn-default" href="test-mode.<?php echo $city_id; ?>" role="button" target="_blank">Demo-страница</a>
    <button type="button" class="btn btn-primary" onclick="newHairdresser()">Добавить нового парикмахера</button>
</p>
</div>
<div class="table-responsive">
<table id="main-table" class="table table-bordered table-striped table-hover">
    <thead>
    <tr>
        <th>ID</th>
        <th>Аватар</th>
        <th>Фамилия</th>
        <th>Имя</th>
        <th>Статус</th>
        <th>Рейтинг</th>
        <th>Телефон</th>
        <th>Рефер</th>
        <th>Портфолио</th>
        <th>Анкета</th>
    </tr>
    </thead>
    <tbody>
    <!-- <tr>
         <td>obj.id</td>
         <td><img class="avatar" src="img/xxs/avatar/obj.id.jpg" alt="Аватар парикмахера"></td>
         <td contenteditable="true" onblur="save(this, 'surname')">obj.surname</td>
         <td contenteditable="true" onblur="save(this, 'name')">obj.name</td>
         <td contenteditable="true" onblur="save(this, 'status')">obj.status</td>
         <td contenteditable="true" onblur="save(this, 'rating')">obj.rating</td>
         <td contenteditable="true" onblur="save(this, 'phone')">obj.phone</td>
         <td contenteditable="true" onblur="save(this, 'refer')">obj.refer</td>
         <td>
             <button class="btn btn-default" type="submit">Открыть Портфолио</button>
         </td>
         <td>
             <button class="btn btn-default" type="submit" onclick="openMoreParams(9)">Открыть Цены</button>
         </td>
     </tr>-->
    </tbody>
</table>
</div>

<!-- Modal -->
<div class="modal fade" id="editHairdresserModal" tabindex="-1" role="dialog"
     aria-labelledby="editHairdresserModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="editHairdresserModalLabel">Дополнительные параметры</h4>
            </div>
            <div class="modal-body">
                <div id="form-container"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Закрыть</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="portfolioHairdresserModal" tabindex="-1" role="dialog"
     aria-labelledby="portfolioHairdresserModalLabel" data-hairdresser-id="0">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="portfolioHairdresserModalLabel">Выбор фоток</h4>
            </div>
            <div class="modal-body">
                <h4>Добавьте URL фотографии</h4>

                <div class="form-inline">
                    <div class="form-group">
                        <label class="sr-only" for="new-photo">Адрес фото</label>
                        <input type="text" class="form-control" id="new-photo" style="min-width: 300px"
                               oninput="$('#preview').attr('src',($(this).val()))">
                    </div>
                    <button type="submit" class="btn btn-primary" onclick="addPhotoUrl()">Добавить</button>
                </div>
                <img id="preview" src="" style="max-width: 560px; margin: 20px 0">

                <h4>Портфолио</h4>

                <div id="portfolio-container">

                </div>

                <h4>Выбор новый фото</h4>

                <div class="form-inline">
                    <div class="form-group">
                        <label class="sr-only" for="new-photo">Адрес фото</label>
                        <input type="text" class="form-control" id="vk_owner_album"
                               placeholder="альбом ID: 41186547_174728531" style="min-width: 300px">
                    </div>
                    <button type="submit" class="btn btn-primary" onclick="loadVkPhotosClick()">Загрузить</button>
                </div>
                <br>

                <div id="vk-photo-container">

                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
            </div>
        </div>
    </div>
</div>


<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="/js/bootstrap.min.js"></script>
<script src="js/engine.js"></script>
<script src="js/bootstrap-datepicker.min.js"></script>
<script src="js/bootstrap-datepicker.ru.min.js"></script>
<script src="js/draggable.js"></script>

<script>
    var photoEngine = new Photo(<?php echo $city_id; ?>);
    var hairdresserEngine = new Hairdresser(<?php echo $city_id; ?>);
    hairdresserEngine.allByCity(hairdressersCallback);

    function hairdressersCallback(hairdressers) {
        var target = $('#main-table tbody');
        target.children().remove();
        $.each(hairdressers, function (i, hairdresser) {
            var row = convertJsToHTML(hairdresser, getHairdresserHtmlTemplate());
            target.append(row);
        });
    }

    function convertJsToHTML(obj, str) {
        for (var prop in obj) {
            var find = 'obj.' + prop;
            var re = new RegExp(find, 'g');
            str = str.replace(re, obj[prop]);
        }
        return str;
    }

    function getHairdresserHtmlTemplate() {
        return '<tr><td>obj.id</td><td><img class="avatar" src="../../img/xxs/avatar/obj.id.jpg" alt=""></td><td contenteditable="true" onblur="save(this,\'surname\')">obj.surname</td><td contenteditable="true" onblur="save(this,\'name\')">obj.name</td><td contenteditable="true" onblur="save(this,\'status\')">obj.status</td><td contenteditable="true" onblur="save(this,\'rating\')">obj.rating</td><td contenteditable="true" onblur="save(this,\'phone\')">obj.phone</td><td contenteditable="true" onblur="save(this,\'refer\')">obj.refer</td><td><button class="btn btn-default" type="submit" onclick="openPortfolio(obj.id)">Редактировать Портфолио</button></td><td><button class="btn btn-default" type="submit" onclick="openMoreParams(obj.id)">Редактировать анкету</button></td></tr>';
    }
    function getHairdresserParamsHtmlTemplate() {
        return '<h4>obj.name obj.surname</h4><table class="table table-bordered table-striped table-hover"><thead><tr><th>ID</th><th>Свойство</th><th>Значение</th></tr></thead><tbody><tr><td>obj.id</td><td>Описание</td><td contenteditable="true" onblur="save(this,\'description\')">obj.description</td></tr><tr><td>obj.id</td><td>Вконтакте ID</td><td contenteditable="true" onblur="save(this,\'vk_id\')">obj.vk_id</td></tr><tr><td>obj.id</td><td>Город ID</td><td contenteditable="true" onblur="save(this,\'city_id\')">obj.city_id</td></tr><tr><td>obj.id</td><td>Свадебная прическа</td><td contenteditable="true" onblur="save(this,\'svadebnaiy\')">obj.svadebnaiy</td></tr><tr><td>obj.id</td><td>Вечерняя укладка</td><td contenteditable="true" onblur="save(this,\'vechernaiy\')">obj.vechernaiy</td></tr><tr><td>obj.id</td><td>Укладка</td><td contenteditable="true" onblur="save(this,\'ukladka\')">obj.ukladka</td></tr><tr><td>obj.id</td><td>Модельная стрижка</td><td contenteditable="true" onblur="save(this,\'modelnay\')">obj.modelnay</td></tr><tr><td>obj.id</td><td>Хим завивка</td><td contenteditable="true" onblur="save(this,\'himia\')">obj.himia</td></tr><tr><td>obj.id</td><td>Керативное выпрямление</td><td contenteditable="true" onblur="save(this,\'viprimlenie\')">obj.viprimlenie</td></tr><tr><td>obj.id</td><td>Восстановление</td><td contenteditable="true" onblur="save(this,\'vosstanovlenie\')">obj.vosstanovlenie</td></tr><tr><td>obj.id</td><td>Наращивание волос</td><td contenteditable="true" onblur="save(this,\'naraschivanie\')">obj.naraschivanie</td></tr> <tr><td>obj.id</td><td>Окрашивание</td><td contenteditable="true" onblur="save(this,\'okrashivanie\')">obj.okrashivanie</td></tr><tr><td>obj.id</td><td>Мелирование</td><td contenteditable="true" onblur="save(this,\'melirovanie\')">obj.melirovanie</td></tr><tr><td>obj.id</td><td>Мужская модельная</td><td contenteditable="true" onblur="save(this,\'male_modelnay\')">obj.male_modelnay</td></tr><tr><td>obj.id</td><td>Под машинку</td><td contenteditable="true" onblur="save(this,\'podmashinku\')">obj.podmashinku</td></tr><tr><td>obj.id</td><td>Portfolio preview JSON</td><td contenteditable="true" onblur="save(this,\'photos_xs\')">obj.photos_xs</td></tr></tbody></table>';
    }

    function getAlertHtmlTemplate() {
        return '<div class="alert alert-success alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><strong>obj.title</strong> obj.text</div>';
    }

    function showSuccessMsg(title, text) {
        var p = {title: title, text: text};
        var msg = $.parseHTML(convertJsToHTML(p, getAlertHtmlTemplate()));
        $('#alert-container').append(msg);
        $(msg).delay(5000).fadeOut(800);
    }

    function save(element, type, content) {
        var el = $(element);
        var id = el.parents('tr').children('td:first').html();
        content = (content) ? content : el.html();
        content = (type == 'photos_xs') ? btoa(content) : content;
        console.log(id, type, content);
        hairdresserEngine.update(id, type, content, function () {
            showSuccessMsg('Cохранено', content);
        });
        if (afterCall[type]) afterCall[type](el, content);
    }

    var afterCall = {};

    function newHairdresser() {
        hairdresserEngine.create(function () {
            location.reload();
        });
    }

    function openMoreParams(h_id) {
        var modal = $('#editHairdresserModal');
        $('#form-container', modal).children().remove();
        hairdresserEngine.get(h_id, function (hairdresser) {
            var row = convertJsToHTML(hairdresser, getHairdresserParamsHtmlTemplate());
            $('#form-container', modal).append(row);
        });
        modal.modal('show');
    }

    function openPortfolio(h_id) {
        var target = $('#portfolio-container');
        target.children().remove();
        var modal = $('#portfolioHairdresserModal');
        modal.attr('data-hairdresser-id', h_id);
        photoEngine.getFor(h_id, function (response) {
            console.log('portfolio', response);
            $.each(response, function (i, photo) {
                addPhotoToPreview(target, photo);
            });
            initDragAndDrop($('#portfolio-container .my-img-container'));
        });
        modal.modal('show');
    }

    function addPhotoToPreview(target, photo) {
        var htmlTemplate = '<div class="my-img-container"><img data-photo-id="obj.id" data-order-number="obj.order_number" src="obj.url" class="img-responsive my-img" alt="Портфолио"></div>';
        var html = convertJsToHTML(photo, htmlTemplate);
        target.append(html);
    }

    function addPhotoUrl() {
        var h_id = $('#portfolioHairdresserModal').attr('data-hairdresser-id');
        var url = $('#new-photo').val();
        photoEngine.add(h_id, url, undefined, undefined, function () {
            showSuccessMsg('Cохранено', url);
            addPhotoToPreview($('#portfolio-container'), {url: url});
        });
    }

    function elementDropped(element) {
        var el = $(element);
        var img = el.children('img');
        var update1 = updateOrderNumber(img);
        var order = img.attr('data-order-number');
        var img2 = $($('#portfolio-container .my-img-container')[order]).children('img');
        var update2 = updateOrderNumber(img2);
        $.when(update1, update2).done(function () {
            var photo_id = parseInt(img.attr('data-photo-id'));
            hairdresserEngine.refreshPreview(photo_id);
        });
    }

    function updateOrderNumber(img) {
        var result = $.Deferred();
        var photo_id = img.attr('data-photo-id');
        var order_number = img.attr('data-order-number');
        var position = img.parent().index();
        if (position != order_number) {
            console.log('update', photo_id, position);
            photoEngine.updateOrder(photo_id, position, function () {
                showSuccessMsg('Порядок сохранен', '');
                result.resolve();
            });
        }
        return result;
    }

    /*function cbUser(r) {
     console.debug('getUser', r);
     }
     function cbPhotosById(r) {
     console.debug('getPhotosById', r);
     }
     function cbAlbums(r) {
     console.debug('getAlbums', r);
     }
     function cbGroups(r) {
     console.debug('getGroups', r);
     }*/

    function loadVkPhotosClick() {
        var vk_data = $("#vk_owner_album").val().split('_');
        var owner = vk_data[0];
        var album = vk_data[1];
        vk.getPhotos(owner, album, cbPhotos);
    }

    function cbPhotos(r) {
        console.debug('getPhotos', r);
        if (r.response && r.response.items) {
            var target = $('#vk-photo-container');
            target.children().remove();
            $.each(r.response.items, function (i, photo) {
                var htmlTemplate = '<div class="my-img-container selectable" onclick="addPhotoFromVk(this)"><img data-photo-id="obj.id" data-owner-id="obj.owner_id" src="obj.photo_604" class="img-responsive my-img" alt="Портфолио"></div>';
                var html = convertJsToHTML(photo, htmlTemplate);
                target.append(html);
            });
        }
    }

    function addPhotoFromVk(element) {
        var el = $(element).children('img');
        var url = el.attr('src');
        var photoId=el.attr('data-photo-id');
        var ownerId=el.attr('data-owner-id');
        var h_id = $('#portfolioHairdresserModal').attr('data-hairdresser-id');
        photoEngine.add(h_id, url, ownerId, photoId, function () {
            showSuccessMsg('Cохранено', url);
            addPhotoToPreview($('#portfolio-container'), {url: url});
            initDragAndDrop($('#portfolio-container .my-img-container:last()'));
            el.parent().remove();
        });
    }

    var vk = new EngineVK();
    // vk.getUser(88687179, cbUser);
    //vk.getAlbums(88687179, cbAlbums);
    //vk.getPhotos(88687179, 'wall', cbPhotos);

    //vk.getPhotosById('88687179_309652794', cbPhotosById);
    //vk.getGroups(88687179, cbGroups);

</script>

</body>
</html>