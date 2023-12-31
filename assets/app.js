import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css'

$(document).ready(function () {
    $('.dropdown-item').on("click", function () {
        let $this = $(this);
        let url = $this.data('url');

        $('.dropdown-toggle').text($this.text());

        $.ajax({
            method: "GET",
            url: url,
            dataType: 'json',
            async: true,
            beforeSend: function () {
                $("#loading").show();
            },
        }).done(function (data) {
            $('#temperature').text(data.temperature.toFixed(2));
            $('#status').text(data.weatherStatus);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            let msg = 'Error:' + jqXHR.status + ' ' + errorThrown;
            $('.alert').show().text(msg);
            $('#temperature').text('');
            $('#status').text('');
        }).always(function (dataOrjqXHR, textStatus, jqXHRorErrorThrown) {
            $("#loading").hide();
        });
    })
});

