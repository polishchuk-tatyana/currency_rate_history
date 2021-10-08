// limiting numeric input and dot
jQuery('.numbersOnly').keyup(function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');
});

//creating function to run page for JS code
$(document).ready(function () {
    var validRateUAH = false;
    var validDate = false;
    var myDate = new Date();
    var day = myDate.getDate();
    var month = myDate.getMonth() + 1;
    var hour = myDate.getHours();
    var minutes = myDate.getMinutes()
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minutes.toString().length == 1) {
        minutes = '0' + minutes;
    }
    var time = myDate.getFullYear().toString() + '-' + month + '-' + day + 'T' + hour + ':' + minutes;

    $("form").submit(function (event) {
        event.preventDefault();

        var rateUAH = $("#id_rateUAH").val();
        var date = $("#id_date").val();

        var new_date = date.split('T')[0];
        var list = [];
        var data = $("#json_id").val();
        var dataList = JSON.parse(data);
        for (let dataObject of dataList) {
            list.push(dataObject.date.split(' ')[0])
        }

        // creating currency rate validation with adding styles on tag in .html
        if (rateUAH == "") {
            $("#id_rateUAH").parent().removeClass("has-success").addClass("has-error");
            $(".help-block").remove();
            $(".nameBlock").append("<span class='glyphicon glyphicon-remove form-control-feedback' aria-hidden = 'true'></span>");
            $(".nameBlock .glyphicon-ok").remove();
            $(".helpRate").append("<span  class='help-block'>Please, enter the data</span>");
            validRateUAH = false;
        } else if (rateUAH.length > 9) {
            $("#id_rateUAH").parent().removeClass("has-success").addClass("has-error");
            $(".help-block").remove();
            $(".nameBlock").append("<span class='glyphicon glyphicon-remove form-control-feedback' aria-hidden = 'true'></span>");
            $(".nameBlock .glyphicon-ok").remove();
            $(".helpRate").append("<span  class='help-block'>Please, enter 7 sign after dot</span>");
            validRateUAH = false;
        } else if (rateUAH.length < 9) {
            $("#id_rateUAH").parent().removeClass("has-success").addClass("has-error");
            $(".help-block").remove();
            $(".nameBlock").append("<span class='glyphicon glyphicon-remove form-control-feedback' aria-hidden = 'true'></span>");
            $(".nameBlock .glyphicon-ok").remove();
            $(".helpRate").append("<span  class='help-block'>Please, enter 7 sign after dot</span>");
            validRateUAH = false;
        } else {
            $("#id_rateUAH").parent().removeClass("has-error").addClass("has-success");
            $(".nameBlock").append("<span class='glyphicon glyphicon-ok form-control-feedback' aria-hidden = 'true'></span>");
            $(".nameBlock .glyphicon-remove").remove();
            validRateUAH = true;
        }

        // creating date validation
        if (date == "") {
            $("#id_date").parent().removeClass("has-success").addClass("has-error");
            $(".dateBlock").append("<span class='glyphicon glyphicon-remove form-control-feedback' aria-hidden = 'true'></span>");
            $(".dateBlock glyphicon-ok").remove();
            $(".helpDate").append("<span  class='help-block'>Please, enter the date</span>");
            validDate = false;
        } else if (date > time) {
            $("#id_date").parent().removeClass("has-success").addClass("has-error");
            (".help-block").remove();
            $(".dateBlock").append("<span class='glyphicon glyphicon-remove form-control-feedback' aria-hidden = 'true'></span>");
            $(".dateBlock glyphicon-ok").remove();
            $(".helpDate").append("<span  class='help-block'>You can't enter date later than now</span>");
            validDate = false;
        } else if (list.indexOf(new_date) != -1) {
            $("#id_date").parent().removeClass("has-success").addClass("has-error");
            $(".help-block").remove();
            $(".dateBlock").append("<span class='glyphicon glyphicon-remove form-control-feedback' aria-hidden = 'true'></span>");
            $(".dateBlock glyphicon-ok").remove();
            $(".helpDate").append("<span  class='help-block'>There is currency rate on this day already</span>");
            validDate = false;
        } else {
            $("#id_date").parent().removeClass("has-error").addClass("has-success");
            $(".dateBlock").append("<span class='glyphicon glyphicon-ok form-control-feedback' aria-hidden = 'true'></span>");
            $(".dateBlock .glyphicon-remove").remove();
            validDate = true;
        }
        if (validRateUAH == true && validDate == true) {
            $("form").unbind('submit').submit();
        }
    });
});