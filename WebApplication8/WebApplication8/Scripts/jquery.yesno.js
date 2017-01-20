/**
 * jquery.yesno plugin
 * https://github.com/mibu/jquery.yesno
 *
 * Copyright 2013 Mirko Budimir <mirko@program5.hr>
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function ($) {

    // Attach yesno to html element 
    $.fn.yesno = function (options) {

        var self = $(this);
        self.click(function (e) {
            e.preventDefault();
            var elem = $(e.currentTarget);
            $.yesno(elem, options);
        });

        return this;
    };

    // Show a yesno modal dialog
    // Dialog will be shown with default values if they are not overloaded through data- 
    $.yesno = function (elem, options) {

        // Overwrite default options 
        // with user provided ones 
        // and merge them into "options". 
        var settings = $.extend({}, $.fn.yesno.defaults, options);

        //Does actual work when confirmation button was clicked
        settings.confirm = function () {

            //Try to get all the attributes related to action that will be confirmed
            var url = elem.attr("href");
            var method = elem.data("yn-method");
            var action = elem.data("yn-action");
            var success = elem.data("yn-success");
            var error = elem.data("yn-error");
            var form = elem.data("yn-formid");

            //If action or href attributes exist, it's asumed that we want to do an ajax call
            //Action attribute super seeds href attribute
            if (action || url)
            {
                //Set ajax options
                var ajaxOptions = {};
                ajaxOptions.url = action ? action : url;
                ajaxOptions.type = method ? method : "GET";

                //If formId exists we will add form data to ajax call and send it as JSON
                if (form)
                {
                    var $form = $("#" + form);
                    var formData = {};
                    $form.serializeArray().map(function (val) { return formData[val.name] = val.value; });
                    ajaxOptions.data = formData;
                    ajaxOptions.dataType = "JSON";
                }

                //if success attribute exists, set success function delegate
                if(success)
                {
                    ajaxOptions.success = function (data) {
                        var successFunction = window[success];
                        if (successFunction)
                            successFunction.call(data);
                    };    
                }
                
                //if error attribute exists, set error function delegate
                if(error)
                {
                    ajaxOptions.error = function (data) {
                        var errorFunction = window[error];
                        if (errorFunction)
                            errorFunction.call(data);
                    };
                }
                
                //Do  ajax call
                $.ajax(ajaxOptions);
            }
            else if (elem.data("yn-post") === true) {
                var form = $("#" + elem.data("yn-formid"));
                form.submit();
            } else if (elem.attr("type") === "submit") {
                var form = $(elem).closest("form");
                form.submit();
            } 
            else {
                window.location = url;
            }
        };

        settings.cancel = function (e) {

        };

        //defining options via data- attributes
        if (elem.data("yn-text")) {
            settings.text = elem.data("yn-text");
        }
        if (elem.data("yn-yes")) {
            settings.yes = elem.data("yn-yes");
        }
        if (elem.data("yn-no")) {
            settings.no = elem.data("yn-no");
        }
        if (elem.data("yn-title")) {
            settings.title = elem.data("yn-title");
        }

		//alert("hola");
		
        // markup of yesno modal
        var noButtonHtml =
            '<button class="cancel btnJC" type="button" data-dismiss="modal" style="min-width:' + $.fn.yesno.parameters.buttonminwidth + '" >'
            + settings.no + '</button>';
        var yesButtonHtml =
            '<button class="confirm btnJC btnJC-primaryJC" type="button" data-dismiss="modal" style="min-width:' + $.fn.yesno.parameters.buttonminwidth + '" >'
            + settings.yes + '</button>';
        var markup = '<div id="yesnoDialog" class="modal hide fade" data-backdrop="static" tabindex="-1" role="dialog" style="margin:-250px 0 0 -280px; background-color:#fff;">'
            + '<div class="modal-header"><h2>' + settings.title + '</h2></div>'
            + '<div class="modal-body">' + settings.text + '</div>'
            + '<div class="modal-footer">' + noButtonHtml + yesButtonHtml + '</div>'
            + '</div>';
			
        var modal = $(markup);

        //attaching events to yesno modal
        modal.on("hidden", function () {
            modal.remove();
        });
        //attaching events to submit and cancel buttons
        modal.find(".confirm").click(function (e) {
		
		//alert("confirmando");
		
            settings.confirm();
			
			$.ajax({
				//Tipo de llamada
				type: "POST",
 
				//Dirección del WebMethod, o sea, Página.aspx/Método.  url: "Default.aspx/Sumar",
				url: nombreMiPaginaJC,
 
				//Parámetros para pasarle al método.  data: '{Valor1: 22, Valor2: 33}', 
				data: '{' + parametrosMiPaginaJC + '}',
    
				//Tipo de contenido
				contentType: "application/json; charset=utf-8",
 
				//Tipo de datos
				dataType: "json",
 
				//Función a la cual llamar cuando se pudo llamar satisfactoriamente al método 
				//success: function(result) {  $("#content").html(result.d);   }
				success: resultado,
				
				//Función a la cual llamar cuando se producen errores
				error: errores
			});
			
			
        });
		

		
		function resultado(msg) {
	            //msg.d tiene el resultado devuelto por el método
	            //$('#num3').val(msg.d);
				
				//var i = $(this).attr("id");
				//var i = $(this).attr("title");
				//var i = $("#idProgramacionHidden").attr("value") 
				
				var i = $('#idValorHidden').val();
				//alert('Has clickado sobre el elemento número: '+i); 
				
				alert(msg.d); 
				
				if (msg.d != "Ocurrio un error en la operacion ...!") {
					//$("#capa").removeClass("btnJC-primaryJC");
					//$("#capa").removeClass("btnJC");
					$(nombreDivOcultar + i).hide();
					$(nombreDivMostrar + i).show();					       
				}
				
	    }
	    function errores(msg) {
	           //msg.responseText tiene el mensaje de error enviado por el servidor
	           //alert('Error: ' + msg.responseText); esta instruccion indica todo lo referente al error, pero voy a enviar un mensaje personalizado 
			   alert('Ocurrio un Error al realizar la operacion...!')
	    }

        modal.find(".cancel").click(function (e) {
            settings.cancel();
        });

        // add yesno motal to page
        $("body").append(modal);
        //show yesno modal
        modal.modal();
    };

    // Default settings, can be overriden outside
    $.fn.yesno.defaults = {
        text: "¿Esta seguro(a) que desea continuar?", //text in body
        yes: "Si", //text in confirm button
        no: "No", //text in cancel button
        title: "Reporte de la Operacion", //title of modal
        post: false, //if element action is post and element is not type="submit"
        formid: ""
    };

    $.fn.yesno.parameters = {
        autoinit: true, // if false, you need to init script manually
        buttonminwidth: "100px" // min width of buttons
    };

    $.fn.yesno.init = function () {
        //find all elements in current document
        var elements = $("*").filter(function () {
            return $(this).data("yn-confirm") !== undefined;
        });
        //wire up
        elements.yesno();
    };

    if ($.fn.yesno.parameters.autoinit) {
        $(function () {
            //automatically wire up yesno
            $.fn.yesno.init();
        });
    }
})(jQuery);