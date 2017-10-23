$(document).ready(function () {
    function MIAjax(request, parametros, ejecucion) {
        $.ajax({
// la URL para la petición
            url: request,
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data: parametros,
            // especifica si será una petición POST o GET
            type: 'POST',
            // el tipo de información que se espera de respuesta
            dataType: 'html',
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function (datos) {
                ejecucion(datos);
            },
            // código a ejecutar si la petición falla;
            // son pasados como argumentos a la función
            // el objeto de la petición en crudo y código de estatus de la petición
            error: function (xhr, status) {
                alert('Disculpe, existió un problema');
            },
            // código a ejecutar sin importar si la petición falló o no
            complete: function (xhr, status) {
                //  alert('Petición realizada');
            }
        });
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
    function llenarCiudad() {
        var limite = localStorage.length;
        for (var i = 0; i < limite; i++) {
            var code = localStorage.key(i);
            var ciudad = JSON.parse(localStorage.getItem(code));
            if (ciudad.type == "ciu") {
                $("#fkciudad").append("<option value='" + ciudad.nombre + "'>" + ciudad.nombre + "</option>");
            } else if (ciudad.type == "vivi") {
                $("#NomCi").append("<option value='" + ciudad.Tipo + "'>" + ciudad.Tipo + "</option>");

            }
        }
    }

    $("#Ciudades1").click(function () {
        var request = "Ciudad.php";
        var parametros = "A=1";
        var ejecucion = function (datos) {
            document.getElementById("contenido").innerHTML = datos;
            llenarCiudad();
        };
        MIAjax(request, parametros, ejecucion);
    });

    $("#Viviendas1").click(function () {
        var request = "Vivienda.php";
        var parametros = "A=1";
        var ejecucion = function (datos) {
            document.getElementById("contenido").innerHTML = datos;
        };
        MIAjax(request, parametros, ejecucion);
    });
    $("#Viviendas").click(function () {
        var request = "FormularioVi.php";
        var parametros = "A=1";
        var ejecucion = function (datos) {
            document.getElementById("contenido").innerHTML = datos;
            llenarCiudad();
            var reglas = {NomCi: {required: true}, nomPro: {required: true}, DirecCa: {required: true}, ValorVi: {}, TipoVi: {required: true}, Esta: {required: true}};
            var mensajes = {NomCi: {required: "La CC es Obligatoria", nomPro: "La cc es un numero", DirecCa: "La CC no puede tener ni puntos ni comas"}, ValorVi: "La CC no puede tener ni puntos ni comas"};

            var metodo = function () {
                var ciudad = $("#fkciudad").val();
                var nompro = $("#nomPro").val();
                var foto = $("#FoVi").text();
                var direc = $("#DirecCa").val();
                var valor = $("#ValorVi").val();
                var tipo = $("#TipoVi").val();
                var estado = $("#Esta").val();
                var id = (localStorage.length);
                var Vivienda = {
                    Ciudad: ciudad,
                    Nombre: nompro,
                    Foto: foto,
                    Direccion: direc,
                    Valor: valor,
                    Tipo: tipo,
                    Esta: estado,
                    Id: id,
                    type: "vivi"
                };
                if (gbCurso == null) {
                    localStorage.setItem(localStorage.length, JSON.stringify(Vivienda));
                    $("#limpiar").trigger("click");
                    alerta("El usuario <b>" + Vivienda.nombre + "</b> fue almacenado");
                } else {
                    localStorage.setItem(gbCode, JSON.stringify(Vivienda));
                    alerta("El usuario <b>" + Vivienda.nombre + "</b> fue Modificado");
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
    $("#ListaVi").click(function () {
        var request = "listaVi.php";
        var parametros = "a=1";
        var ejecutar = function (datos) {
            $("#contenido").html(datos);
            var limite = localStorage.length;
            var contador = 1;
            for (var i = 0; i < limite; i++) {
                var code = localStorage.key(i);
                var vivienda = JSON.parse(localStorage.getItem(code));
                console.log(localStorage[code])
                if (vivienda.type == "vivi") {
                    var tr = $("<tr></tr>");
                    tr.append("<td>" + contador + "</td>");
                    tr.append("<td>" + vivienda.Ciudad + "</td>");
                    tr.append("<td>" + vivienda.Nombre + "</td>");
                    tr.append("<td>" + vivienda.Foto + "</td>");
                    tr.append("<td>" + vivienda.Direccion + "</td>");
                    tr.append("<td>" + vivienda.Valor + "</td>");
                    tr.append("<td>" + vivienda.Tipo + "</td>");
                    tr.append("<td>" + vivienda.Esta + "</td>");
                    tr.append("<td>" + vivienda.Id + "</td>");
                    tr.append("<td class='mimouse modfi' code='" + code + "'>Modificar</td>");
                    tr.append("<td class='mimouse eli' code='" + code + "'>Eliminar</td>");
                    $("#conTabla").append(tr);
                    contador = contador + 1;
                }
            }
            eliminar(".eli");
            modificar(".modfi");
        };
        MIAjax(request, parametros, ejecutar);
    });
    $("#Ciudades").click(function () {
        var request = "FormularioCi.php";
        var parametros = "A=1";
        var ejecucion = function (datos) {
            document.getElementById("contenido").innerHTML = datos;

            var reglas = {NomCi: {required: true}, Local: {required: true}, TipoCi: {required: true}, DesCi: {required: true}/*, FoCi: {required: true}*/};
            var mensajes = {NomCi: {required: "La CC es Obligatoria", Local: "La cc es un numero"}, TipoCi: "La cc es un numero"};
            var metodo = function () {
                var nombreCiudad = $("#NomCi").val();
                var localizacion = $("#Local").val();
                var tipoCiudad = $("#TipoCi").val();
                var descripcion = $("#DesCi").val();
                var fotoCiudad = $("#FoCi").val();
                var id = (localStorage.length);

                var Ciudad = {
                    nombre: nombreCiudad,
                    local: localizacion,
                    tipo: tipoCiudad,
                    descrip: descripcion,
                    foto: fotoCiudad,
                    Id: id,
                    type: "ciu"
                };
                if (gbCurso == null) {
                    localStorage.setItem(localStorage.length, JSON.stringify(Ciudad));
                    $("#limpiar").trigger("click");
                    alerta("El usuario <b>" + Ciudad.nombre + "</b> fue almacenado");
                } else {
                    localStorage.setItem(gbCode, JSON.stringify(Ciudad));
                    alerta("El usuario <b>" + Ciudad.nombre + "</b> fue Modificado");
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


    $("#Lista").click(function () {
        var request = "lista.php";
        var parametros = "a=1";
        var ejecutar = function (datos) {
            $("#contenido").html(datos);
            var limite = localStorage.length;
            var contador = 1;
            for (var i = 0; i < limite; i++) {
                var code = localStorage.key(i);
                var ciudad = JSON.parse(localStorage.getItem(code));
                console.log(localStorage[code])
                if (ciudad.type == "ciu") {
                    var tr = $("<tr></tr>");
                    tr.append("<td>" + contador + "</td>");
                    tr.append("<td>" + ciudad.nombre + "</td>");
                    tr.append("<td>" + ciudad.local + "</td>");
                    tr.append("<td>" + ciudad.tipo + "</td>");
                    tr.append("<td>" + ciudad.descrip + "</td>");
                    tr.append("<td>" + ciudad.foto + "</td>");
                    tr.append("<td>" + ciudad.Id + "</td>");
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

            $("#Lista").trigger("click");
            setTimeout(function () {
                $("#regis").fadeOut(0);
                $("#modifi").fadeIn(0);

                $("#NomCi").val(gbCurso.nombre);
                $("#Local").val(gbCurso.local);
                $("#TipoCi").val(gbCurso.tipo);
                $("#DesCi").val(gbCurso.descrip);
                $("#FoCi").val(gbCurso.foto);
            }, 500);
        });
    }
    function modificar(pvEleme) {
        $(pvEleme).click(function () {
            gbCode = $(this).attr("code");
            gbCurso = JSON.parse(localStorage.getItem(gbCode));

            $("#ListaVi").trigger("click");
            setTimeout(function () {
                $("#regis").fadeOut(0);
                $("#modifi").fadeIn(0);

                $("#fkciudad").val(gbCurso.Ciudad);
                $("#nomPro").val(gbCurso.Nombre);
                $("#FoVi").val(gbCurso.Foto);
                $("#DirecCa").val(gbCurso.Direccion);
                $("#ValorVi").val(gbCurso.Valor);
                $("#TipoVi").val(gbCurso.Tipo);
                $("#Esta").val(gbCurso.Esta);
            }, 500);
        });
    }


    $("#Filtros").click(function () {
        var request = "Filtro.php";
        var parametros = "A=1";
        var ejecucion = function (datos) {
            document.getElementById("contenido").innerHTML = datos;
            llenarCiudad();
        };
        MIAjax(request, parametros, ejecucion);
    });
    $("#CiudadTipo").click(function () {
        var nombreCiudad = $("#fkciudad").val();
        var tipoVivienda = $("#NomCi").val();
            console.log(nombreCiudad);
        
        /*
        var limite = localStorage.length;
        
        for (var i = 0; i < limite; i++) {
            var code = localStorage.key(i);
            var ciudad = JSON.parse(localStorage.getItem(code));
            console.log(localStorage(code))
        }
        document.getElementById("contenido").innerHTML = datos;
        llenarCiudad();*/

    });


});
