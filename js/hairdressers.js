function Hairdresser(id, name, photo, description, photos, price) {
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.description = description;
    this.photos = photos;
    this.photos_xs = [];
    this.price = price;
}
Hairdresser.id = null;
Hairdresser.name = null;
Hairdresser.photo = null;
Hairdresser.description = null;
Hairdresser.photos = null;
Hairdresser.photos_xs = null;
Hairdresser.price = null;
Hairdresser.prototype.setPhotosXs = function (phs) {
    this.photos_xs = phs;
};


function Order(id, name, phone, services, hair, cprice, calc_hairdresser_id) {
    this.hairdresser_id = id;
    this.client_name = name;
    this.client_phone = phone;
    this.services = services;
    this.hair_length = hair;
    this.cprice = cprice;
    this.calc_hairdresser_id = calc_hairdresser_id;
}
Order.hairdresser_id = null;
Order.client_name = null;
Order.client_phone = null;
Order.services = null;
Order.hair_length = null;
Order.cprice = null;
Order.calc_hairdresser_id = null;

function getHairdresserName(id) {
    var name = null;
    var hs = getHairdressers();
    $.each(hs, function (i, h) {
        if (h.id === id) name = h.name;
    });
    return name;
}
function getHairdresserById(id) {
    var res = undefined;
    var hs = getHairdressers();
    $.each(hs, function (i, h) {
        if (h.id === id) {
            res = h;
        }
    });
    return res;
}

function getPortfolioPhoto(h_id, index) {
    return getHairdresserById(h_id).photos[index];
}

function getPortfolioSize(h_id) {
    return getHairdresserById(h_id).photos.length;
}

