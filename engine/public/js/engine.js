function Engine(city_id) {
    this.city_id = city_id;
}
Engine.prototype.systemCall = function (method, params, callback) {
    console.log("[" + method + "]", params);
    var url = (params != undefined) ? method + '/' + JSON.stringify(params) : method;
    //url = 'engine/public/' + url;
    //console.debug(url);
    $.get(url, undefined,
        function (response) {
            console.log("[" + method + "] responce:", response);
            if (callback != undefined) {
                callback(response);
            }
        });
};
Engine.prototype.crossDomainCall = function (url) {
    console.log(url);
    var script = document.createElement('SCRIPT');
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
};
Engine.prototype.city_id = 0;

function Booking(city_id) {
    this.city_id = city_id;
}
Booking.prototype = new Engine();
Booking.prototype.all = function (callBack) {
    this.systemCall('booking/all', undefined, callBack);
};
Booking.prototype.allByCity = function (callBack) {
    this.systemCall('booking/allbycity', this.city_id, callBack);
};
Booking.prototype.add = function (h_id, client_name, client_phone, services, callBack) {
    var p = {hairdresser_id: h_id, client_name: client_name, client_phone: client_phone, service: services[0]}; //TODO services
    this.systemCall('booking/add', p, callBack);
};
Booking.prototype.markMade = function (id, execution_date, callBack) {
    var p = {id: id, date: execution_date};
    this.systemCall('booking/markmade', p, callBack);
};
Booking.prototype.markPaid = function (id, payment_date, callBack) {
    var p = {id: id, date: payment_date};
    this.systemCall('booking/markpaid', p, callBack);
};
Booking.prototype.markAgreed = function (id, execution_date, callBack) {
    var p = {id: id, date: execution_date};
    this.systemCall('booking/markagreed', p, callBack);
};
Booking.prototype.comment = function (id, comment, callBack) {
    var p = {id: id, comment: comment};
    this.systemCall('booking/comment', p, callBack);
};
Booking.prototype.full_price = function (id, full_price, callBack) {
    var p = {id: id, full_price: full_price};
    this.systemCall('booking/fullprice', p, callBack);
};
Booking.prototype.work_price = function (id, work_price, callBack) {
    var p = {id: id, work_price: work_price};
    this.systemCall('booking/workprice', p, callBack);
};
Booking.prototype.reward = function (id, reward, callBack) {
    var p = {id: id, reward: reward};
    this.systemCall('booking/reward', p, callBack);
};
Booking.prototype.status = function (id, status, callBack) {
    var p = {id: id, status: status};
    this.systemCall('booking/status', p, callBack);
};
Booking.prototype.get = function (id, callBack) {
    this.systemCall('booking/get', id, callBack);
};
Booking.prototype.onlyActive = function (callBack) {
    this.systemCall('booking/onlyactive', undefined, callBack);
};
Booking.prototype.onlyActiveByCity = function (callBack) {
    this.systemCall('booking/onlyactivebycity', this.city_id, callBack);
};
Booking.prototype.onlyNotActive = function (callBack) {
    this.systemCall('booking/onlynotactive', undefined, callBack);
};
Booking.prototype.onlyNotActiveByCity = function (callBack) {
    this.systemCall('booking/onlynotactivebycity', this.city_id, callBack);
};
Booking.prototype.onlyPaidByCity = function (callBack) {
    this.systemCall('booking/onlypaidbycity', this.city_id, callBack);
};

