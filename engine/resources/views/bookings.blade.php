<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="NOINDEX, NOFOLLOW">
    <title>CRM</title>
    <link rel="icon" type="image/x-icon" href="/img/icon.png">
    <link href="http://fonts.googleapis.com/css?family=Lobster&subset=cyrillic,latin" rel="stylesheet" type="text/css">
    <!-- Bootstrap -->
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap-datepicker.min.css" rel="stylesheet">

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
            z-index: 1000000;
        }

/*
        .date-container > div {
            position: absolute;
        }

        .date-container:hover .date-text-container {
            display: none;
        }
        .date-container > .date-text-container{
            position: relative;
        }
*/
/*

        .date-container .date-btn-container {
            display: none;
        }
*/

/*        .date-container:hover .date-btn-container {
            display: block;
        }*/

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
    </style>
</head>
<body>
<div id="body-wrapper">
<div id="alert-container-wrap">
    <div id="alert-container"></div>
</div>

<div class="page-header">
    <h1><span>CRM</span> Парикмахер на дом

        <div class="dropdown">
            <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="true">
                <?php echo \App\Utils::getCityNameById($city_id);?>
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><a href="bookings.95">Нижний Новгород</a>
                </li>
                <li><a href="bookings.49"
                       onclick="bookingEngine.onlyActiveByCity(bookingCallback);$('h2 button').html('Только активные <span class=caret></span>');">Екатеринбург</a></li>
                <li><a href="bookings.42"
                       onclick="bookingEngine.onlyNotActiveByCity(bookingCallback);$('h2 button').html('Только не активные <span class=caret></span>');">Воронеж</a></li>
            </ul>
        </div>
    </h1>
</div>

<div class="page-header">
    <h2>Заказы
        <div class="dropdown">
            <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="true">
                Только активные
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><a href="#"
                       onclick="bookingEngine.allByCity(bookingCallback);$('h2 button').html('Все <span class=caret></span>');">Все</a>
                </li>
                <li><a href="#"
                       onclick="bookingEngine.onlyActiveByCity(bookingCallback);$('h2 button').html('Только активные <span class=caret></span>');">Только
                        активные</a></li>
                <li><a href="#"
                       onclick="bookingEngine.onlyNotActiveByCity(bookingCallback);$('h2 button').html('Только не активные <span class=caret></span>');">Только
                        не активные</a></li>
                <li><a href="#"
                       onclick="bookingEngine.onlyPaidByCity(bookingCallback);$('h2 button').html('Только оплаченные <span class=caret></span>');">Только оплаченные</a></li>
            </ul>
        </div>
    </h2>
</div>
<p>
    <a class="btn btn-default" href="hairdressers.<?php echo $city_id; ?>" role="button">База парикмахеров</a>
    <a class="btn btn-default" href="home" role="button">В Личный кабинет</a>
</p>
</div>



<div class="table-responsive">
<table class="table table-bordered table-striped table-hover">
    <thead>
    <tr>
        <th>ID</th>
        <th>Статус</th>
        <th>Клиент</th>
        <th>Телефон клиента</th>
        <th>Парикмахер ID</th>
        <th>Услуга</th>
        <th>Дата получения заказа</th>
        <th>Дата выполнения заказа</th>
        <th class="hidden-xs hidden-sm">Дата получения оплаты</th>
        <th>Полная цена</th>
        <th>Цена работы</th>
        <th>Вознаграждение</th>
        <th>Комментарии</th>
    </tr>
    </thead>
    <tbody>
    <!--<tr>
        <td>obj.id</td>
        <td>
            <div class="btn-group">
                <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                    obj.status <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#" data-type="status" onclick="save(this)">Новый</a></li>
                    <li><a href="#" data-type="status" onclick="save(this)">Договорились</a></li>
                    <li><a href="#" data-type="status" onclick="save(this)">Выполнен</a></li>
                    <li><a href="#" data-type="status" onclick="save(this)">Оплачен</a></li>
                    <li><a href="#" data-type="status" onclick="save(this)">Продолбан</a></li>
                    <li><a href="#" data-type="status" onclick="save(this)">Пустой</a></li>
                    <li><a href="#" data-type="status" onclick="save(this)">Дубликат</a></li>
                </ul>
            </div>
        </td>
        <td>obj.client_name</td>
        <td>obj.client_phone</td>
        <td>#obj.hairdresser_id obj.name obj.surname</td>
        <td>obj.service</td>
        <td>obj.booking_date</td>

        <td class="date-container">
            <div class="date-btn-container">
                <div class="btn-group">
                    <button type="button" class="btn btn-default" data-type="markMade"
                            onclick="save(this, new Date().trueFormat())">Сегодня
                    </button>
                    <button type="button" class="btn btn-default dropdown-toggl btn-data-picker" data-type="markMade"
                            data-provide="datepicker">
                        <span class="caret"></span>
                        <span class="sr-only">Toggle Dropdown</span>
                    </button>
                </div>
            </div>
            <div class="date-text-container">obj.execution_date</div>
        </td>
        <td class="date-container">
            <div class="date-btn-container">
                <div class="btn-group">
                    <button type="button" class="btn btn-default" data-type="markPaid"
                            onclick="save(this, new Date().trueFormat())">Сегодня
                    </button>
                    <button type="button" class="btn btn-default dropdown-toggl btn-data-picker" data-type="markPaid"
                            data-provide="datepicker">
                        <span class="caret"></span>
                        <span class="sr-only">Toggle Dropdown</span>
                    </button>
                </div>
            </div>
            <div class="date-text-container">obj.payment_date</div>
        </td>
        <td contenteditable="true" data-type="full_price" onblur="save(this)">obj.full_price</td>
        <td contenteditable="true" data-type="work_price" onblur="save(this)">obj.work_price</td>
        <td contenteditable="true" data-type="reward" onblur="save(this)">obj.reward</td>
        <td contenteditable="true" data-type="comment" onblur="save(this)">obj.comment</td>
    </tr>-->
    </tbody>
