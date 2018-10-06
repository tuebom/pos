// Dom7
var $$ = Dom7;
var AdMob = null;

// Framework7.use(Framework7Keypad);

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.pos', // App bundle ID
  name: 'Sistem POS', // App name
  theme: 'auto', // Automatic theme detection
  init: true,
  initOnDeviceReady: true,
  
  touch: {
    disableContextMenu: false,
  },
  
  // App root data
  data: function () {
    return {
      db: null,

      // periode berjalan
      bulan: 0,
      tahun: 0,

      currentGroup: 0,
      currentDate: null,
      
      // for editing
      currentCode: null,
      currentPos: null,
      currentNom: 0,
      
      token: null,
      push: null,
      admobid: {}
    };
  },
  // App root methods
  methods: {
    // helloWorld: function () {
      // app.dialog.alert('Hello World!');
    // },
    editItem: function(kode) {
      
    }
  },
  on: {
    init: function () {

      /*function copyDatabaseFile(dbName) {

        var sourceFileName = cordova.file.applicationDirectory + 'www/' + dbName;
        var targetDirName = cordova.file.dataDirectory;

        return Promise.all([
          new Promise(function (resolve, reject) {
            resolveLocalFileSystemURL(sourceFileName, resolve, reject);
          }),
          new Promise(function (resolve, reject) {
            resolveLocalFileSystemURL(targetDirName, resolve, reject);
          })
        ]).then(function (files) {
          var sourceFile = files[0];
          var targetDir = files[1];
          return new Promise(function (resolve, reject) {
            targetDir.getFile(dbName, {}, resolve, reject);
          }).then(function () {
            console.log("file already copied");
          }).catch(function () {
            console.log("file doesn't exist, copying it");
            return new Promise(function (resolve, reject) {
              sourceFile.copyTo(targetDir, dbName, resolve, reject);
            }).then(function () {
              console.log("database file copied");
            });
          });
        });
      }*/

      // copyDatabaseFile('dagang.db').then(function () {
        // // success! :)
        // app.data.db = window.sqlitePlugin.openDatabase({name: 'dagang.db'});
/*         var currentDate = new Date();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        
        var db = app.data.db;
        
        db.transaction(function(tx) {
          tx.executeSql('insert into setup (nama, blnsaldo, thnsaldo) values (?, ?, ?);', ['Nama Usaha Anda',month,year]);
        }, function(error) {
          app.dialog.alert('insert error: ' + error.message);
        });      
 */        
      // }).catch(function (err) {
        // // error! :(
        // console.log(err);
      // });
      
      // $$('#my-login-screen [name="mbrid"]').val(localStorage.getItem('mbrid'));
      // $$('#my-login-screen [name="nohp"]').val(localStorage.getItem('nohp'));

      /*
      this.data.push = PushNotification.init({
        "android": {
            "senderID": "857182253756" //"597497239727"
        },
        "ios": {
            "sound": true,
            "vibration": true,
            "badge": true
        },
        "windows": {}
      });

      var push = this.data.push;

      push.on('registration', function(data) {

        var oldRegId = localStorage.getItem('RegId');
        if (oldRegId !== data.registrationId) {
            // Save new registration ID
            localStorage.setItem('RegId', data.registrationId);
            // Post registrationId to your app server as the value has changed
            // app.dialog.alert('Registrasi Id berhasil!');
        }

      });

      push.on('notification', function(data) {
        
        // show message
        app.dialog.alert(data.message, 'Sistem Dagang');
        
        // update info saldo
        setTimeout(function () {

          // http://212.24.111.23/
          app.request.get('http://212.24.111.23/dagang/member/saldo/'+ app.data.mbrid, function (res) {
          
            var data = JSON.parse(res);
        
            if (data.status) {
              $$('.saldo').text(parseInt(data.saldo).toLocaleString('ID'));
              app.data.saldo = parseInt(data.saldo);
              app.data.bonus = parseInt(data.bonus);
            } else {
              app.dialog.alert(data.message, 'Sistem Dagang');
            }
          });
        }, 1000);
      });
      
      
      //run admob
      if( /(android)/i.test(navigator.userAgent) ) {
        this.data.admobid = { // for Android
          banner: 'ca-app-pub-1170231320150532/4785613972', //RedagroBanner
          interstitial: 'ca-app-pub-xxxxxxxxxxxxx/oooooooooooo'
        };
      } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        this.data.admobid = { // for iOS
          banner: 'ca-app-pub-xxxxxxxxxxxxx/oooooooooooo',
          interstitial: 'ca-app-pub-xxxxxxxxxxxxx/oooooooooooo'
        };
      } else {
        this.data.admobid = { // for Windows Phone
          banner: 'ca-app-pub-xxxxxxxxxxxxx/oooooooooooo',
          interstitial: 'ca-app-pub-xxxxxxxxxxxxx/oooooooooooo'
        };
      }
     
      if ( AdMob ) {
     
        // this will create a banner on startup
        AdMob.createBanner( {
          adId: this.data.admobid.banner,
          adSize: 'SMART_BANNER',
          position: AdMob.AD_POSITION.BOTTOM_CENTER,
          // isTesting: true, // TODO: remove this line when release
          autoShow: false,
          overlap: false,
          // offsetTopBar: false,
          bgColor: 'white'
        } );
      }//*/
    },     
  },
  // App routes
  routes: routes,
  // Enable panel left visibility breakpoint
  panel: {
    leftBreakpoint: 960,
  },
});

