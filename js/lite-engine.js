function LiteEngine(city_id) {
    var that = this;
    this.photoStorage = {};
    //this.hairdresserStorage = [];
    this.city_id = city_id;
    this.hairdresserLoad = $.Deferred();
    this.photoLoad = $.Deferred();

    this.hairdressers(function (hs) {
        that.hairdresserStorage = hs;
        that.hairdresserLoad.resolve(hs);
        that.initPhotos();
    });
    console.log(this);
}
LiteEngine.prototype.city_id = 0;
LiteEngine.prototype.photoStorage = {};
LiteEngine.prototype.hairdresserStorage = [];
LiteEngine.prototype.hairdresserLoad = null;
LiteEngine.prototype.photoLoad = null;
LiteEngine.prototype.systemCall = function (method, params, callback) {
    console.log("[" + method + "]", params);
    var url = (params != undefined) ? method + '/' + JSON.stringify(params) : method;
    url = '/engine/public/' + url;
    //console.debug(url);
    $.get(url, undefined,
        function (response) {
            console.log("[" + method + "] responce:", response);
            if (callback != undefined) {
                callback(response);
            }
        }).fail(function () {
            $('#loading_bar').hide();
            $('#failOrderModal').modal('show');
            console.error("AJAX connection error");
            yaCounter30665247.reachGoal('LOADING_FAIL');
        });
};
LiteEngine.prototype.crossDomainCall = function (url) {
    console.log(url);
    var script = document.createElement('SCRIPT');
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
};
LiteEngine.prototype.booking = function (ord, callBack) {
    var p = {hairdresser_id: ord.hairdresser_id, client_name: ord.client_name, client_phone: ord.client_phone, city_id: this.city_id, services: ord.services};
    this.systemCall('booking/add', p, callBack);
};
LiteEngine.prototype.hairdressers = function (callBack) {
    this.systemCall('hairdresser/public', this.city_id, callBack);
};
LiteEngine.prototype.getPhotosForCity = function (callBack) {
    this.systemCall('photo/getactiveforcity', this.city_id, callBack);
};
LiteEngine.prototype.initPhotos = function () {
    var that = this;
    this.getPhotosForCity(function (photos) {
        $.each(photos, function (i, photo) {
            if (that.photoStorage[photo.hairdresser_id]) {
                that.photoStorage[photo.hairdresser_id].push(photo.url);
            } else {
                that.photoStorage[photo.hairdresser_id] = [photo.url];
            }
        });
        that.photoLoad.resolve();
    });
};

