routes = [
  {
    path: '/',
    url: './index.html',
    on: {
      pageInit: function (event, page) {
              
      },
      pageBeforeIn: function (event, page) {
        
        var virtualList = app.virtualList.create({
          // List Element
          el: '.virtual-list',
          // Pass array with items
          items: items,
          // Custom search function for searchbar
          searchAll: function (query, items) {
            var found = [];
            for (var i = 0; i < items.length; i++) {
              if (items[i].nama.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
            }
            return found; //return array with mathced indexes
          },
          // List item Template7 template
          itemTemplate:
            '<li><input type="hidden" value="{{kdbar}}">' +
              '<a href="#" class="item-link item-content item-basket">' +
                '<div class="item-media"><img class="material-icons" src="img/stock.png" /></div>' +
                '<div class="item-inner">' +
                  '<div class="item-title-row">' +
                    '<div class="item-title">{{nama}}</div>' +
                  '</div>' +
                  //'<div class="item-subtitle">{{subtitle}}</div>' +
                '</div>' +
                '<div class="item-after">Rp{{hjual}}<br>{{saldo}} {{satuan}}</div>' +
              '</a>' +
            '</li>',
          // Item height
          //height: app.theme === 'ios' ? 63 : 73,
        });

        $$('.item-basket').on('click', function () {
          var li = $$(this).parents("li");
          var kode = li.find('input').val();
          // console.log(kode)
          app.methods.addItem(kode)
          // app.dialog.alert('Tes')
        });
        
        // call ajax request to update
        // setTimeout(function () {

          // // http://212.24.111.23/
          // app.request.get('http://212.24.111.23/dagang/member/saldo/'+ app.data.mbrid, function (res) {
          
            // var data = JSON.parse(res);
        
            // if (data.status) {
              // $$('.saldo').text(parseInt(data.saldo).toLocaleString('ID'));
              // app.data.saldo = parseInt(data.saldo);
              // app.data.bonus = parseInt(data.bonus);
            // } else {
              // app.dialog.alert(data.message, 'Redagro');
            // }
          // });
        // }, 11000);
      }
    }
        
  },
  {
    path: '/cart/',
    componentUrl: './pages/cart.html',
  },
  {
    path: '/profile/',
    url: './pages/profile.html',
    on: {
      pageInit: function (event, page) {
        
        var db = app.data.db;
        $$('#nama').val('CV. ELANG PERKASA');

        if (db) {
          //app.dialog.alert('db not initialized!');
          db.transaction(function(tx) {
            tx.executeSql('select nama, alamat, kota, kodepos, telepon, fax, email, npwp from setup;',
            [], function(ignored, res) {
              $$('#nama').val(res.rows.item(0).nama);  
              $$('#alamat').val(res.rows.item(0).alamat);  
              $$('#kota').val(res.rows.item(0).kota);  
              $$('#kodepos').val(res.rows.item(0).kodepos);  
              $$('#telepon').val(res.rows.item(0).telepon);  
              $$('#fax').val(res.rows.item(0).fax);  
              $$('#email').val(res.rows.item(0).email);  
              $$('#npwp').val(res.rows.item(0).npwp);              
            });
          }, function(error) {
            app.dialog.alert('insert error: ' + error.message);
          });      
        }
        
        $$('.btnSimpan').on('click', function () {
          
          var nama = $$('#nama').val();
          
          // validasi input
          if (nama === "") {
            app.dialog.alert("Masukkan nama perusahaan.","Profil Perusahaan");
            $$('.page-content').scrollTop($$('#nama').offset().top);
            //$$('#nama').focus();
            return;
          }

          var alamat = $$('alamat').val();
          var kota = $$('#kota').val();
          var kodepos = $$('#kodepos').val();
          var telepon = $$('#telepon').val();
          var fax = $$('#fax').val();
          var email = $$('#email').val();
          var npwp = $$('#npwp').val();

          var db = app.data.db;
          
          // app.dialog.alert(nama, 'Profil Perusahaan');

          if (db) {
            db.transaction(function(tx) {
              tx.executeSql('update setup set nama = ?, alamat = ?, kota = ?, kodepos = ?, ' +
              'telepon = ?, fax = ?, email = ?, npwp = ?;',
              [nama, alamat, kota, kodepos, telepon, fax, email, npwp]);
            }, function(error) {
              app.dialog.alert('insert error: ' + error.message);
            });      
          }
          
        });
      }
    }
  },
  {
    path: '/stock-list/',
    componentUrl: './pages/stock-list.html',
  },
  {
    path: '/group/',
    url: './pages/group.html',
    on: {
      pageInit: function (event, page) {
      
        $$('.btnSimpan').on('click', function(e){
          //e.preventDefault();
          
          var nama = $$('#nama').val();
          if (nama === '') {
              app.dialog.alert('Masukkan data nama grup.', 'Grup');
              return;
          }
          // app.preloader.show();
          $$(this).prop("disabled", true);
        
          var db = app.data.db;
      
          if (db) {
            
            db.transaction(function(tx) {
              tx.executeSql('SELECT nama FROM grup WHERE nama = ?', [nama], function(ignored, res) {
                //app.dialog.alert('RECORD COUNT: ' + res.rows.item(0).recordCount);

                if (res.rows.length > 0) {
                  app.dialog.alert('Nama grup item sudah ada.', 'Grup');
                  return;
                }
          
                db.transaction(function(tx) {
                  tx.executeSql('insert into grup (nama) values (?);', [nama]);
                  app.router.back();
                }, function(error) {
                  app.dialog.alert('insert error: ' + error.message);
                });

              });
            }, function(error) {
              app.dialog.alert('SELECT data error: ' + error.message);
            });      
          
          }
          
          /*var formData = app.form.convertToData('.grup');
          formData.Authorization = app.data.token;
          
          app.request.post('http://212.24.111.23/dagang/group', formData, function (res) {
            
            var data = JSON.parse(res);
        
            if (data.status) {
              // setTimeout(function () {
                app.router.back();
              // }, 500);
            } else {

              $$(this).prop("disabled", false);
              if (data.message !== '') {
                app.dialog.alert(data.message, 'Group');
              }
            }
          });*/
        });            
      
        if ( AdMob ) {
          AdMob.hideBanner();
        }      
      },
      pageAfterOut: function (event, page) {
      
        if ( AdMob ) {
          AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        }
      }
    }
  },
  {
    path: '/stock/',
    url: './pages/stock.html',
    on: {
      pageInit: function (event, page) {

        $$('.barcode').on('click', function(e){
     
          cordova.plugins.barcodeScanner.scan(
            function (result) {
                $$('#barcode').val(result.text);
                // alert("We got a barcode\n" +
                      // "Result: " + result.text + "\n" +
                      // "Format: " + result.format + "\n" +
                      // "Cancelled: " + result.cancelled);
            },
            function (error) {
                app.dialog.alert("Scanning failed: " + error);
            },
            {
                preferFrontCamera : false, // iOS and Android
                showFlipCameraButton : false, // iOS and Android
                showTorchButton : true, // iOS and Android
                torchOn: true, // Android, launch with the torch switched on (if available)
                saveHistory: false, // Android, save scan history (default false)
                prompt : "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats : "EAN_13,CODE_128,QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations : true, // iOS
                disableSuccessBeep: false // iOS and Android
            }
          );
        });
      
        $$('#mstock').on('change', function(e){
          //e.preventDefault();
          if ($$(this).prop('checked')){
            $$('#awal').prop('disabled', false);
          } else {
            $$('#awal').prop('disabled', true);
            $$('#awal').val('0');
          }
        });
      
        $$('.btnSimpan').on('click', function(e){
          //e.preventDefault();
          
          var nama = $$('#nama').val();
          if (nama === '') {
            app.dialog.alert('Masukkan data nama barang.', 'Item Barang');
            return;
          }
          
          var barcode = $$('#barcode').val();
          if (barcode === '') {
            app.dialog.alert('Masukkan data kode barang.', 'Item Barang');
            return;
          }
          
          var satuan = $$('#satuan').val();
          if (satuan === '') {
            app.dialog.alert('Masukkan data satuan.', 'Item Barang');
            return;
          }
          
          var mstock = 'Y';
          if ($$('#jasa').prop('checked')){
            mstock = 'M';
          }
          
          var awal = $$('#awal').val();
          if (awal === '') {
            app.dialog.alert('Masukkan data saldo awal barang.', 'Item Barang');
            return;
          }
          
          var hpokok = $$('#hpokok').val();
          if (hpokok === '') {
            app.dialog.alert('Masukkan data harga pokok.', 'Item Barang');
            return;
          }
          
          var hjual = $$('#hjual').val();
          if (hjual === '') {
            app.dialog.alert('Masukkan data harga jual.', 'Item Barang');
            return;
          }
          
          // app.preloader.show();
          $$(this).prop("disabled", true);
          
          var db = app.data.db;
          
          if (db) {

            db.transaction(function(tx) {
              tx.executeSql('insert into stock (kdbar, nama, satuan, hbeli, hpokok, hpokok2, hjual, stawal, saldo, mstock) ' +
              'values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [barcode, nama, satuan, hpokok, hpokok, hpokok, hjual, awal, awal, mstock]);
            }, function(error) {
              app.dialog.alert('insert error: ' + error.message);
            });
          }

          /*var formData = app.form.convertToData('.stock');
          formData.Authorization = app.data.token;
          
          app.request.post('http://212.24.111.23/dagang/pulsa', formData, function (res) {
            
            // app.preloader.hide();
            
            var data = JSON.parse(res);
        
            if (data.status) {
              // setTimeout(function () {
                app.router.back();
              // }, 500);
            } else {

              $$(this).prop("disabled", false);
              if (data.message !== '') {
                app.dialog.alert(data.message, 'Pulsa HP');
              }
            }
          });*/
        });            
      
        if ( AdMob ) {
          AdMob.hideBanner();
        }
      },
      pageAfterOut: function (event, page) {
      
        if ( AdMob ) {
          AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        }
      }
    }
  },
  {
    path: '/stock/:kode',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // kode operator
      var kode = routeTo.params.kode;

      var db = app.data.db;
      
      if (db) {
        db.transaction(function(tx) {
          tx.executeSql('select kdbar, nama, satuan, hbeli, hpokok2, hjual, stawal, saldo, mstock from stock where kode = ?;', [kode], function(ignored, res) {

            var data = { kdbar: res.rows.item(0).kdbar,
                        nama: res.rows.item(0).nama,
                        satuan: res.rows.item(0).satuan,
                        hbeli: res.rows.item(0).hbeli,
                        hpokok: res.rows.item(0).hpokok,
                        hpokok2: res.rows.item(0).hpokok2,
                        hjual: res.rows.item(0).hjual,
                        stawal: res.rows.item(0).stawal,
                        saldo: res.rows.item(0).saldo,
                        mstock: res.rows.item(0).mstock
                        };
          });
        }, function(error) {
          app.dialog.alert('select error: ' + error.message);
        });
      }
        
      var data = { title: 'Harga Pulsa ' + nama, list: json };

      resolve(
        { componentUrl: './pages/stock2.html' },
        { context: { data: data } }
      );
      app.preloader.hide();
    }
  },
  {
    path: '/supplier-list/',
    componentUrl: './pages/supplier-list.html',
    /*on: {
      pageInit: function (event, page) {
        
        var db = app.data.db;

        if (db) {
          //app.dialog.alert('db not initialized!');
          db.transaction(function(tx) {
            tx.executeSql('select nama, kdsup from supplier order by nama;',
            [], function(ignored, res) {
              $$('#nama').val(res.rows.item(0).nama);  
              $$('#alamat').val(res.rows.item(0).alamat);  
              $$('#kota').val(res.rows.item(0).kota);  
              $$('#kodepos').val(res.rows.item(0).kodepos);  
              $$('#telepon').val(res.rows.item(0).telepon);  
              $$('#fax').val(res.rows.item(0).fax);  
              $$('#email').val(res.rows.item(0).email);  
              $$('#npwp').val(res.rows.item(0).npwp);              
            });
          }, function(error) {
            app.dialog.alert('select error: ' + error.message);
          });      
        }
       
      }
    }*/
  },
  {
    path: '/supplier/',
    url: './pages/supplier.html',
    on: {
      pageInit: function (event, page) {
        
        $$('.contact').on('click', function(e){
     
          navigator.contacts.pickContact(function(contact){
              //console.log('The following contact has been selected:' + JSON.stringify(contact));
              var nomor = contact.phoneNumbers[0].value;
              $$('#nama').val(contact.name.givenName);
              $$('#telepon').val(nomor.replace('+62','0').replace(/-/g,'').replace(/ /g,''));
              $$('#email').val(contact.emails[0].value);
          },function(err){
              //console.log('Error: ' + err);
              // alert('Error: ' + err);
              $$('#tujuan').val('');
          });
        });
      
        $$('.btnSimpan').on('click', function(e){
          //e.preventDefault();
          
          var nama = $$('#nama').val();
          if (nama === '') {
            app.dialog.alert('Masukkan data nama supplier.', 'Supplier');
            return;
          }

          var awal = $$('#awal').val();
          if (awal === '') {
            awal = 0;
          }

          var alamat = $$('#alamat').val();
          var telepon = $$('#telepon').val();
          var email = $$('#email').val();
          var notes = $$('#notes').val();
          
          // app.preloader.show();
          $$(this).prop("disabled", true);
          
          var db = app.data.db;
          var edit = app.data.bEdit;
          var kdsup = app.data.kdsup;
          
          if (db) {

            db.transaction(function(tx) {
              if (!bEdit) {
                tx.executeSql('insert into supplier (nama, alamat, telepon, email, awal, saldo, notes) ' +
                'values (?, ?, ?, ?, ?, ?, ?);', [nama, alamat, telepon, email, awal, awal, notes]);
              } else {
                tx.executeSql('update supplier set nama = ?, alamat = ?, telepon = ?, email = ?, notes = ? ' +
                'where kdsup = ?;', [nama, alamat, telepon, email, notes, kdsup]);
              }
            }, function(error) {
              app.dialog.alert('insert error: ' + error.message);
            });
          }
          
          /*var formData = app.form.convertToData('.trxdata');
          formData.Authorization = app.data.token;
          
          app.request.post('http://212.24.111.23/dagang/data', formData, function (res) {
            
            // app.preloader.hide();
            
            var data = JSON.parse(res);
        
            if (data.status) {
              // setTimeout(function () {
                app.router.back();
              // }, 500);
            } else {

              $$(this).prop("disabled", false);
              if (data.message !== '') {
                app.dialog.alert(data.message, 'Paket Data');
              }
            }
          });*/
        });            
      
        if ( AdMob ) {
          AdMob.hideBanner();
        }
      },
      pageAfterOut: function (event, page) {
      
        if ( AdMob ) {
          AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        }
      }
    }
  },
  {
    path: '/supplier/:kode',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // kode operator
      var kode = routeTo.params.kode;
          
      var data = { title: 'Harga Pulsa ' + nama, list: json };

      resolve(
        { componentUrl: './pages/supplier2.html' },
        { context: { data: data } }
      );
      app.preloader.hide();
    }
  },
  {
    path: '/trx-list/',
    url: './pages/trx-list.html',
    on: {
      pageInit: function (event, page) {
      
      }
    }
  },
  {
    path: '/report-list/',
    url: './pages/report-list.html',
    on: {
      pageInit: function (event, page) {
      
      }
    }
  },
  {
    path: '/histori/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();
        
      if (!app.data.currentDate) {
      
        var now = new Date();
        
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        
        var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
        app.data.currentDate = today;
      }
        
      // console.log('app.data.currentDate: ',app.data.currentDate);
      
      var formData = [];

      formData.tgltrx = app.data.currentDate;
      formData.Authorization = app.data.token;
      
      app.request.post("http://212.24.111.23/dagang/member/histori", formData, function(res) {
          
        var data = JSON.parse(res);

        resolve(
          { componentUrl: './pages/histori.html' },
          { context: { data: data } }
        );
        app.preloader.hide();
      });
    },
    
    on: {
      pageInit: function (event, page) {
        
        // console.log('#tgltrx_val: ', $$('#tgltrx').val());
        $$('#tgltrx').val(app.data.currentDate);
        
        // var tglval = $$('#tgltrx').val();
        
        // if (tglval == '') {
          // $$('#tgltrx').val(app.data.currentDate);
          // var now = new Date();
          
          // var day = ("0" + now.getDate()).slice(-2);
          // var month = ("0" + (now.getMonth() + 1)).slice(-2);
          
          // var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
          
          // $$('#tgltrx').val(today);
        // }
      
        $$('#tgltrx').on('change', function(e){

          app.data.currentDate = $$('#tgltrx').val();
          app.router.navigate('/histori/', {
            reloadCurrent: true,
            ignoreCache: true,
          });
        });
      
        // if ( AdMob ) {
          // AdMob.hideBanner();
        // }
      },
      pageAfterOut: function (event, page) {
      
        app.data.currentDate = null;

        // if ( AdMob ) {
          // AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        // }
      }
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