// Init/Create left panel view
var mainView = app.views.create('.view-left', {
  url: '/'
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

// create searchbar
var searchbar = app.searchbar.create({
  el: '.searchbar',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});

// var swiper = app.swiper.create('.swiper-container', {
    // speed: 400,
    // //slidesPerView: auto,
    // loop: true,
    // //autoHeight: true,
    // shortSwipes: false,
    // longSwipes: false,
    // //effect:'fade'
    // //spaceBetween: 100
// });

// swiper.autoplay.start();

$$('.barcode-scan1').on('click', function () {
     
  cordova.plugins.barcodeScanner.scan(
    function (result) {
        // app.methods.editItem(result.text);
        app.dialog.alert("We got a barcode\n" +
              "Result: " + result.text + "\n" +
              "Format: " + result.format + "\n" +
              "Cancelled: " + result.cancelled);
    },
    function (error) {
        app.dialog.alert("Scanning failed: " + error);
    },
    {
        preferFrontCamera : true, // iOS and Android
        showFlipCameraButton : true, // iOS and Android
        showTorchButton : true, // iOS and Android
        torchOn: true, // Android, launch with the torch switched on (if available)
        saveHistory: true, // Android, save scan history (default false)
        prompt : "Place a barcode inside the scan area", // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
        orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations : true, // iOS
        disableSuccessBeep: false // iOS and Android
    }
  );
});

$$('.barcode-scan2').on('click', function () {
     
  cordova.plugins.barcodeScanner.scan(
    function (result) {
        // app.methods.editItem(result.text);
        app.dialog.alert("We got a barcode\n" +
              "Result: " + result.text + "\n" +
              "Format: " + result.format + "\n" +
              "Cancelled: " + result.cancelled);
    },
    function (error) {
        app.dialog.alert("Scanning failed: " + error);
    },
    {
        preferFrontCamera : true, // iOS and Android
        showFlipCameraButton : true, // iOS and Android
        showTorchButton : true, // iOS and Android
        torchOn: true, // Android, launch with the torch switched on (if available)
        saveHistory: true, // Android, save scan history (default false)
        prompt : "Place a barcode inside the scan area", // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
        orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations : true, // iOS
        disableSuccessBeep: false // iOS and Android
    }
  );
});

var ac_more = app.actions.create({
  grid: true,
  buttons: [
    [
      {
        text: 'Pending',
        icon: '<img src="img/histori.png" width="48"/>',
        onClick: function () {
          app.dialog.alert('Pending clicked')
        }
      },
      {
        text: 'Load Pending',
        icon: '<img src="img/histori.png" width="48"/>',
        onClick: function () {
          app.dialog.alert('Load pending clicked')
        }
      },
      {
        text: 'Sync Data',
        icon: '<img src="img/histori.png" width="48">',
        onClick: function () {
          app.dialog.alert('Sync clicked')
        }
      },
    ],
    [
      {
        text: 'Button 1',
        icon: '<img src="http://lorempixel.com/96/96/fashion/4" width="48"/>'
      },
      {
        text: 'Button 2',
        icon: '<img src="http://lorempixel.com/96/96/fashion/5" width="48">'
      },
      {
        text: 'Button 3',
        icon: '<img src="http://lorempixel.com/96/96/fashion/6" width="48">'
      },
    ]
  ]
});

$$('.ac-more').on('click', function () {
  ac_more.open();
});


var ac_share = app.actions.create({
  buttons: [
    {
      text: '<div class="list"><ul><li><div class="item-content">'+
      '<div class="item-media"><img class="material-icons" src="img/whatsapp.png" /></div>'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">Whatsapp</div>'+
        '</div>'+
        '<div class="item-text"></div>'+
      '</div>'+
    '</div></li></ul></div>',
      onClick: function () {
        var msg = 'Ayo beli pulsa dan paket internet murah praktis hanya lewat aplikasi ini!\n\n' +
        'https://play.google.com/store/apps/details?id=com.app.dagang';
        window.plugins.socialsharing.shareViaWhatsApp(msg, null, null, null, function(e){
          app.dialog.alert("Sharing failed with message: " + e, "Sistem Dagang");
        })
      }
    },
    {
      text: '<div class="list"><ul><li><div class="item-content">'+
      '<div class="item-media"><img class="material-icons" src="img/telegram.png" /></div>'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">Telegram</div>'+
        '</div>'+
        '<div class="item-text"></div>'+
      '</div>'+
    '</div></li></ul></div>',
      onClick: function () {
        var msg = 'Ayo beli pulsa dan paket internet murah praktis hanya lewat aplikasi ini!\n\n' +
        'https://play.google.com/store/apps/details?id=com.app.dagang';
        window.plugins.socialsharing.shareVia('org.telegram.messenger', msg, null, null, null, null, function(e){
          app.dialog.alert('Sharing failed with message: ' + e, 'Sistem Dagang');
        })
      }
    },
    {
      text: '<div class="list"><ul><li><div class="item-content">'+
      '<div class="item-media"><img class="material-icons" src="img/facebook.png" /></div>'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">Facebook</div>'+
        '</div>'+
        '<div class="item-text"></div>'+
      '</div>'+
    '</div></li></ul></div>',
      onClick: function () {
        var msg = 'Ayo beli pulsa dan paket internet murah praktis hanya lewat aplikasi ini!\n\n' +
        'https://play.google.com/store/apps/details?id=com.app.dagang';
        window.plugins.socialsharing.shareViaFacebook(msg, null, null, null, function(e){
          app.dialog.alert("Sharing failed with message: " + e, "Sistem Dagang");
        })
      }
    },
    /*{
      text: '<div class="list"><ul><li><div class="item-content">'+
      '<div class="item-media"><img class="material-icons" src="img/twitter.png" /></div>'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">Twitter</div>'+
        '</div>'+
        '<div class="item-text"></div>'+
      '</div>'+
    '</div></li></ul></div>',
      onClick: function () {
        var msg = 'Ayo beli pulsa dan paket internet murah praktis hanya lewat aplikasi ini!' +
        'https://play.google.com/store/apps/details?id=com.app.dagang';
        window.plugins.socialsharing.shareViaTwitter(msg, null, 'https://twitter.com/', null, function(e){
          app.dialog.alert("Sharing failed with message: " + e, "Sistem Dagang");
        })
      }
    },*/
    {
      text: '<div class="list"><ul><li><div class="item-content">'+
      '<div class="item-media"></div>'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">Cancel</div>'+
        '</div>'+
        '<div class="item-text"></div>'+
      '</div>'+
    '</div></li></ul></div>',
      color: 'red',
    },
  ]
});

$$('.ac-share').on('click', function () {
  ac_share.open();
});

// Login Screen
$$('#my-login-screen .login-button').on('click', function () {
  
  var mbrid = $$('#my-login-screen [name="mbrid"]').val();
  if (mbrid == '') {
      app.dialog.alert('Masukkan ID member anda.', 'Login Member');
      return;
  }
  
  var nohpx = $$('#my-login-screen [name="nohp"]').val();
  if (nohpx == '') {
      app.dialog.alert('Masukkan nomor handphone anda.', 'Login Member');
      return;
  }

  var rgx_nohp = /[08][0-9]{9,}/;
  var nohp = nohpx.trim().match(rgx_nohp);
  if (!nohp) {
      app.dialog.alert('Input data nomor handphone belum benar.', 'Login Member');
      return;
  }

  var pin = $$('#my-login-screen [name="pin"]').val();
  if (pin == '') {
      app.dialog.alert('Masukkan nomor PIN anda.', 'Login Member');
      return;
  }
  
  app.preloader.show();

  var formData = app.form.convertToData('.login-form');

  var regId = localStorage.getItem('RegId');
  formData.gcmid = regId;

  // app.request.setup({
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': 'origin, content-type, accept',
  //     'content-type': 'application/x-www-form-urlencoded',
  //     'server': 'Apache/2.4.7 (Win32) OpenSSL/1.0.1e PHP/5.6.12'
  //   }
  // })
  
  // http://212.24.111.23/
  app.request.post('http://212.24.111.23/dagang/auth/login', formData, function (res) {
    
    app.preloader.hide();
    var data = JSON.parse(res);

    if (data.status) {
    
      localStorage.setItem('mbrid', mbrid);
      localStorage.setItem('nohp', nohp);
      // console.log('localStorage.setItem')

      app.loginScreen.close('#my-login-screen');
      
      app.data.mbrid = mbrid;
      app.data.nohp = nohp;
      app.data.pin = pin;
      app.data.token = data.token;
      
      // kosongkan isian nomor pin
      $$('#my-login-screen [name="pin"]').val('');
      
      app.request.get('http://212.24.111.23/dagang/member/saldo/'+mbrid, function (res) {
          
        var data = JSON.parse(res);
    
        if (data.status) {
          $$('.saldo').text(parseInt(data.saldo).toLocaleString('ID'));
          app.data.saldo = parseInt(data.saldo);
        } else {
          app.dialog.alert(data.message, 'Akun Saya');
        }
      });

      if ( AdMob ) {
     
        // this will create a banner on startup
        AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
      }


    } else {
      app.dialog.alert(data.message, 'Login Member');
    }
  });
});

$$('a.label-register').on('click', function () {
  // Close login screen
  app.loginScreen.close('#my-login-screen');
  app.loginScreen.open('#my-reg-screen');
});


// Registrasi member
$$('#my-reg-screen .register-button').on('click', function () {
  
  var nama = $$('#my-reg-screen [name="nama"]').val();
  if (nama == '') {
      app.dialog.alert('Masukkan nama lengkap anda.', 'Registrasi Member');
      return;
  }
  
  var rgx_nama = /^[a-zA-Z]'?([a-zA-Z]|\,|\.| |-)+$/;
  var namax = nama.trim().match(rgx_nama);
  if (!namax) {
    app.dialog.alert('Input data nama belum benar.', 'Registrasi Member');
    return;
  }

  var nohpx = $$('#my-reg-screen [name="nohp"]').val();
  if (nohpx == '') {
      app.dialog.alert('Masukkan nomor handphone.', 'Registrasi Member');
      return;
  }

  var rgx_nohp = /[08][0-9]{9,}/;
  var nohp = nohpx.trim().match(rgx_nohp);
  if (!nohp) {
    app.dialog.alert('Input data nomor handphone belum benar.', 'Registrasi Member');
    return;
  }

  app.preloader.show();
  
  var regId = localStorage.getItem('RegId');
  var formData = app.form.convertToData('.register-form');

  formData.mbrid = 1;
  formData.gcmid = regId;
  
  app.request.post('http://212.24.111.23/dagang/member', formData, function (res) {
    
    app.preloader.hide();
    
    var data = JSON.parse(res);

    if (data.status) {
      
      // simpan data nomor handphone
      localStorage.setItem('mbrid', data.mbrid);
      localStorage.setItem('nohp', nohp);

      app.data.mbrid = data.mbrid;
      app.data.nohp = data.nohp;

      // set data ke form login
      $$('#my-login-screen [name="mbrid"]').val(data.mbrid);
      $$('#my-login-screen [name="nohp"]').val(nohp);

      app.loginScreen.close('#my-reg-screen');
      app.loginScreen.open('#my-login-screen');
    
      setTimeout(function () {
        app.dialog.alert(data.message, 'Registrasi Member');
      }, 2000);

    } else {
      app.dialog.alert(data.message, 'Registrasi Member');
    }
  });
});

$$('a.label-login').on('click', function () {
  // Close register screen
  app.loginScreen.close('#my-reg-screen');
  app.loginScreen.open('#my-login-screen');
});

$$('#my-login-screen').on('loginscreen:opened', function (e, loginScreen) {
  // set data ke form login
  $$('#my-login-screen [name="mbrid"]').val(localStorage.getItem('mbrid'));
  $$('#my-login-screen [name="nohp"]').val(localStorage.getItem('nohp'));
});

// ganti pin
$$('#ganti-pin .btnGanti').on('click', function () {
  
  var pinlama = $$('#ganti-pin [name="pinlama"]').val();
  var pinbaru = $$('#ganti-pin [name="pinbaru"]').val();
  
  if (pinlama == '') {
      app.dialog.alert('Masukkan nomor pin yang lama.', 'Ganti PIN');
      return;
  } else
  if (pinlama !== app.data.pin) {
    app.dialog.alert('Input nomor pin yang lama belum benar.', 'Ganti PIN');
    return;
  } else
  if (pinbaru == '') {
      app.dialog.alert('Masukkan nomor pin yang baru.', 'Ganti PIN');
      return;
  }
  
  app.preloader.show();

  var formData = app.form.convertToData('.ganti-pin');
  formData.Authorization = app.data.token;
  
  app.request.post('http://212.24.111.23/dagang/member/gantipin', formData, function (res) {
    
    app.preloader.hide();
    var data = JSON.parse(res);

    if (data.status) {
      $$('#ganti-pin [name="pinlama"]').val('');
      $$('#ganti-pin [name="pinbaru"]').val('');
      app.popup.close($$('.page[data-name="ganti-pin"]').parents(".popup"));
    } else {
      app.dialog.alert(data.message, 'Ganti PIN');
    }
  });
});

$$(document).on('backbutton', function (e) {
  e.preventDefault();
  // for example, based on what and where view you have
  if (app.views.main.router.url == '/') {
    navigator.app.exitApp();
  } else {
    mainView.router.back();
  }
});

$$('#my-login-screen').on('loginscreen:open', function (e, loginScreen) {

  if ( AdMob ) {
    // this will create a banner on startup
    AdMob.hideBanner();
  }
});

app.on('pageInit', function (page) {

  $$('input').on('focus', function () {
    
    $$('.kb').css('height', '280px');
    //var limit = $$(window).height() - 280;

    if ($$(this).offset().top > 280) {
      $$('.page-content').scrollTop($$(this).offset().top-168);
    }
  });

  $$('input').on('blur', function () {
    $$('.kb').css('height', '0px');
  });
});