function Hairdresser(city_id) {
    this.city_id = city_id;
}
Hairdresser.prototype = new Engine();
Hairdresser.prototype.all = function (callBack) {
    this.systemCall('hairdresser/all', undefined, callBack);
};
Hairdresser.prototype.getPublic = function (callBack) {
    this.systemCall('hairdresser/public', this.city_id, callBack);
};
Hairdresser.prototype.allByCity = function (callBack) {
    this.systemCall('hairdresser/allbycity', this.city_id, callBack);
};
Hairdresser.prototype.onlyActiveByCity = function (callBack) {
    this.systemCall('hairdresser/onlyactivebycity', this.city_id, callBack);
};
Hairdresser.prototype.onlyNotActiveByCity = function (callBack) {
    this.systemCall('hairdresser/onlynotactivebycity', this.city_id, callBack);
};
Hairdresser.prototype.get = function (id, callBack) {
    this.systemCall('hairdresser/get', id, callBack);
};
Hairdresser.prototype.create = function (callBack) {
    this.systemCall('hairdresser/create', undefined, callBack);
};
Hairdresser.prototype.update = function (id, type, content, callBack) {
    var p = {id: id, type: type, content: content};
    this.systemCall('hairdresser/update', p, callBack);
};
Hairdresser.prototype.refreshPreview = function (h_id, callBack) {
    this.systemCall('hairdresser/refreshpreview', h_id, callBack);
};

function Photo(city_id) {
    var that = this;
    this.storage = {};
    this.city_id = city_id;
    this.getAllForCity(function (photos) {
        $.each(photos, function (i, photo) {
            if (that.storage[photo.hairdresser_id]) {
                that.storage[photo.hairdresser_id].push(photo.url);
            } else {
                that.storage[photo.hairdresser_id] = [photo.url];
            }
        });
    });
}
Photo.prototype = new Engine();
Photo.prototype.storage = {};
Photo.prototype.all = function (callBack) {
    this.systemCall('photo/all', undefined, callBack);
};
Photo.prototype.get = function (id, callBack) {
    this.systemCall('photo/get', id, callBack);
};
Photo.prototype.getFor = function (id, callBack) {
    this.systemCall('photo/getfor', id, callBack);
};
Photo.prototype.getActiveForCity = function (callBack) {
    this.systemCall('photo/getactiveforcity', this.city_id, callBack);
};
Photo.prototype.getAllForCity = function (callBack) {
    this.systemCall('photo/getallforcity', this.city_id, callBack);
};
Photo.prototype.add = function (hairdresser_id, url, vk_owner_id, vk_photo_id, callBack) {
    var p = {hairdresser_id: hairdresser_id, url: btoa(url), vk_owner_id: vk_owner_id, vk_photo_id: vk_photo_id};
    this.systemCall('photo/add', p, callBack);
};
Photo.prototype.updateOrder = function (photo_id, order_numer, callBack) {
    var p = {id: photo_id, order_number: order_numer};
    this.systemCall('photo/updateorder', p, callBack);
};

function EngineVK() {
}
EngineVK.prototype = new Engine();
EngineVK.prototype.getUser = function (user_id, callback) {
    url = 'http://api.vk.com/method/users.get?user_ids=' + user_id + '&v=5.34&fields=photo_max&callback=' + callback.name;
    this.crossDomainCall(url);
};
EngineVK.prototype.getAlbums = function (owner_id, callback) {
    url = 'http://api.vk.com/method/photos.getAlbums?owner_id=' + owner_id + '&v=5.34&need_covers=1&need_system=1&callback=' + callback.name;
    this.crossDomainCall(url);
};
EngineVK.prototype.getPhotos = function (owner_id, album_id, callback) {
    url = 'http://api.vk.com/method/photos.get?owner_id=' + owner_id + '&album_id=' + album_id + '&v=5.34&need_covers=1&need_system=1&callback=' + callback.name;
    this.crossDomainCall(url);
};
EngineVK.prototype.getPhotosById = function (photo_ids, callback) {
    photo_ids = (Array.isArray(photo_ids)) ? photo_ids.join() : photo_ids;
    url = 'http://api.vk.com/method/photos.getById?photos=' + photo_ids + '&v=5.34&callback=' + callback.name;
    this.crossDomainCall(url);
};
EngineVK.prototype.getGroups = function (user_id, callback) {
    url = 'http://api.vk.com/method/groups.get?user_id=' + user_id + '&v=5.34&extended=1&callback=' + callback.name;
    this.crossDomainCall(url);
};


