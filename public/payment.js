
Date.prototype.format = function (format, utc) {
  return formatDate(this, format, utc);
};

function formatDate(date, format, utc) {
  var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function ii(i, len) { var s = i + ""; len = len || 2; while (s.length < len) s = "0" + s; return s; }

  var y = utc ? date.getUTCFullYear() : date.getFullYear();
  format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
  format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
  format = format.replace(/(^|[^\\])y/g, "$1" + y);

  var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
  format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
  format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
  format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
  format = format.replace(/(^|[^\\])M/g, "$1" + M);

  var d = utc ? date.getUTCDate() : date.getDate();
  format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
  format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
  format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
  format = format.replace(/(^|[^\\])d/g, "$1" + d);

  var H = utc ? date.getUTCHours() : date.getHours();
  format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
  format = format.replace(/(^|[^\\])H/g, "$1" + H);

  var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
  format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
  format = format.replace(/(^|[^\\])h/g, "$1" + h);

  var m = utc ? date.getUTCMinutes() : date.getMinutes();
  format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
  format = format.replace(/(^|[^\\])m/g, "$1" + m);

  var s = utc ? date.getUTCSeconds() : date.getSeconds();
  format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
  format = format.replace(/(^|[^\\])s/g, "$1" + s);

  var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
  format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])f/g, "$1" + f);

  var T = H < 12 ? "AM" : "PM";
  format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
  format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

  var t = T.toLowerCase();
  format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
  format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

  var tz = -date.getTimezoneOffset();
  var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
  if (!utc) {
    tz = Math.abs(tz);
    var tzHrs = Math.floor(tz / 60);
    var tzMin = tz % 60;
    K += ii(tzHrs) + ":" + ii(tzMin);
  }
  format = format.replace(/(^|[^\\])K/g, "$1" + K);

  var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
  format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
  format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

  format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
  format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

  format = format.replace(/\\(.)/g, "$1");

  return format;
};


window.payware = function (options) {
  //url
  //onPaymentResultReceived
  var vars = {
  };

  var root = this;

  var inTransaction = false;

  this.construct = function (options) {
    $.extend(vars, options);

    setInterval(function () { fetchMessages(); }, 1000);
  };

  var logLine = function (log) {
    var line = formatDate(new Date(), "HH:mm:ss.fff") + " : " + log;
    var e = $("#divKimonoLog");
    if (e) {
      e.text(line + '\n' + e.text());
    }
  }

  var logStart = function (func) {
    logLine(func + " -> start");
  }

  var logFunction = function (func, success, textStatus, errorThrown, data) {
    if (success) {
      logLine(func + " -> success: [" + data + "]");
    }
    else {
      logLine(func + " -> failed (" + textStatus + " / " + errorThrown + ")");
    }
  }

  var downloadUrl = function (sub, isObject) {
    var promise = $.ajax(vars.url + sub)
      .done(function (data) {
        result = data;
        if (isObject) {
          // console.log(data); //JSON.stringify(
        }
        else {
          var msg = "Kimono: [" + data + "]";
          console.log(msg);
        }
        return data;
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Kimono: " + sub + " => " + textStatus);
        console.log("Kimono: " + sub + " => " + errorThrown);
        return null;
      });

    return promise;
  };

  var getDisplayElement = function (name, main) {
    var n = "#div" + name + "Display" + (main ? "Main" : "Sub") + "Text";
    return $(n);
  };

  var showMessages = function (name, data) {
    var main = getDisplayElement(name, true);
    var sub = getDisplayElement(name, false);
    if (!data) {
      main.text('');
      main.hide();
      sub.text('');
      sub.hide();
      return;
    }
    main.show();
    sub.show();
    if (data.textId !== "") {
      main.text(data.mainText);
      sub.text(data.subText);
    }
    else {
      main.text('');
      sub.text('');
    }
  };

  var fetchMessages = function () {
    if (inTransaction) {
      var mainCustomer = getDisplayElement("Customer", true);
      var subCustomer = getDisplayElement("Customer", false);
      var mainCashier = getDisplayElement("Cashier", true);
      var subCashier = getDisplayElement("Cashier", false);
      if (mainCustomer.length || subCustomer.length ||
        mainCashier.length || subCashier.length) {
        window.pay.getDisplayMessages()
          .then(function (data) {
            showMessages("Customer", data.customerDisplayMessage);
            showMessages("Cashier", data.cashierDisplayMessage);
          });
      }
    }
  };

  var hideMessages = function () {
    showMessages("Customer", false);
    showMessages("Cashier", false);
  }

  var showPaymentResult = function (name, data) {
    hideMessages();
    if (name && vars.onPaymentResultReceived) {
      vars.onPaymentResultReceived(name, data);
    }
    if (data) {
      var journal = '';
      $.each(data, function (key, value) {
        if (key !== "customerReceiptData" &&
          key !== "merchantReceiptData" &&
          key !== "eJournal") {
          journal += key + ": " + value + "\n";
        }
      });
      $.each(data.eJournal, function (key, value) {
        journal += key + ": " + value + "\n";
      });
      $("#divKimonoJournal").text(journal);
      $("#divKimonoJournal").show();

      var receipt = '';
      if (data.customerReceiptData) {
        data.customerReceiptData.forEach(function (item, index) {
          receipt += item + '\n';
        });
      }
      $("#divKimonoPaymentReceipt").text(receipt);
      $("#divKimonoPaymentReceipt").show();
    }
    else {
      $("#divKimonoJournal").text('');
      $("#divKimonoJournal").hide();
      $("#divKimonoPaymentReceipt").text('');
      $("#divKimonoPaymentReceipt").hide();
    }
  }

  var createPaymentResult = function (textStatus) {
    return {
      success: 0,
      successText: "ErrorRetry",
      errorText: textStatus
    };
  }

  var startPaymentInternal = function (url) {
    showPaymentResult('');
    inTransaction = true;
    return downloadUrl("payware/startpayment/" + url, true)
      .done(function (data) {
        inTransaction = false;
        logFunction("startPayment " + url, true, "", "", data);
        showPaymentResult("startPayment", data);
        return data;
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log("payment internal fail");
        console.log(jqXHR.statusCode());
        inTransaction = false;
        logFunction("startPayment " + url, false, textStatus, errorThrown);
        var data = createPaymentResult(textStatus);
        showPaymentResult("startPayment", data);
        return null;
      });
  };

  this.startPayment = function (amount, transactionId, reference) {
    if (inTransaction) {
      return;
    }
    amount = encodeURIComponent(amount);
    transactionId = encodeURIComponent(transactionId);
    reference = encodeURIComponent(reference);
    var url = amount;
    if (transactionId) {
      if (reference) {
        url = amount + "/" + transactionId + "/" + reference;
      }
      else {
        url = amount + "/" + transactionId;
      }
    }
    logStart("startPayment " + url);
    return startPaymentInternal(url);
  };

  this.getDisplayMessages = function () {
    return downloadUrl("payware/getdisplaymessages", true); //object
  };

  this.setRelay = function (data) {
    data = encodeURIComponent(data);
    //https://kimono.trin-it.nl/api/kimono/relay/set/0/0
    return downloadUrl("relay/set/" + data); //object
  };

  this.construct(options);
};


