<!DOCTYPE html>
<div class="container">
    <form class="form-horizontal" id="registro" name="registro">
        <fieldset>
            <legend>Ciudades con Sus Viviendas</legend>
            <div class="container-fluid">
                <div class="form-group">
                    <label for="NomCi" class="col-lg-2 control-label">Ciudad</label>
                    <div class="col-lg-10">
                        <select class="form-control" id="fkciudad"  name="fkciudad">
                            <option value="">Seleccione</option>
                        </select>
                    </div>
                </div>  
            </div>
            <div class="container-fluid">
                <div class="form-group">
                    <label for="NomCi" class="col-lg-2 control-label">Tipo Vivienda</label>
                    <div class="col-lg-10">
                        <select class="form-control" id="NomCi"  name="NomCi">
                            <option value="">Seleccione</option>
                        </select>
                    </div>

                </div>
                <a href="javascript:void(0)" id="CiudadTipo" class="btn btn-default btn-lg btn-block">Filtrar</a>
        </fieldset>
        <p  id="aqui">

        </p>
    </form>
</div>