function findHairdresserIdForOrder(ord) {
    var res = undefined;
    var maxCountServ = 0;
    var secondHaird = undefined;
    var hs = getHairdressers();
    //var egorova = getHairdresserById(16);
    //hs.unshift(egorova); //TODO delete this!
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

function getHairdressers() {
    // --- alive
    var p_churbanova = {
        modelnay: new PriceByLength(600, 700, 800),
        ukladka: new PriceByLength(600, 600, 600),
        melirovanie: new PriceByLength(1000, 1000, 1000),
        himia: new PriceByLength(1000, 1300, 1500),
        okrashivanie: new PriceByLength(1000, 1000, 1000),
        podmashinku: new PriceByLength(300, 300, 300),
        male_modelnay: new PriceByLength(500, 500, 600),
        vosstanovlenie: new PriceByLength(600, 600, 600)
    };
    var h_churbanova = new Hairdresser(9, 'Светлана', 'hairdressers_files/img/avatar/churbanova.jpg', '', [
        'http://cs618922.vk.me/v618922588/10c40/oozB7suJGPI.jpg',
        'http://cs618922.vk.me/v618922588/10c50/Red1SfoW-Xc.jpg',
        'http://cs618922.vk.me/v618922588/10c62/YkFMQ2qwqkQ.jpg',
        'http://cs618922.vk.me/v618922588/10c6b/vMB0_3Ohwa8.jpg',
        'http://cs618922.vk.me/v618922588/10c72/6pZW03cZywk.jpg',
        'http://cs618628.vk.me/v618628588/162e3/kMPticNtddE.jpg',
        'http://cs618628.vk.me/v618628588/16310/4UYSL198_K0.jpg',
        'http://cs618628.vk.me/v618628588/16322/U4dnAjTHJiU.jpg',
        'http://cs618628.vk.me/v618628588/1632b/xGJuKlpDiSg.jpg',
        'http://cs624923.vk.me/v624923588/11070/M9Gik9C2wmQ.jpg',
        'http://cs624923.vk.me/v624923588/11054/dNzyk03k9pY.jpg',
        'http://cs625218.vk.me/v625218588/13a85/vtx9S32a4hA.jpg',
        'http://cs625218.vk.me/v625218588/13a97/q1tb64J6xxE.jpg',
        'http://cs625218.vk.me/v625218588/13aa0/rvTQNaXPQNc.jpg',
        'http://cs625218.vk.me/v625218588/13abb/kl6swWDuBEI.jpg',
        'http://cs625218.vk.me/v625218588/16b5d/nyPU-GVn890.jpg',
        'http://cs625722.vk.me/v625722588/1a9b4/xt-z0Ta54BI.jpg'
    ], p_churbanova);
    var xs_churbanova = [
        'img/photo_xs/sc-1.jpg',
        'img/photo_xs/sc-2.jpg',
        'img/photo_xs/sc-3.jpg',
        'img/photo_xs/sc-4.jpg',
        'img/photo_xs/sc-5.jpg',
        'img/photo_xs/sc-6.jpg'
    ];
    h_churbanova.setPhotosXs(xs_churbanova);

    var p_morozova = {
        modelnay: new PriceByLength(250, 350, 450),
        vechernaiy: new PriceByLength(400, 550, 700),
        ukladka: new PriceByLength(200, 300, 400),
        melirovanie: new PriceByLength(700, 1100, 1600), /*himia: new PriceByLength(500, 500, 500),*/
        okrashivanie: new PriceByLength(500, 900, 1600),
        podmashinku: new PriceByLength(100, 150, 150),
        svadebnaiy: new PriceByLength(500, 1000, 1700),
        vosstanovlenie: new PriceByLength(1000, 1400, 2000),
        male_modelnay: new PriceByLength(200, 250, 300)
    };
    var h_morozova = new Hairdresser(10, 'Александра', 'hairdressers_files/img/avatar/morozova1.jpg', '', [
        'http://cs624328.vk.me/v624328074/259fe/EYpnwtoGoRg.jpg',
        'http://cs624328.vk.me/v624328074/25a0e/pJ2GPN1EzeU.jpg',
        'http://cs624328.vk.me/v624328074/25a05/u0uajeIpn0E.jpg',
        'http://cs625728.vk.me/v625728074/34c7e/iHiUbrbCsh4.jpg',
        'http://cs625728.vk.me/v625728074/34c31/liLeSaFvBx8.jpg',
        'http://cs625728.vk.me/v625728074/34c49/LvMDh_nliIg.jpg',
        'http://cs625728.vk.me/v625728074/34c2a/DalTKiiEAwY.jpg',
        'http://cs625728.vk.me/v625728074/34c12/qgjOkn_s7Ig.jpg',
        'http://cs624328.vk.me/v624328074/25a30/9vw5hX7SRyA.jpg',
        'http://cs624328.vk.me/v624328074/259e8/PQnKX2Dn6wg.jpg',
        'http://cs624328.vk.me/v624328074/259d1/tbfhmz9XWI4.jpg',
        'http://cs624328.vk.me/v624328074/259ab/IzZZ_Y9tQD4.jpg',
        'http://cs624328.vk.me/v624328074/2598e/oTJfF2OK_3k.jpg',
        'http://cs625130.vk.me/v625130074/162f2/0SGOe1E_eEk.jpg',
        'http://cs623416.vk.me/v623416074/100c7/-x2WZyh3j8g.jpg',
        'http://cs622122.vk.me/v622122074/eef4/zfjqjEQrp3E.jpg',
        'http://cs622317.vk.me/v622317074/e8fc/J2bEFQZ47zY.jpg',
        'http://cs622527.vk.me/v622527074/d780/VRvJEcN0VPU.jpg',
        'http://cs622527.vk.me/v622527074/d779/7nA3FAeAzjg.jpg',
        'http://cs622527.vk.me/v622527074/d770/rVlNORLdb3I.jpg',
        'http://cs622527.vk.me/v622527074/d759/nN1_UICgPEM.jpg',
        'http://cs622527.vk.me/v622527074/d750/Lkrkf_4zWZQ.jpg',
        'http://cs622527.vk.me/v622527074/d747/Ni8pN6tVVZg.jpg',
        'http://cs622527.vk.me/v622527074/d73e/nmzX0mDj8fA.jpg',
        'http://cs622527.vk.me/v622527074/d737/bbq80s6gSzU.jpg',
        'http://cs622527.vk.me/v622527074/d730/15ts16sxGBs.jpg',
        'http://cs622527.vk.me/v622527074/d722/1RTvWO7wCjI.jpg',
        'http://cs622527.vk.me/v622527074/d719/RHmc7wFxzp4.jpg',
        'http://cs622527.vk.me/v622527074/d704/BtXze5i5P2c.jpg'
    ], p_morozova);
    var xs_morozova = [
        'img/photo_xs/am-1.jpg',
        'img/photo_xs/am-2.jpg',
        'img/photo_xs/am-3.jpg',
        'img/photo_xs/am-4.jpg',
        'img/photo_xs/am-5.jpg',
        'img/photo_xs/am-6.jpg'
    ];
    h_morozova.setPhotosXs(xs_morozova);

    var p_mokeeva = {
        modelnay: new PriceByLength(250, 350, 450),
        vechernaiy: new PriceByLength(500, 600, 700),
        ukladka: new PriceByLength(250, 350, 450),
        melirovanie: new PriceByLength(600, 700, 800),
        okrashivanie: new PriceByLength(400, 500, 600), /*viprimlenie:new PriceByLength(300, 400, 500),*/
        vosstanovlenie: new PriceByLength(500, 600, 700),
        podmashinku: new PriceByLength(200, 300, 300),
        male_modelnay: new PriceByLength(250, 350, 350)
    };
    var h_mokeeva = new Hairdresser(11, 'Елена', 'hairdressers_files/img/avatar/mokeeva.jpg', 'Работаю только у себя на дому!', [
        'http://cs629128.vk.me/v629128129/1b10/ImZWMWBirm4.jpg',
        'http://cs629128.vk.me/v629128129/1b17/BhixKEnUqQc.jpg',
        'http://cs629128.vk.me/v629128129/1b1e/rxlQBRAsbsM.jpg',
        'http://cs629128.vk.me/v629128129/1b09/IN9kNnEKOyA.jpg'
    ], p_mokeeva);

    var p_kosenko = {
        vechernaiy: new PriceByLength(800, 800, 800),
        ukladka: new PriceByLength(800, 800, 800),
        modelnay: new PriceByLength(350, 350, 350),

        viprimlenie: new PriceByLength(1000, 2500, 4000),
        vosstanovlenie: new PriceByLength(1000, 2500, 4000),

        okrashivanie: new PriceByLength(800, 1200, 1800),
        melirovanie: new PriceByLength(1200, 1600, 2200),
        male_modelnay: new PriceByLength(300, 300, 300),
        podmashinku: new PriceByLength(200, 200, 200)
    };
    var h_kosenko = new Hairdresser(14, 'Елизавета', 'hairdressers_files/img/avatar/kosenko.jpg', '', [
        'http://cs6042.vk.me/v6042804/11625/OEs1djCfh_w.jpg',
        'http://cs623823.vk.me/v623823804/3cbf9/1ZEI8aaOu_Q.jpg',
        'http://cs623823.vk.me/v623823804/3a46d/nR_lH8sDDRc.jpg',
        'http://cs623823.vk.me/v623823804/3a477/Wh8O0g3Vyis.jpg'
    ], p_kosenko);

    var p_shkileva = {
        svadebnaiy: new PriceByLength(1000, 2000, 2500),
        vechernaiy: new PriceByLength(500, 500, 500),
        ukladka: new PriceByLength(300, 300, 300),
        modelnay: new PriceByLength(300, 300, 300),
        naraschivanie: new PriceByLength(2000, 2000, 2000),
        okrashivanie: new PriceByLength(500, 500, 500),
        melirovanie: new PriceByLength(500, 500, 500),
        male_modelnay: new PriceByLength(200, 200, 200),
        podmashinku: new PriceByLength(200, 200, 200)
    };
    var h_shkileva = new Hairdresser(15, 'Ирина', 'hairdressers_files/img/avatar/shkileva.jpg', '', [
        'http://cs624830.vk.me/v624830707/392d7/Zfi9KAJnSu0.jpg',
        'http://cs624830.vk.me/v624830707/392df/nIHj1F06rxk.jpg',
        'http://cs624830.vk.me/v624830707/392e9/MvZZgCBTuNk.jpg',
        'http://cs624830.vk.me/v624830707/392f2/ITuL8djxEiU.jpg'
    ], p_shkileva);

    var p_egorova = {
        svadebnaiy: new PriceByLength(800, 1000, 1300),
        vechernaiy: new PriceByLength(500, 800, 1000),
        ukladka: new PriceByLength(500, 800, 1000),
        modelnay: new PriceByLength(550, 650, 800),

        himia: new PriceByLength(800, 1500, 2000),
        naraschivanie: new PriceByLength(3500, 3500, 3500),

        okrashivanie: new PriceByLength(600, 800, 1200), //?
        melirovanie: new PriceByLength(600, 800, 1200),
        male_modelnay: new PriceByLength(250, 300, 350),
        podmashinku: new PriceByLength(250, 250, 250)
    };
    var h_egorova = new Hairdresser(16, 'Оксана', 'hairdressers_files/img/avatar/egorova1.jpg', 'Рада буду помочь в выборе образа.', [
        'http://cs623618.vk.me/v623618605/38b9c/nUHWmPsVb4k.jpg',
        'http://cs623618.vk.me/v623618605/38c15/SILjrmYWzH8.jpg',
        'http://cs623618.vk.me/v623618605/38ba5/ZX82F0_0-uA.jpg',
        'http://cs623618.vk.me/v623618605/38bbf/X5mJ5GS00u4.jpg',
        'http://cs623618.vk.me/v623618605/38bb5/lHHS1GE1p8g.jpg',
        'http://cs623618.vk.me/v623618605/38bc9/1zdg7fZGLuA.jpg',
        'http://cs623618.vk.me/v623618605/38bac/Tll0NoNkTeY.jpg',
        'http://cs623618.vk.me/v623618605/38bd3/o4735Py-sVw.jpg',
        'http://cs623618.vk.me/v623618605/38bdd/B-v1LEXU3MU.jpg',
        'http://cs623618.vk.me/v623618605/38be7/LTcQxnn4ybo.jpg',
        'http://cs623618.vk.me/v623618605/38bee/tIjwEhuyPXY.jpg',
        'http://cs623618.vk.me/v623618605/38b45/l2JNMlXZ_FY.jpg',
        'http://cs623618.vk.me/v623618605/38b4e/RSUjJTEcb2E.jpg',
        'http://cs623618.vk.me/v623618605/38b57/NB5wlNLMyEw.jpg',
        'http://cs623618.vk.me/v623618605/38b60/gw6-fjT3aD4.jpg',
        'http://cs623618.vk.me/v623618605/38b6a/SWSR-c_-H-g.jpg',
        'http://cs623618.vk.me/v623618605/38b74/uWBdYSJcRlo.jpg',
        'http://cs623618.vk.me/v623618605/38b7c/6VIVT-qpe5U.jpg',
        'http://cs623618.vk.me/v623618605/38b85/oBSzs-QbfXQ.jpg',
        'http://cs623618.vk.me/v623618605/38b8d/6keDu5u62pk.jpg',
        'http://cs623618.vk.me/v623618605/38b95/UkQ0RLBy7So.jpg',
        'http://cs623618.vk.me/v623618605/38bf8/WDLATAVib9o.jpg',
        'http://cs623618.vk.me/v623618605/38c02/U2YBkpIA5ew.jpg',
        'http://cs623618.vk.me/v623618605/38c0c/npukDT38R8k.jpg',
        'http://cs623618.vk.me/v623618605/38c1e/4kK6BVqkbMQ.jpg',
        'http://cs623618.vk.me/v623618605/38c27/gyt0IOV2ubs.jpg',
        'http://cs623618.vk.me/v623618605/38c31/4LpQhmZnXc4.jpg',
        'http://cs623618.vk.me/v623618605/38c49/HmSxHStSK9o.jpg'
    ], p_egorova);
    var xs_egorova = [
        'img/photo_xs/oe-1.jpg',
        'img/photo_xs/oe-2.jpg',
        'img/photo_xs/oe-3.jpg',
        'img/photo_xs/oe-4.jpg',
        'img/photo_xs/oe-5.jpg',
        'img/photo_xs/oe-6.jpg'
    ];
    h_egorova.setPhotosXs(xs_egorova);

    var p_bagromiyan = {
        svadebnaiy: new PriceByLength(1000, 1500, 2500),
        vechernaiy: new PriceByLength(500, 1000, 1500),
        modelnay: new PriceByLength(500, 650, 800),
        male_modelnay: new PriceByLength(300, 400, 500)
    };
    var h_bagromiyan = new Hairdresser(17, 'Анна', 'hairdressers_files/img/avatar/bagramiyan.jpg', 'Мастер причесок и макияжа (от 1000 руб). Работаю в любое время дня и ночи.', [
        'http://cs624031.vk.me/v624031754/3568b/dDNnob5tDGc.jpg',
        'http://cs624031.vk.me/v624031754/356a6/CO_1Za5rIbM.jpg',
        'http://cs624031.vk.me/v624031754/35694/ho15FJDsXu4.jpg',
        'http://cs624031.vk.me/v624031754/3569d/KLk5EJotJoY.jpg',
        'http://cs624031.vk.me/v624031754/356af/lEI-y97-JVc.jpg',
        'http://cs624031.vk.me/v624031754/356b7/D6xkxGYSauM.jpg',
        'http://cs624031.vk.me/v624031754/356c9/kH6CizkpHGg.jpg'
    ], p_bagromiyan);


    var p_kariygina = {
        svadebnaiy: new PriceByLength(3000, 3000, 3000),
        vechernaiy: new PriceByLength(2000, 2000, 2000),
        ukladka: new PriceByLength(800, 800, 800),
        modelnay: new PriceByLength(1000, 1000, 1000),

        vosstanovlenie: new PriceByLength(1000, 1000, 1000),

        okrashivanie: new PriceByLength(1500, 1500, 1500),
        melirovanie: new PriceByLength(2000, 2000, 2000),
        male_modelnay: new PriceByLength(600, 600, 600),
        podmashinku: new PriceByLength(350, 350, 350)
    };
    var h_kariygina = new Hairdresser(12, 'Мария', 'hairdressers_files/img/avatar/kariagina2.jpg', 'Работаю У СЕБЯ на дому! Выезжаю только на прически и макияж.', [
        'http://cs624521.vk.me/v624521023/319c1/tSeevyx5zNM.jpg',
        'http://cs616427.vk.me/v616427023/1cff0/z-KXl0V2bmI.jpg',
        'http://cs624522.vk.me/v624522023/2ef2c/2L6KehcJRDU.jpg',
        'http://cs624522.vk.me/v624522023/2eeea/oHfreZrU6P4.jpg',
        'http://cs624521.vk.me/v624521023/31386/Y_V9FpLSg_g.jpg',
        'http://cs619526.vk.me/v619526023/1146f/VftU-rFc260.jpg',
        'http://cs624522.vk.me/v624522023/2ef78/KWJxoyAhuKc.jpg',
        'http://cs624522.vk.me/v624522023/2ef81/QXj7ZPXqMrI.jpg',
        'http://cs619526.vk.me/v619526023/1066d/TqtQWutUpQ8.jpg',
        'http://cs616720.vk.me/v616720023/19e97/NhZXCPJjk2E.jpg',
        'http://cs623226.vk.me/v623226023/39bc5/IDBIqG29K18.jpg',
        'http://cs623226.vk.me/v623226023/38440/U0wx_ftmri0.jpg',
        'http://cs623226.vk.me/v623226023/38247/bG4lym3QddA.jpg',
        'http://cs623226.vk.me/v623226023/37ee6/UQDcQ30hiPI.jpg',
        'http://cs624521.vk.me/v624521023/31c61/IYQH_NW8m90.jpg',
        'http://cs624521.vk.me/v624521023/312e2/-fyVmjUYaGQ.jpg',
        'http://cs624521.vk.me/v624521023/30f27/-nlriULAn3Y.jpg',
        'http://cs625326.vk.me/v625326023/30a48/5jJsZVsUxqk.jpg',
        'http://cs619526.vk.me/v619526023/f3f4/QBepPX7doh4.jpg'
    ], p_kariygina);

    var p_leontieva = {
        svadebnaiy: new PriceByLength(2500, 2500, 3000),
        vechernaiy: new PriceByLength(1000, 1500, 2000),
        ukladka: new PriceByLength(600, 650, 700)

    };
    var h_leontieva = new Hairdresser(18, 'Ольга', 'hairdressers_files/img/avatar/leontieva.jpg', 'Свадебный макияж 1500-2000 руб, вечерний и дневной макияж 1000-1500 руб', [
        'http://cs314424.vk.me/v314424469/50fd/I_EmDM_-VDo.jpg',
        'http://cs314424.vk.me/v314424469/5118/9WkNqhTc-YU.jpg',
        'http://cs314424.vk.me/v314424469/5133/zmZofUj4Fuc.jpg',
        'http://cs314423.vk.me/v314423469/8d5f/cd3khQT7FB0.jpg',
        'http://cs424917.vk.me/v424917469/394a/VKp8q00Ao84.jpg',
        'http://cs418916.vk.me/v418916469/709c/Cn9J0tBzKHc.jpg',
        'http://cs403225.vk.me/v403225469/a898/ZCUW4HV85hw.jpg',
        'http://cs403225.vk.me/v403225469/a8a6/CSABftUblEg.jpg',
        'http://cs403225.vk.me/v403225469/a89f/jQX5r9WI2gA.jpg',
        'http://cs424917.vk.me/v424917469/38a8/71u3Gb-Fz9Q.jpg',
        'http://cs403225.vk.me/v403225469/a10d/i0ZjIN4dgjw.jpg',
        'http://cs403225.vk.me/v403225469/a0e3/NHWjOOl0arQ.jpg',
        'http://cs302109.vk.me/u91089469/153161045/x_2e4c1d55.jpg',
        'http://cs623330.vk.me/v623330469/d21e/vZBMP413pUE.jpg',
        'http://cs622824.vk.me/v622824469/33187/Ky0ng3_RFho.jpg',
        'http://cs625328.vk.me/v625328469/203d4/sVPBnjJBsi8.jpg',
        'http://cs618931.vk.me/v618931469/90b1/Vpr1-CqRxYM.jpg'
    ], p_leontieva);

    var p_maxalova = {
        svadebnaiy: new PriceByLength(3000, 3000, 3000),
        vechernaiy: new PriceByLength(1700, 2000, 2500),
        ukladka: new PriceByLength(1500, 1500, 1500),
        modelnay: new PriceByLength(500, 500, 500),

        viprimlenie: new PriceByLength(2000, 2500, 3000),
        vosstanovlenie: new PriceByLength(1500, 1500, 2000),
        naraschivanie: new PriceByLength(5000, 5000, 5000),

        okrashivanie: new PriceByLength(1000, 2500, 4000),
        melirovanie: new PriceByLength(2000, 2250, 2500)

    };
    var h_maxalova = new Hairdresser(19, 'Александра', 'hairdressers_files/img/avatar/maxalova.jpg', 'Макияж от 1500 руб.', [
        'http://cs425928.vk.me/v425928368/4d3d/gEKlsgz2y0I.jpg',
        'http://cs322718.vk.me/v322718368/4aa6/jB7L6IDfxnc.jpg',
        'http://cs313225.vk.me/v313225368/4eb7/vrVuDpO4v6M.jpg',
        'http://cs317318.vk.me/v317318368/8983/r6qXimvWLeM.jpg',
        'http://cs314320.vk.me/v314320368/422e/7kLyhlmaSIQ.jpg',
        'http://cs314320.vk.me/v314320368/4249/YSrNSIJyfu8.jpg',
        'http://cs416624.vk.me/v416624368/90ea/i01-roAb9Y8.jpg',
        'http://cs314320.vk.me/v314320368/4225/peY7C_jKCwM.jpg',
        'http://cs314320.vk.me/v314320368/421c/uJ7tCw4Aya0.jpg',
        'http://cs317318.vk.me/v317318368/89d4/gC1zyexbwFg.jpg',
        'http://cs317318.vk.me/v317318368/89b0/JTxSh9GWLF4.jpg',
        'http://cs314320.vk.me/v314320368/4252/LIFEG4jkmMQ.jpg',
        'http://cs314320.vk.me/v314320368/4213/tpxdZZpggKU.jpg',
        'http://cs314320.vk.me/v314320368/420a/BSpaoLXwexA.jpg',
        'http://cs314320.vk.me/v314320368/41f8/N_wAOyEH7Qg.jpg',
        'http://cs416624.vk.me/v416624368/915f/7QI66PEVOl0.jpg',
        'http://cs416624.vk.me/v416624368/9129/A_G01xMrTO0.jpg',
        'http://cs314320.vk.me/v314320368/41e6/aFmDHrasYdQ.jpg',
        'http://cs314320.vk.me/v314320368/41b9/QcrLfOBTJCM.jpg',
        'http://cs416424.vk.me/v416424368/705d/jxInY5-m11I.jpg',
        'http://cs416424.vk.me/v416424368/7054/Kw60prMpBfA.jpg',
        'http://cs416424.vk.me/v416424368/7042/eMXEPBim9xg.jpg',
        'http://cs416424.vk.me/v416424368/7030/IifvZv2GE6U.jpg',
        'http://cs301115.vk.me/v301115368/48da/5jz9SKy_NiI.jpg',
        'http://cs301115.vk.me/v301115368/4889/DU3BLXDEmTQ.jpg',
        'http://cs301115.vk.me/v301115368/4877/LpO1nY35R4Y.jpg',
        'http://cs406227.vk.me/v406227368/87cb/l7w6iujBrW8.jpg',
        'http://cs406227.vk.me/v406227368/87b0/dLNRX-GLiL0.jpg',
        'http://cs406227.vk.me/v406227368/87a7/X2wpHhTE5M0.jpg',
        'http://cs413524.vk.me/v413524368/15a2/CsO5hxXI37I.jpg',
        'http://cs413524.vk.me/v413524368/1563/gpyebLfEQNA.jpg'
    ], p_maxalova);

    var p_vixreva = {
        svadebnaiy: new PriceByLength(800, 800, 3000),
        vechernaiy: new PriceByLength(500, 1000, 1500),
        modelnay: new PriceByLength(300, 350, 450),

        himia: new PriceByLength(800, 1500, 3000),
        viprimlenie: new PriceByLength(1000, 2000, 6000),
        vosstanovlenie: new PriceByLength(200, 1500, 5500),
        naraschivanie: new PriceByLength(7000, 7000, 7000),

        okrashivanie: new PriceByLength(300, 1000, 2000),
        melirovanie: new PriceByLength(600, 1000, 2500),
        male_modelnay: new PriceByLength(350, 350, 350),
        podmashinku: new PriceByLength(200, 200, 200)

    };
    var h_vixreva = new Hairdresser(20, 'Екатерина', 'hairdressers_files/img/avatar/vixreva.jpg', '', [
        'http://cs622223.vk.me/v622223210/1da57/PEru02FR04s.jpg',
        'http://cs622223.vk.me/v622223210/1da5e/7eAb_q-HZ6c.jpg',
        'http://cs622223.vk.me/v622223210/1da65/7jR2HTjdSZQ.jpg',
        'http://cs622223.vk.me/v622223210/1da16/OPSAFQ1DDHw.jpg',
        'http://cs622820.vk.me/v622820210/18b86/HlK43yrvdv0.jpg',
        'http://cs622820.vk.me/v622820210/18b7e/MBwqpyxzd4A.jpg',
        'http://cs622820.vk.me/v622820210/18b8e/FfrME3lnsJo.jpg',
        'http://cs622820.vk.me/v622820210/18b95/xrL0pCdbWIM.jpg',
        'http://cs622223.vk.me/v622223210/1da47/UvKK6l_E9Eo.jpg',
        'http://cs622820.vk.me/v622820210/18bd3/xPvVcI_UaPE.jpg',
        'http://cs622820.vk.me/v622820210/18bbb/8vlWy_W12rM.jpg',
        'http://cs622820.vk.me/v622820210/18bb4/RBftY2Ux7_Q.jpg',
        'http://cs622820.vk.me/v622820210/18be4/oz24hZ8peYk.jpg',
        'http://cs622820.vk.me/v622820210/18b9c/_CxHaOlJNVk.jpg',
        'http://cs622223.vk.me/v622223210/1da40/QenpX8Ybea4.jpg',
        'http://cs621625.vk.me/v621625210/19fe7/VWY0Cxv2w50.jpg',
        'http://cs621625.vk.me/v621625210/19fee/dJTxMmOunG8.jpg',
        'http://cs621625.vk.me/v621625210/19ff5/FHddo11CkSY.jpg'
    ], p_vixreva);

    var p_gevorgizova = {
        svadebnaiy: new PriceByLength(1500, 3000, 4000),
        vechernaiy: new PriceByLength(700, 1300, 2500),
        ukladka: new PriceByLength(400, 550, 700),
        modelnay: new PriceByLength(600, 800, 1100),

        himia: new PriceByLength(800, 1900, 3000),
        viprimlenie: new PriceByLength(3500, 5500, 7500),
        vosstanovlenie: new PriceByLength(3500, 5500, 7500),
        naraschivanie: new PriceByLength(2000, 2000, 2000),

        okrashivanie: new PriceByLength(1900, 2500, 2800),
        melirovanie: new PriceByLength(1500, 2000, 3000),
        male_modelnay: new PriceByLength(700, 1000, 1500),
        podmashinku: new PriceByLength(500, 500, 500)

    };
    var h_gevorgizova = new Hairdresser(21, 'Екатерина', 'hairdressers_files/img/avatar/gevorgizova.jpg', '', [
        'http://cs406419.vk.me/v406419108/45aa/PT9PX00BvGw.jpg',
        'http://cs406419.vk.me/v406419108/467a/YfauA8jiE7c.jpg',
        'http://cs406419.vk.me/v406419108/45cb/sFxEDS-ohpQ.jpg',
        'http://cs406419.vk.me/v406419108/45f0/n4P03wRLtDE.jpg',
        'http://cs406419.vk.me/v406419108/45e9/8PLvDonoXqw.jpg',
        'http://cs406419.vk.me/v406419108/462b/K7jv6bxlCbQ.jpg',
        'http://cs406419.vk.me/v406419108/4644/-uU3a8QUO10.jpg',
        'http://cs418631.vk.me/v418631108/24dd/aWhZuOVVfy0.jpg',
        'http://cs418631.vk.me/v418631108/24f8/5nq5v3KMwHM.jpg',
        'http://cs406419.vk.me/v406419108/45ba/qmLSwa2xS6w.jpg',
        'http://cs418631.vk.me/v418631108/2513/pshu8FGVuXU.jpg'
    ], p_gevorgizova);

    var p_razhikova = {
        svadebnaiy: new PriceByLength(1000, 1000, 1000),
        vechernaiy: new PriceByLength(1000, 1000, 1000),
        modelnay: new PriceByLength(350, 350, 350),

        naraschivanie: new PriceByLength(1000, 1000, 1000),
        melirovanie: new PriceByLength(500, 500, 500),

        okrashivanie: new PriceByLength(350, 350, 350),
        male_modelnay: new PriceByLength(350, 350, 350)
    };
    var h_razhikova = new Hairdresser(22, 'Светлана', 'hairdressers_files/img/avatar/razhikova.jpg', '', [
        'http://cs10478.vk.me/u150293852/145184407/x_0c8bc109.jpg',
        'http://cs5185.vk.me/u150293852/145184407/x_27dd7d43.jpg',
        'http://cs10478.vk.me/u150293852/145184407/x_4f0e3891.jpg',
        'http://cs10478.vk.me/u150293852/145184407/x_f8eba2b0.jpg',
        'http://cs402925.vk.me/v402925852/9175/llQNycOq3dk.jpg',
        'http://cs402925.vk.me/v402925852/9165/MPc_Pw5txGQ.jpg',
        'http://cs402925.vk.me/v402925852/916d/FlGHay0cVvk.jpg',
        'http://cs402925.vk.me/v402925852/917e/G0q0VePelhw.jpg',
        'http://cs5186.vk.me/u150293852/145184407/x_105fc0d7.jpg',
        'http://cs402925.vk.me/v402925852/9187/3uekH0364aA.jpg',
        'http://cs402925.vk.me/v402925852/918f/ZOgw2s4eOLc.jpg',
        'http://cs402925.vk.me/v402925852/9197/Cyj-7BBKEM8.jpg',
        'http://cs402925.vk.me/v402925852/919e/LuyPPK-iT_c.jpg',
        'http://cs402925.vk.me/v402925852/91a6/BYsYq1HfQag.jpg',
        'http://cs402925.vk.me/v402925852/91ae/flXXL8J7cns.jpg',
        'http://cs402925.vk.me/v402925852/91bd/0nPxHz3YWdA.jpg',
        'http://cs402925.vk.me/v402925852/91cd/zfVZ3xb4H9A.jpg'
    ], p_razhikova);

    var p_otvagina = {
        svadebnaiy: new PriceByLength(1200, 1200, 1200),
        vechernaiy: new PriceByLength(400, 400, 400),
        ukladka: new PriceByLength(300, 300, 300),

        viprimlenie: new PriceByLength(600, 600, 600),
        vosstanovlenie: new PriceByLength(300, 300, 300),


        okrashivanie: new PriceByLength(300, 300, 300),
        melirovanie: new PriceByLength(500, 500, 500)
    };
    var h_otvagina = new Hairdresser(23, 'Екатерина', '', 'Мастер по прическам и макияжу.', [
        'https://pp.vk.me/c9389/v9389031/1239/pEnyfn6TGXk.jpg',
        'https://pp.vk.me/c620427/v620427031/a9d8/ZFwgSpKv858.jpg',
        'https://pp.vk.me/c421916/v421916031/b28c/8vic2wcA-JI.jpg',
        'https://pp.vk.me/c622018/v622018031/31c/kc4__-ldF2Y.jpg',
        'https://pp.vk.me/c614827/v614827851/157bc/kIen6w0HAvU.jpg',
        'https://pp.vk.me/c620427/v620427031/a9e1/KmeLf3QSAa4.jpg',
        'https://pp.vk.me/c9389/v9389031/132a/lZHt7DZeAyw.jpg',
        'https://pp.vk.me/c424720/v424720031/5121/n76qwD5eGvw.jpg',
        'https://pp.vk.me/c424720/v424720031/5118/_xBzG3kKXOk.jpg',
        'https://pp.vk.me/c320327/v320327031/4e93/DmI_hgB_bfo.jpg',
        'https://pp.vk.me/c421029/v421029031/8eaf/bMcbwrralOU.jpg',
        'https://pp.vk.me/c419716/v419716031/82e4/1lyIls1wXbE.jpg',

        'http://cs617623.vk.me/v617623464/1042d/xY1Wx0myz80.jpg',
        'http://cs309621.vk.me/v309621031/79f4/fGzt0R5wctA.jpg',
        'http://cs9389.vk.me/v9389031/15af/VhGHmHN8-wc.jpg',
        'http://cs619627.vk.me/v619627031/3e42/AhtEsBWpQg0.jpg'
    ], p_otvagina);

    var p_koltunova = {
        svadebnaiy: new PriceByLength(1000, 1500, 2000),
        vechernaiy: new PriceByLength(500, 1000, 1500),
        modelnay: new PriceByLength(500, 700, 900),

        okrashivanie: new PriceByLength(1500, 2000, 2500),
        melirovanie: new PriceByLength(1000, 1700, 2500),
        male_modelnay: new PriceByLength(500, 600, 700)
    };
    var h_koltunova = new Hairdresser(24, 'Яна', '', '', [
        'https://pp.vk.me/c622118/v622118803/34885/SlEwbA-h1vY.jpg',
        'https://pp.vk.me/c622430/v622430803/3090c/zKPBvkKgt-4.jpg',
        'https://pp.vk.me/c622430/v622430803/308e5/dWwDtNhQ40k.jpg',
        'https://pp.vk.me/c622430/v622430803/30678/QQG2E7xz0-k.jpg',
        'https://pp.vk.me/c622330/v622330803/30632/EgY-hifiMHI.jpg',
        'https://pp.vk.me/c621419/v621419803/23bba/G6zN4pDj2x8.jpg',
        'https://pp.vk.me/c621419/v621419803/23bc2/B4v8yxN-k_U.jpg',
        'https://pp.vk.me/c622330/v622330803/30628/CCAXvnQT9BQ.jpg'
    ], p_koltunova);

    var p_molchanova = {
        svadebnaiy: new PriceByLength(1000, 1000, 1000),
        vechernaiy: new PriceByLength(700, 700, 700),
        ukladka: new PriceByLength(500, 500, 500),
        modelnay: new PriceByLength(300, 300, 300),

        vosstanovlenie: new PriceByLength(500, 500, 500),

        okrashivanie: new PriceByLength(400, 400, 400),
        melirovanie: new PriceByLength(700, 700, 700),
        male_modelnay: new PriceByLength(300, 300, 300),
        podmashinku: new PriceByLength(300, 300, 300)
    };
    var h_molchanova = new Hairdresser(25, 'Вероника', '', 'Выезжаю на дом в Дзержинск, Кстово и Нижний Новгород', [
        'https://pp.vk.me/c622427/v622427857/25be9/JFshgFOCrM8.jpg',
        'https://pp.vk.me/c313623/v313623857/3ba8/WHpQZU8JuUA.jpg',
        'https://pp.vk.me/c623224/v623224857/3b2a6/HbLqr7pOEhE.jpg',
        'https://pp.vk.me/c623224/v623224857/3b29c/0qwYwrC9v0Q.jpg',
        'https://pp.vk.me/c623224/v623224857/38ceb/nRruo9b-1Z0.jpg',
        'http://cs322527.vk.me/v322527857/82e2/5e1IuMH4-2M.jpg',
        'https://pp.vk.me/c623224/v623224857/38cdd/OnCQUVHuy2U.jpg',
        'https://pp.vk.me/c623224/v623224857/38a69/6iKdTFJief8.jpg',
        'https://pp.vk.me/c623224/v623224857/38a52/nG-fxGs7Dqk.jpg',
        'https://pp.vk.me/c623224/v623224857/38a44/Nri9sWNeAw0.jpg',
        'https://pp.vk.me/c623224/v623224857/3b24a/S0nR4T6fYdU.jpg',
        'https://pp.vk.me/c622427/v622427857/23b1e/xYSSwl0sFM0.jpg'
    ], p_molchanova);

    var p_bahtina = {
        svadebnaiy: new PriceByLength(1000, 1500, 2000),
        vechernaiy: new PriceByLength(1000, 1000, 1000),
        ukladka: new PriceByLength(500, 700, 800),
        modelnay: new PriceByLength(600, 600, 600),

        vosstanovlenie: new PriceByLength(1500, 1500, 1500),

        okrashivanie: new PriceByLength(1500, 1500, 1500),
        melirovanie: new PriceByLength(1000, 1000, 1000),
        male_modelnay: new PriceByLength(400, 400, 400),
        podmashinku: new PriceByLength(300, 300, 300)
    };
    var h_bahtina = new Hairdresser(26, 'Нина', '', 'Все стрижки выполняются по технологии «Vidal Sassoon». Основа данной техники – это максимальная точность формы и линий.', [
        'https://pp.vk.me/c424719/v424719720/130d/3liixbN1As8.jpg',
        'https://53.img.avito.st/1280x960/1524966853.jpg',
        'https://98.img.avito.st/1280x960/1524967098.jpg',
        'https://27.img.avito.st/1280x960/1524973827.jpg',
        'https://40.img.avito.st/1280x960/1524973940.jpg',
        'https://77.img.avito.st/1280x960/1524974077.jpg'
    ], p_bahtina);

    return [ /*h_molchanova,*/ h_churbanova, h_morozova, h_egorova, h_bagromiyan, h_maxalova, h_vixreva, h_bahtina, h_leontieva, h_gevorgizova, h_koltunova, h_otvagina, h_razhikova, /*h_kosenko,*/ h_shkileva, h_kariygina, h_mokeeva];
}

/*
 svadebnaiy: new PriceByLength( , ,  ),
 vechernaiy: new PriceByLength( , ,  ),
 ukladka: new PriceByLength( , ,  ),
 modelnay: new PriceByLength( , ,  ),

 himia: new PriceByLength( , ,  ),
 viprimlenie: new PriceByLength( , ,  ),
 vosstanovlenie: new PriceByLength( , ,  ),
 naraschivanie: new PriceByLength( , ,  ),

 okrashivanie: new PriceByLength( , ,  ),
 melirovanie: new PriceByLength( , ,  ),
 male_modelnay: new PriceByLength( , ,  ),
 podmashinku: new PriceByLength( , ,  )
 */


function findPrice(h, service, hair_length) {
    var priceByHair = h.price[service];
    return priceByHair[hair_length];
}


function Price() {
}

Price.svadebnaiy = null;
Price.vechernaiy = null;
Price.ukladka = null;
Price.modelnay = null;

Price.himia = null;
Price.viprimlenie = null;
Price.vosstanovlenie = null;
Price.naraschivanie = null;

Price.okrashivanie = null;
Price.melirovanie = null;
Price.male_modelnay = null;
Price.podmashinku = null;


function PriceByLength(s, m, l) {
    this.short_hair = s;
    this.medium_hair = m;
    this.long_hair = l;
}

PriceByLength.short_hair = null;
PriceByLength.medium_hair = null;
PriceByLength.long_hair = null;
PriceByLength.prototype.toString = function () {
    return this.short_hair;
};