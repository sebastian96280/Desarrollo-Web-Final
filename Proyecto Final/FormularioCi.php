<div id="summary"></div>
<div class="container">
    <form class="form-horizontal" id="registro" name="registro">
        <fieldset>
            <legend>Formulario Ciudades</legend>
            <div class="form-group">
                <label for="NomCi" class="col-lg-2 control-label">Nombre de la Ciudad</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="NomCi" name="NomCi" placeholder="Ingrese Nombre de la Ciudad">
                </div>
            </div>
            <div class="form-group">
                <label for="Local" class="col-lg-2 control-label" >Localizacion</label>
                <div class="col-lg-10">
                    <select class="form-control" id="Local"  name="Local">
                        <option value="">Seleccione</option>
                        <option value="Urbana" >Urbana</option>
                        <option value="Rural">Rural</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="TipoCi" class="col-lg-2 control-label">Tipo</label>
                <div class="col-lg-10">
                    <select class="form-control" id="TipoCi"  name="TipoCi">
                        <option value="">Seleccione</option>
                        <option value="Grande" text="Grande">Grande</option>
                        <option value="Mediana"text="Mediana">Mediana</option>
                        <option value="Pequena"text="Pequena">Pequena</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="DesCi" class="col-lg-2 control-label">Descripcion de la Ciudad </label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="DesCi" name="DesCi" placeholder="Ingrese Descripcion de la Ciudad">
                </div>
            </div>
            <div class="form-group">
                <label for="FoCi" class="col-lg-2 control-label">Foto de la Ciudad</label>
                <div class="col-lg-10">
                    <input name="uploadedfile" type="file" id="FoCi" />
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