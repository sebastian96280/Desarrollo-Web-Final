

// do something on document ready
$(document).ready(function () {
    function MIAjax(request, parametros, ejecucion) {
        $.ajax({
            // la URL para la peticiÃ³n
            url: request,
            // la informaciÃ³n a enviar
            // (tambiÃ©n es posible utilizar una cadena de datos)
            data: parametros,
            // especifica si serÃ¡ una peticiÃ³n POST o GET
            type: 'POST',
            // el tipo de informaciÃ³n que se espera de respuesta
            dataType: 'html',
            // cÃ³digo a ejecutar si la peticiÃ³n es satisfactoria;
            // la respuesta es pasada como argumento a la funciÃ³n
            success: function (datos) {
                ejecucion(datos);
            },
            // cÃ³digo a ejecutar si la peticiÃ³n falla;
            // son pasados como argumentos a la funciÃ³n
            // el objeto de la peticiÃ³n en crudo y cÃ³digo de estatus de la peticiÃ³n
            error: function (xhr, status) {
                alert('Disculpe, existiÃ³ un problema');
            },
            // cÃ³digo a ejecutar sin importar si la peticiÃ³n fallÃ³ o no
            complete: function (xhr, status) {
                //  alert('PeticiÃ³n realizada');
            }
        });
    }

    function alerta(pVMsn) {
        $("#LosMensajes").html(pVMsn + "<br><br><button id='cerrarDialog' class='btn btn-info'>Cerrar Ventana</button>");

        $("#cerrarDialog").unbind("click").click(function () {
            $(".ui-dialog-titlebar-close").trigger("click");
        });

        $("#dialog").dialog();
    }

    function validarFor(formulario, reglas, mensajes, metodo, toptip) {
        $("#" + formulario).validate({
            rules: reglas,
            messages: mensajes,
            //    errorLabelContainer: "#summary",
            //   wrapper: "li",
            tooltip_options: toptip,
            submitHandler: function () {
                metodo();
            }
        });
    }



    function traerindex() {
        var request = "cIndex.php";
        var parametros = "A=1";
        var ejecucion = function (datos) {
            document.getElementById("contenido").innerHTML = datos;
        };
        MIAjax(request, parametros, ejecucion);
    }

    $("#aIndex").click(function () {
        traerindex();
    });

    $("#aMision").click(function () {
        var request = "Mision.php";
        var parametros = "A=1";
        var ejecucion = function (datos) {
            document.getElementById("contenido").innerHTML = datos;
        };
        MIAjax(request, parametros, ejecucion);
    });

    $("#aVision").click(function () {
        var request = "Vision.php";
        var parametros = "A=1";
        var ejecucion = function (datos) {
            document.getElementById("contenido").innerHTML = datos;
        };
        MIAjax(request, parametros, ejecucion);
    });

    function llenarSelec() {
        var limite = localStorage.length;
        for (var i = 0; i < limite; i++) {
            var code = localStorage.key(i);
            console.log(localStorage.getItem(code));
            var curso = JSON.parse(localStorage.getItem(code));
            if (curso.type == "cur") {
                $("#fkcurso").append("<option value='" + curso.id + "'>" + curso.nombre + "</option>");
            }
        }
    }

    $("#aForm").click(function () {
        var request = "Formulario.php";
        var parametros = "A=1";
        var ejecucion = function (datos) {
            document.getElementById("contenido").innerHTML = datos;

            llenarSelec();
            var reglas = {CC: {required: true, number: true, digits: true}, nom: {required: true, maxlength: 70}, correo: {required: true, email: true}, ccorreo: {equalTo: "#correo"}, fkcurso: {required: true, number: true}};
            var mensajes = {CC: {required: "La CC es Obligatoria", number: "La cc es un numero", digits: "La CC no puede tener ni puntos ni comas"}, ccorreo: {equalTo: "Debe ingresar el mismo valor del campo superior a este campo"}};
            var metodo = function () {
                // alert("Los datos fueron ingresados segun lo solicitado");
                var cc = $("#CC").val();
                var nom = $("#nom").val();
                var correo = $("#correo").val();
                var curso = $("#fkcurso").val();
                var Persona = {
                    cc: cc,
                    nom: nom,
                    correo: correo,
                    curso: curso,
                    type: "per"
                };
                if (gbCurso == null) {
                    localStorage.setItem(localStorage.length, JSON.stringify(Persona));
                    $("#limpiar").trigger("click");
                    alerta("El usuario <b>" + Persona.nom + "</b> fue almacenado");
                } else {
                    localStorage.setItem(gbCode, JSON.stringify(Persona));
                    alerta("El usuario <b>" + Persona.nom + "</b> fue Modificado");
                    $("#alista").trigger("click");
                }
                gbCode = null;
                gbCurso = null;
            };
            var toptip = {
                cc: {html: false, placement: 'left'},
                nom: {placement: 'left', html: true},
                correo: {placement: 'right', html: true}
            };
            validarFor("registro", reglas, mensajes, metodo, toptip);
        };
        MIAjax(request, parametros, ejecucion);
    });

    $("#alista").click(function () {
        var request = "listado.php";
        var parametros = "a=1";
        var ejecutar = function (datos) {
            $("#contenido").html(datos);

            var limite = localStorage.length;
            var contador = 1;
            for (var i = 0; i < limite; i++) {
                var code = localStorage.key(i);
                var persona = JSON.parse(localStorage.getItem(code));
                if (persona.type == "per") {
                    var tr = $("<tr></tr>");
                    tr.append("<td>" + contador + "</td>");
                    tr.append("<td>" + persona.cc + "</td>");
                    tr.append("<td>" + persona.nom + "</td>");
                    tr.append("<td>" + persona.correo + "</td>");
                    tr.append("<td>" + getCurso(persona.curso).nombre + "</td>");
                    tr.append("<td class='mimouse mod' code='" + code + "'>Modificar</td>");
                    tr.append("<td class='mimouse eli' code='" + code + "'>Eliminar</td>");
                    $("#conTabla").append(tr);
                    contador = contador + 1;
                }
            }
            eliminar(".eli");
            modifocar(".mod");
        };
        MIAjax(request, parametros, ejecutar);
    });

    traerindex();

    function eliminar(pvEleme) {
        $(pvEleme).click(function () {
            var code = $(this).attr("code");
            localStorage.removeItem(code);
            $(this).parent().remove();
        });
    }
    var gbCurso = null;
    var gbCode = null;

    function modifocar(pvEleme) {
        $(pvEleme).click(function () {
            gbCode = $(this).attr("code");
            gbCurso = JSON.parse(localStorage.getItem(gbCode));

            $("#aForm").trigger("click");
            setTimeout(function () {
                $("#regis").fadeOut(0);
                $("#modifi").fadeIn(0);

                $("#CC").val(gbCurso.cc);
                $("#nom").val(gbCurso.nom);
                $("#correo").val(gbCurso.correo);
                $("#ccorreo").val(gbCurso.correo);
                $("#fkcurso").val(gbCurso.curso);
            }, 500);
        });
    }


    function getCurso(pvID) {
        var limite = localStorage.length;
        for (var i = 0; i < limite; i++) {
            var code = localStorage.key(i);
            console.log(localStorage.getItem(code));
            var curso = JSON.parse(localStorage.getItem(code));
            if (curso.type == "cur" && curso.id == pvID) {
                return curso;
            }
        }
        return null;
    }
});