</table>
</div>


<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="/js/bootstrap.min.js"></script>
<script src="js/engine.js"></script>
<script src="js/bootstrap-datepicker.min.js"></script>
<script src="js/bootstrap-datepicker.ru.min.js"></script>

<script>

    var bookingEngine = new Booking(<?php echo $city_id; ?>);
    bookingEngine.onlyActiveByCity(bookingCallback);

    function bookingCallback(bookings) {
        var target = $('tbody');
        target.children().remove();
        $.each(bookings, function (i, bookinig) {
            var row = convertJsToHTML(bookinig, getBookingHtmlTemplate());
            target.append(row);
        });
        var dataPicker = $('.btn-data-picker');

        dataPicker.datepicker({
            format: "yyyy-mm-dd",
            language: "ru",
            autoclose: true,
            todayHighlight: true
        });

        dataPicker.datepicker().on('changeDate', function (e) {
            console.log(e);
            save(e.currentTarget, e.date.trueFormat());
        });
        colorizeStatuses();
    }

    Date.prototype.trueFormat = function () {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = this.getDate().toString();
        return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]); // padding
    };

    function convertJsToHTML(obj, str) {
        for (var prop in obj) {
            var find = 'obj.' + prop;
            var re = new RegExp(find, 'g');
            str = str.replace(re, obj[prop]);
        }
        return str;
    }

    function getBookingHtmlTemplate() {
        return '<tr><td>obj.id</td><td><div class="btn-group"><button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"aria-expanded="false">obj.status <span class="caret"></span></button><ul class="dropdown-menu"><li><a href="#" data-type="status" onclick="save(this)">Новый</a></li><li><a href="#" data-type="status" onclick="save(this)">Договорились</a></li><li><a href="#" data-type="status" onclick="save(this)">Выполнен</a></li><li><a href="#" data-type="status" onclick="save(this)">Оплачен</a></li><li><a href="#" data-type="status" onclick="save(this)">Продолбан</a></li><li><a href="#" data-type="status" onclick="save(this)">Пустой</a></li><li><a href="#" data-type="status" onclick="save(this)">Дубликат</a></li></ul></div></td><td>obj.client_name</td><td>obj.client_phone</td><td>obj.name obj.surname ID#obj.hairdresser_id</td><td>obj.service</td><td>obj.booking_date</td><td class="date-container"><div class="date-text-container">obj.execution_date</div><div class="date-btn-container"><div class="btn-group btn-group-sm"><button type="button" class="btn btn-default" data-type="markMade" onclick="save(this,new Date().trueFormat())">Сегодня</button><button type="button" class="btn btn-default dropdown-toggl btn-data-picker" data-type="markMade"data-provide="datepicker"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button></div></div></td><td class="date-container hidden-xs hidden-sm"><div class="date-text-container">obj.payment_date</div><div class="date-btn-container"><div class="btn-group btn-group-sm"><button type="button" class="btn btn-default" data-type="markPaid" onclick="save(this,new Date().trueFormat())">Сегодня</button><button type="button" class="btn btn-default dropdown-toggl btn-data-picker" data-type="markPaid"data-provide="datepicker"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button></div></div></td><td contenteditable="true" data-type="full_price" onblur="save(this)">obj.full_price</td><td contenteditable="true" data-type="work_price" onblur="save(this)">obj.work_price</td><td contenteditable="true" data-type="reward" onblur="save(this)">obj.reward</td><td contenteditable="true" data-type="comment" onblur="save(this)">obj.comment</td></tr>';
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

    function save(element, content) {
        var el = $(element);
        var id = el.parents('tr').children('td:first').html();
        content = (content) ? content : el.html();
        var type = el.attr("data-type");
        console.log(id, type, content);
        bookingEngine[type](id, content, function () {
            showSuccessMsg('Cохранено', content);
        });
        if (afterCall[type]) afterCall[type](el, content);
    }

    var afterCall = {
        full_price: function (el) {
            el.next().html(el.html()).next().html(el.html() * 0.2);
        },
        work_price: function (el) {
            el.next().html(el.html() * 0.2);
        },
        status: function (el, content) {
            el.parents('.btn-group').children('button').html(content + ' <span class="caret"></span>');
            el.parents('tr').removeClass('success danger info warning');
            colorizeStatuses();
        },
        markMade: function (el, content) {
            el.parents('.date-btn-container').prev().html(content);
            //el.parents('tr').removeClass('success danger info warning').addClass('warning').find('td:nth-child(2) button').html('Выполнен <span class="caret"></span>');

        },
        markPaid: function (el, content) {
            el.parents('.date-btn-container').prev().html(content);
            el.parents('tr').removeClass('success danger info warning').addClass('success').find('td:nth-child(2) button').html('Оплачен <span class="caret"></span>');
        }
    };

    function colorizeStatuses(){
        $('button.dropdown-toggle:contains("Продолбан")').parents('tr').addClass('danger');
        $('button.dropdown-toggle:contains("Оплачен")').parents('tr').addClass('success');
        $('button.dropdown-toggle:contains("Новый"), button.dropdown-toggle:contains("Договорились")').parents('tr').addClass('info');
        $('button.dropdown-toggle:contains("Выполнен")').parents('tr').addClass('warning');
    }
</script>

</body>
</html>