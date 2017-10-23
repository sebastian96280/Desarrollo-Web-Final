<div id="summary"></div>
<div class="container">
    <form class="form-horizontal" id="registro" name="registro">
        <fieldset>
            <legend>Formulario Viviendas</legend>
            <div class="form-group">
                <label for="NomCi" class="col-lg-2 control-label">Ciudad</label>
                <div class="col-lg-10">
                    <select class="form-control" id="fkciudad"  name="fkciudad">
                        <option value="">Seleccione</option>
                    </select>
                </div>
            </div>            
            <div class="form-group">
                <label for="nomPro" class="col-lg-2 control-label">Nombre Propietario</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="nomPro" name="nomPro" placeholder="Ingrese Nombre Propietario">
                </div>
            </div>
            <div class="form-group">
                <label for="FoVi" class="col-lg-2 control-label">Foto de Vivienda</label>
                <div class="col-lg-10">
                    <input name="uploadedfile" type="file" id="FoVi"/>
                </div>
            </div>
            <div class="form-group">
                <label for="DirecCa" class="col-lg-2 control-label">Direccion de la Casa</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="DirecCa" name="DirecCa" placeholder="Ingrese Direccion de la Casa">
                </div>
            </div>
            <div class="form-group">
                <label for="ValorVi" class="col-lg-2 control-label">Valor Vivienda</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="ValorVi" name="ValorVi" placeholder="Ingrese Valor Vivienda">
                </div>
            </div>
            <div class="form-group">
                <label for="TipoVi" class="col-lg-2 control-label">Tipo de Vivienda</label>
                <div class="col-lg-10">
                    <select class="form-control" id="TipoVi"  name="TipoVi">
                        <option value="">Seleccione</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Casa">Casa</option>
                        <option value="Cabaña">Cabaña</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="Esta" class="col-lg-2 control-label">Estado</label>
                <div class="col-lg-10">
                    <select class="form-control" id="Esta" name="Esta">
                        <option value="">Seleccione</option>
                        <option value="Disponible">Disponible</option>
                        <option value="Recervada">Recervada</option>
                        <option value="Vendida">Vendida</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-10 col-lg-offset-2">
                    <button type="submit" id="regis" class="btn btn-primary">Registar</button>
                    <button type="submit" id="modifi" class="btn btn-primary" style="display: none;">Modificar</button>
                    <button id="limpiar" type="reset" class="btn btn-default">Cancel</button>
                </div>
            </div>
        </fieldset>
    </form>
</div>