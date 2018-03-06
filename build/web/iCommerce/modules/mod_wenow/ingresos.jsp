<%-- 
    Document   : ingresos
    Este jsp contiene la pantalla de captura de nuevos ingresos
    Created on : 16-abr-2013, 15:31:53
    Author     : aleph_79
--%>

<%@page import="java.sql.SQLException"%>
<%@page import="ERP.Precios"%>
<%@page import="java.util.Iterator"%>
<%@page import="comSIWeb.Operaciones.Conexion"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="comSIWeb.ContextoApt.Seguridad"%>
<%@page import="comSIWeb.ContextoApt.VariableSession"%>
<%
    /*Inicializamos las variables de sesion limpias*/
    VariableSession varSesiones = new VariableSession(request);
    varSesiones.getVars();

    //Instanciamos objeto de seguridad para no permitir el acceso externo a ver los XML
    Seguridad seg = new Seguridad();//Valida que la peticion se halla hecho desde el mismo sitio
    if (varSesiones.getIntNoUser() != 0) {

        //Recuperamos los nombres de los estados
        ArrayList<String> lstEstado = new ArrayList<String>();
        ArrayList<String> lstBancos = new ArrayList<String>();
        ArrayList<String> lstTipoIngreso = new ArrayList<String>();
        ArrayList<Integer> intTipoIngresoID = new ArrayList<Integer>();
        ArrayList<Integer> lstCompaniaID = new ArrayList<Integer>();
        ArrayList<String> lstCompaniaDesc = new ArrayList<String>();
        //Abrimos la conexion
        Conexion oConn = new Conexion(varSesiones.getStrUser(), this.getServletContext());
        oConn.open();

        //Consultamos los estados
        String strSql = "select * from estadospais where PA_ID = 1";
        ResultSet rs = oConn.runQuery(strSql, true);
        while (rs.next()) {
            lstEstado.add(rs.getString("ESP_NOMBRE"));
        }
        rs.close();

        String strListaBco = "";
        strListaBco += "<option value='0'>Seleccione...</option>";
        String strQueryBco = "select * from rhh_bancos ";
        ResultSet rs1 = oConn.runQuery(strQueryBco);
        while (rs1.next()) {
            strListaBco += " <option value='" + rs1.getInt("RBK_ID") + "'>"
                    + rs1.getString("RBK_NOMBRE_CORTO") + "</option>";
        }
        rs1.close();

        //Consultamos los Tipo de Ingresos
        String strSqlTIngreso = "select * from vta_cliecat1 ";
        rs = oConn.runQuery(strSqlTIngreso, true);
        while (rs.next()) {
            intTipoIngresoID.add(rs.getInt("CC1_ID"));
            lstTipoIngreso.add(rs.getString("CC1_DESCRIPCION"));
        }
        rs.close();

        String lstCategoria1 = "";
        lstCategoria1 += "<option value='0'>Seleccione...</option>";
        String strQueryCat = "select * from vta_cliecat1 ";
        ResultSet rs11 = oConn.runQuery(strQueryCat);
        while (rs11.next()) {
            lstCategoria1 += " <option value='" + rs11.getInt("CC1_ID") + "'>"
                    + rs11.getString("CC1_DESCRIPCION") + "</option>";
        }
        rs11.close();

        //Consultamos las Compañias telefonicas
        String strSqlCompanias = "select * from prosp_inf_compania_telefono";
        rs = oConn.runQuery(strSqlCompanias, true);
        while (rs.next()) {
            lstCompaniaDesc.add(rs.getString("COMPTEL_NOMBRE"));
            lstCompaniaID.add(rs.getInt("COMPTEL_ID"));
        }
        rs.close();

        //precios
        Precios prec = new Precios();
        //Kits de ingreso
        StringBuilder strOpciones = new StringBuilder();
        strSql = "select PR_ID,PR_DESCRIPCION from vta_producto where PR_ESKITINC = 1";
        rs = oConn.runQuery(strSql, true);

        while (rs.next()) {
            double dblPrecio = 0;

            strSql = "select PR_ID,PP_PRECIO,PP_APDESC,PP_PTOSLEAL,PP_PTOSLEALCAM "
                    + ",PP_PRECIO_USD,PP_PUNTOS,PP_NEGOCIO,PP_PPUBLICO,PP_APDESC,PP_APDESCPTO,PP_APDESCNEGO,PP_PUTILIDAD "
                    + " from vta_prodprecios where PR_ID = " + rs.getInt("PR_ID") + " AND LP_ID= 1";
            ResultSet rs2;
            try {
                rs2 = oConn.runQuery(strSql, true);
                while (rs2.next()) {
                    dblPrecio = rs2.getDouble("PP_PRECIO");
                }
                rs2.close();
            } catch (SQLException ex) {
            }

            strOpciones.append("<option value='" + rs.getInt("PR_ID") + "'>" + rs.getString("PR_DESCRIPCION") + " $" + comSIWeb.Utilerias.NumberString.FormatearDecimal(dblPrecio, 2) + "</option>");
        }
        rs.close();
        oConn.close();
%>
<div class="well ">
    <h3 class="page-header">Nuevo distribuidor</h3>
    <form action="index.jsp?mod=ingresos_save" method="post" onsubmit="return  EvaluaFormulario();" id="login-form" class="form-inline">
        <div class="userdata">
            <div id="form-new-submit" class="control-group">
                <div class="controls">
                    <span class="required">* Los campos marcados en rojo son obligatorios</span>
                </div>
            </div>



            <!--Nombre-->
            <div id="form-new-nombre" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="Nombre"/>
                            <label for="modlgn-nombre" >Nombre:</label>
                        </span>
                        <input id="modlgn-nombre" type="text" name="nombre" class="input-medium-ingresos" tabindex="0" size="30" maxlength="29" placeholder="Nombre"/> <span class="required">*</span>
                    </div>
                </div>
            </div>
            <!--Apellido Paterno-->
            <div id="form-new-apaterno" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="Apellido Paterno"/>
                            <label for="modlgn-apaterno" >Apellido Paterno:</label>
                        </span>
                        <input id="modlgn-apaterno" type="text" name="apaterno" class="input-medium-ingresos" tabindex="0" size="30" maxlength="29" placeholder="Apellido Paterno"/><span class="required">*</span>
                    </div>
                </div>
            </div>
            <!--Apellido Materno-->
            <div id="form-new-amaterno" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="Apellido Materno"/>
                            <label for="modlgn-amaterno" >Apellido Materno:</label>
                        </span>
                        <input id="modlgn-amaterno" type="text" name="amaterno" class="input-medium-ingresos" tabindex="0" size="30" maxlength="29" placeholder="Apellido Materno"/><span class="required">*</span>
                    </div>
                </div>
            </div>
            <!--Sponsor
            <div id="form-new-sponsor" class="control-group">
               <div class="controls">
                  <div class="input-prepend input-append">
                     <span class="add-on">
                        <span title="Id de quien lo invito"/>
                        <label for="modlgn-sponsor" >Id de quien lo invito:</label>
                     </span>
                     <input id="modlgn-sponsor" type="text" name="idinvito" class="input-medium-ingresos" tabindex="0" size="30" maxlength="10" placeholder="Id de quien lo invito"/>
                  </div>
               </div>
            </div>
            <!--Fecha de nacimiento-->
            <div id="form-new-nacimiento" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="Fecha de nacimiento"/>
                            <label for="modlgn-nacimiento" >Fecha de nacimiento:</label>
                        </span>
                        <input id="modlgn-nacimiento" type="text" name="nacimiento" class="input-medium-ingresos" tabindex="0" size="30" maxlength="10" placeholder="Fecha de nacimiento"/><span class="required">*</span>
                    </div>
                </div>
            </div>
            <!--RFC-->
            <!--         <div id="form-new-rfc" class="control-group">
                        <div class="controls">
                           <div class="input-prepend input-append">
                              <span class="add-on">
                                 <span title="Registro Federal de Contribuyentes"/>
                                 <label for="modlgn-rfc" >Registro Federal de Contribuyentes:</label>
                              </span>
                              <input id="modlgn-rfc" type="text" name="rfc" class="input-medium-ingresos" tabindex="0" size="30" maxlength="25" placeholder="Registro Federal de Contribuyentes" value="XAXX010101000"  /><span class="required">*</span>
                           </div>
                        </div>
                     </div>
            -->
            <!--Calle-->
            <div id="form-new-calle" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="Calle"/>
                            <label for="modlgn-calle" >Calle:</label>
                        </span>
                        <input id="modlgn-calle" type="text" name="calle" class="input-medium-ingresos" tabindex="0" size="30" maxlength="80" placeholder="Calle"/><span class="required">*</span>
                    </div>
                </div>
            </div>
            <!--Numero-->
            <div id="form-new-numero" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="numero"/>
                            <label for="modlgn-numero" >Numero:</label>
                        </span>
                        <input id="modlgn-numero" type="text" name="numero" class="input-medium-ingresos" tabindex="0" size="30" maxlength="10" placeholder="Numero"/><span class="required">*</span>
                    </div>
                </div>
            </div>
            <!--Boton-->
            <!--Numero interno-->
            <div id="form-new-numeroInterno" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="numeroInterno"/>
                            <label for="modlgn-numeroInterno" >Numero Interno:</label>
                        </span>
                        <input id="modlgn-numeroInterno" type="text" name="numeroInterno" class="input-medium-ingresos" tabindex="0" size="30" maxlength="25" placeholder="Numero Interno"/>
                    </div>
                </div>
            </div>
            <!--Colonia-->
            <div id="form-new-colonia" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="colonia"/>
                            <label for="modlgn-colonia" >Colonia:</label>
                        </span>
                        <input id="modlgn-colonia" type="text" name="colonia" class="input-medium-ingresos" tabindex="0" size="30" maxlength="80" placeholder="Colonia"/><span class="required">*</span>
                    </div>
                </div>
            </div>

            <!--Municipio-->
            <div id="form-new-municipio" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="municipio"/>
                            <label for="modlgn-municipio" >Municipio</label>
                        </span>
                        <input id="modlgn-municipio" type="text" name="municipio" class="input-medium-ingresos" tabindex="0" size="30" maxlength="45" placeholder="Municipio"/><span class="required">*</span>
                    </div>
                </div>
            </div>
            <!--Localidad-->
            <div id="form-new-localidad" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="localidad"/>
                            <label for="modlgn-localidad" >Localidad</label>
                        </span>
                        <input id="modlgn-localidad" type="text" name="localidad" class="input-medium-ingresos" tabindex="0" size="30" maxlength="80" placeholder="Localidad"/>
                    </div>
                </div>
            </div>
            <!--Estado-->
            <div id="form-new-estado" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="estado"/>
                            <label for="modlgn-estado" >Estado:</label>
                        </span>
                        <select id="modlgn-estado" name="estado" class="combo1"  placeholder="Estado">
                            <option id="">Seleccione</option>
                            <%
                                //Mostramos los estados.
                                Iterator<String> it = lstEstado.iterator();
                                while (it.hasNext()) {
                                    String strEstado = it.next();
                            %><option id="<%=strEstado%>"><%=strEstado%></option><%
                                }
                            %>
                        </select>
                        <span class="required">*</span>
                    </div>
                </div>
            </div>
            <!--Codigo Postal-->
            <div id="form-new-cp" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="cp"/>
                            <label for="modlgn-cp" >C&oacute;digo Postal:</label>
                        </span>
                        <input id="modlgn-cp" type="text" name="cp" class="input-medium-ingresos" tabindex="0" size="30" maxlength="80" placeholder="C&oacute;digo Postal"/><span class="required">*</span>
                    </div>
                </div>
            </div>
            <!--Telefono 1-->
            <div id="form-new-telefono1" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="telefono1"/>
                            <label for="modlgn-telefono1" >Telefono casa(10 digitos):</label>
                        </span>
                        <input id="modlgn-telefono1" type="text" name="telefono1" class="input-medium-ingresos" tabindex="0" size="30" maxlength="45" placeholder="Telefono casa"/><span class="required">*</span>
                    </div>
                </div>
            </div>
            <!--Telefono 2-->
            <div id="form-new-telefono2" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="telefono2"/>
                            <label for="modlgn-telefono2" >Telefono celular(10 digitos):</label>
                        </span>
                        <input id="modlgn-telefono2" type="text" name="telefono2" class="input-medium-ingresos" tabindex="0" size="30" maxlength="45" placeholder="Telefono celular"/><span class="required">*</span>
                    </div>
                </div>
            </div>
            <!--Email 1-->
            <div id="form-new-email1" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="email1"/>
                            <label for="modlgn-email1" >Cuenta de correo electr&oacute;nico:</label>
                        </span>
                        <input id="modlgn-email1" type="text" name="email1" class="input-medium-ingresos" tabindex="0" size="30" maxlength="60" placeholder="Cuenta de correo electr&oacute;nico"/>
                    </div>
                </div>
            </div>
            <!--Beneficiario 1-->
            <div id="form-new-contacto1" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="contacto1"/>
                            <label for="modlgn-contacto1" >Beneficiario:</label>
                        </span>
                        <input id="modlgn-contacto1" type="text" name="contacto1" class="input-medium-ingresos" tabindex="0" size="30" maxlength="30" placeholder="Beneficiario"/>
                    </div>
                </div>
            </div>
            <!--Numero de cuenta de banco 1-->
            <div id="form-new-cuenta_bancaria1" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="cuenta_bancaria1"/>
                            <label for="modlgn-cuenta_bancaria1" >Cuenta Bancaria 1:</label>
                        </span>
                        <input id="modlgn-cuenta_bancaria1" type="text" name="cuenta_bancaria1" class="input-medium" tabindex="0" size="30" maxlength="60" placeholder="Cuenta Bancaria 1"/>
                    </div>
                </div>
            </div>
            <!--Numero de cuenta de banco 2-->
            <div id="form-new-cuenta_bancaria2" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="cuenta_bancaria2"/>
                            <label for="modlgn-cuenta_bancaria2" >Cuenta Bancaria 2:</label>
                        </span>
                        <input id="modlgn-cuenta_bancaria2" type="text" name="cuenta_bancaria2" class="input-medium" tabindex="0" size="10" maxlength="10" placeholder="Cuenta Bancaria 2"/>                  
                    </div>
                </div>
            </div>                         



            <!--Bancos-->
            <div id="form-new-banco" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="banco"/>
                            <label for="modlgn-banco" >Banco:</label>
                        </span>
                        <select id="modlgn-banco" name="banco"  placeholder="banco">
                            <%=strListaBco%>
                        </select>                
                    </div>
                </div>
            </div>


        <!--Clabe Interbancaria-->
        <div id="form-new-clabe_interbancaria" class="control-group">
            <div class="controls">
                <div class="input-prepend input-append">
                    <span class="add-on">
                        <span title="clabe_interbancaria"/>
                        <label for="modlgn-clabe_interbancaria" >Clabe Interbancaria:</label>
                    </span>
                    <input id="modlgn-clabe_interbancaria" type="text" name="clabe_interbancaria" class="input-medium" tabindex="0" size="18" maxlength="18" placeholder="Clabe Interbancaria" />                  
                </div>
            </div>
        </div>


            <!--KIT  -->
            <div id="form-new-kit" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="kit"/>
                            <label for="modlgn-kit" >Tipo de Kit:</label>
                        </span>
                        <select id="modlgn-kit" name="kit"  placeholder="Tipo de Kit">
                            <%=lstCategoria1%>
                        </select>     
                        <span class="required">*</span>
                    </div>
                </div>
            </div>

            <!--CURP-->
            <!--         <div id="form-new-curp" class="control-group">
                        <div class="controls">
                           <div class="input-prepend input-append">
                              <span class="add-on">
                                 <span title="curp"/>
                                 <label for="modlgn-curp" >CURP:</label>
                              </span>
                              <input id="modlgn-curp" type="text" name="curp" class="input-medium" tabindex="0" size="10" maxlength="10" placeholder="CURP"/>         
                           </div>
                        </div>
                     </div>
            -->


            <div id="tabs-2" >
                <h4>Direccion de entrega</h4>
                <!--Copia direccion -->
                <div id="form-new-nombre" class="control-group">
                    <div class="controls">
                        <div class="input-prepend input-append">
                            <span class="add-on">
                                <span title="Nombre"/>
                                <label for="modlgn-nombre" >Copiar direcion de Facturación:</label>
                            </span>
                            <input type="checkbox" id="copia" onchange="copyDireccion()"/></div>
                    </div>
                </div>

                <!--Nombre-->
                <div id="form-new-nombre" class="control-group">
                    <div class="controls">
                        <div class="input-prepend input-append">
                            <span class="add-on">
                                <span title="Nombre"/>
                                <label for="modlgn-nombre" >Nombre:</label>
                            </span>
                            <input id="dir_ent_nombre" type="text" name="dir_ent_nombre" class="input-medium-ingresos" tabindex="0" size="30" maxlength="29" placeholder="Nombre"/> <span class="required">*</span>
                        </div>
                    </div>
                </div>
                <!--Nombre-->
                <div id="form-new-nombre" class="control-group">
                    <div class="controls">
                        <div class="input-prepend input-append">
                            <span class="add-on">
                                <span title="Nombre"/>
                                <label for="modlgn-nombre" >Telefono:</label>
                            </span>
                            <input id="dir_ent_telefono" type="text" name="dir_ent_telefono" class="input-medium-ingresos" tabindex="0" size="30" maxlength="15" placeholder="Telefono"/> <span class="required">*</span>
                        </div>
                    </div>
                </div>
                <!--Email-->
                <div id="form-new-nombre" class="control-group">
                    <div class="controls">
                        <div class="input-prepend input-append">
                            <span class="add-on">
                                <span title="Nombre"/>
                                <label for="modlgn-nombre" >Email:</label>
                            </span>
                            <input id="dir_ent_email" type="text" name="dir_ent_email" class="input-medium-ingresos" tabindex="0" size="30" maxlength="29" placeholder="Email"/>
                        </div>
                    </div>
                </div>
                <!--Calle-->
                <div id="form-new-nombre" class="control-group">
                    <div class="controls">
                        <div class="input-prepend input-append">
                            <span class="add-on">
                                <span title="Nombre"/>
                                <label for="modlgn-nombre" >Calle:</label>
                            </span>
                            <input id="dir_ent_calle" type="text" name="dir_ent_calle" class="input-medium-ingresos" tabindex="0" size="30" maxlength="50" placeholder="Calle"/> <span class="required">*</span>
                        </div>
                    </div>
                </div>
                <!--Numero-->
                <div id="form-new-numero" class="control-group">
                    <div class="controls">
                        <div class="input-prepend input-append">
                            <span class="add-on">
                                <span title="numero"/>
                                <label for="modlgn-numero" >Numero:</label>
                            </span>
                            <input id="dir_ent_numero" type="text" name="dir_ent_numero" class="input-medium-ingresos" tabindex="0" size="30" maxlength="10" placeholder="Numero"/><span class="required">*</span>
                        </div>
                    </div>
                </div>
                <!--Boton-->
                <!--Numero interno-->
                <div id="form-new-numeroInterno" class="control-group">
                    <div class="controls">
                        <div class="input-prepend input-append">
                            <span class="add-on">
                                <span title="numeroInterno"/>
                                <label for="modlgn-numeroInterno" >Numero Interno:</label>
                            </span>
                            <input id="dir_ent_numeroInterno" type="text" name="dir_ent_numeroInterno" class="input-medium-ingresos" tabindex="0" size="30" maxlength="25" placeholder="Numero Interno"/>
                        </div>
                    </div>
                </div>
                <!--Colonia-->
                <div id="form-new-colonia" class="control-group">
                    <div class="controls">
                        <div class="input-prepend input-append">
                            <span class="add-on">
                                <span title="colonia"/>
                                <label for="modlgn-colonia" >Colonia:</label>
                            </span>
                            <input id="dir_ent_colonia" type="text" name="dir_ent_colonia" class="input-medium-ingresos" tabindex="0" size="30" maxlength="80" placeholder="Colonia"/><span class="required">*</span>
                        </div>
                    </div>
                </div>
                <!--Estado-->
                <div id="form-new-estado" class="control-group">
                    <div class="controls">
                        <div class="input-prepend input-append">
                            <span class="add-on">
                                <span title="estado"/>
                                <label for="modlgn-estado" >Estado:</label>
                            </span>
                            <select id="dir_ent_estado" name="dir_ent_estado" class="combo1"  placeholder="Estado">
                                <option id="">Seleccione</option>
                                <%
                                    //Mostramos los estados.
                                    Iterator<String> it1 = lstEstado.iterator();
                                    while (it1.hasNext()) {
                                        String strEstado = it1.next();
                                %><option id="<%=strEstado%>"><%=strEstado%></option><%
                                    }
                                %>
                            </select>
                            <span class="required">*</span>
                        </div>
                    </div>
                </div>

            </div>
            <!--Municipio-->
            <div id="form-new-cp" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="cp"/>
                            <label for="modlgn-cp" >Municipio:</label>
                        </span>
                        <input id="dir_ent_mun" type="text" name="dir_ent_mun" class="input-medium-ingresos" tabindex="0" size="30" maxlength="80" placeholder="Municipio"/><span class="required">*</span>
                    </div>
                </div>
            </div>

            <!--CP-->
            <div id="form-new-cp" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="cp"/>
                            <label for="modlgn-cp" >C&oacute;digo Postal:</label>
                        </span>
                        <input id="dir_ent_cp" type="text" name="dir_ent_cp" class="input-medium-ingresos" tabindex="0" size="30" maxlength="80" placeholder="C&oacute;digo Postal"/><span class="required">*</span>
                    </div>
                </div>
            </div>

            <!--Referencia-->
            <div id="form-new-mensaje" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <label for="modlgn-cp" >Referencia:</label>
                    </div>
                    <TEXTAREA  id="Texto" style="width: 334px; height: 162px;" onBlur="pasaValor()">
                    </TEXTAREA> 
                    <input type="hidden" id="texto" name="texto"/>
                </div>
            </div>       

            <div id="form-new-answer" class="control-group">
                <div class="controls">
                    <div class="input-prepend input-append">
                        <span class="add-on">
                            <span title="answer"/>
                            <label for="modlgn-cuenta_answer" >&nbsp;</label>
                        </span>
                        <img alt="Captcha"  src="../stickyImg" /><input id="modlgn-answer" type="text" name="answer" class="input-medium-ingresos" tabindex="0" size="10" maxlength="10" placeholder="Escriba el texto de la imagen"/><span class="required">*</span>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <!--Boton-->
            <div id="form-new-submit" class="control-group">
                <div class="controls">
                    <button type="submit" tabindex="0" name="Submit" class="btn btn-primary btn" >Guardar</button>
                </div>
            </div>

        </div>
    </form>
</div>
<script type="text/javascript">
    $("#modlgn-nacimiento").datepicker({
        changeMonth: true,
        changeYear: true
    });

    var statSend = false;

    function EvaluaFormulario() {



        //var combo10 = document.getElementById("dir_ent_tingreso-estado");
        // var selected = combo10.options[combo10.selectedIndex].text;
        // if (selected == "Seleccione") {
        //   alert("Es necesario que capture el Tipo de ingreso");
        //   document.getElementById("dir_ent_tingreso").focus();
        //  return false;
        // }

        if (document.getElementById("modlgn-nombre").value == "") {
            alert("Es necesario que capture el nombre");
            document.getElementById("modlgn-nombre").focus();
            return false;
        }
        if (document.getElementById("modlgn-apaterno").value == "") {
            alert("Es necesario que capture el apellido paterno");
            document.getElementById("modlgn-apaterno").focus();
            return false;
        }
        if (document.getElementById("modlgn-amaterno").value == "") {
            alert("Es necesario que capture el apellido materno");
            document.getElementById("modlgn-amaterno").focus();
            return false;
        }
        /*      if (document.getElementById("modlgn-rfc").value == "") {
         alert("Es necesario que capture el rfc");
         document.getElementById("modlgn-rfc").focus();
         return false;
         }
         */
        if (document.getElementById("modlgn-nacimiento").value == "") {
            alert("Es necesario que capture la fecha de nacimiento");
            document.getElementById("modlgn-nacimiento").focus();
            return false;
        }
        if (document.getElementById("modlgn-calle").value == "") {
            alert("Es necesario que capture la calle");
            document.getElementById("modlgn-calle").focus();
            return false;
        }
        if (document.getElementById("modlgn-numero").value == "") {
            alert("Es necesario que capture el numero");
            document.getElementById("modlgn-numero").focus();
            return false;
        }
        if (document.getElementById("modlgn-colonia").value == "") {
            alert("Es necesario que capture la colonia");
            document.getElementById("modlgn-colonia").focus();
            return false;
        }
        if (document.getElementById("modlgn-municipio").value == "") {
            alert("Es necesario que capture la municipio");
            document.getElementById("modlgn-municipio").focus();
            return false;
        }
        var combo = document.getElementById("modlgn-estado");
        var selected = combo.options[combo.selectedIndex].text;
        if (selected == "Seleccione") {
            alert("Es necesario que capture el estado");
            document.getElementById("modlgn-estado").focus();
            return false;
        }
        if (document.getElementById("modlgn-cp").value == "") {
            alert("Es necesario que capture el codigo postal");
            document.getElementById("modlgn-cp").focus();
            return false;
        }
        if (document.getElementById("modlgn-telefono1").value == "") {
            alert("Es necesario que capture el telefono de casa");
            document.getElementById("modlgn-telefono1").focus();
            return false;
        }
        if (document.getElementById("modlgn-telefono2").value == "") {
            alert("Es necesario que capture el telefono celular");
            document.getElementById("modlgn-telefono2").focus();
            return false;
        }

        if (document.getElementById("modlgn-kit").value == "0") {
            alert("Es necesario que capture el Tipo de kit");
            document.getElementById("modlgn-kit").focus();
            return false;
        }
        //Expresiones regulares


        //RFC 
        /*      if (document.getElementById("modlgn-rfc").value != "") {
         var bolExpReg = _EvalExpReg(document.getElementById("modlgn-rfc").value, "^[A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?$");
         if (!bolExpReg) {
         alert("El formato del registro federal de contribuyentes es incorrecto");
         document.getElementById("modlgn-rfc").focus();
         return false;
         }
         }
         */
        //Codigo postal
        if (document.getElementById("modlgn-cp").value != "") {
            var bolExpReg = _EvalExpReg(document.getElementById("modlgn-cp").value, "^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$");
            if (!bolExpReg) {
                alert("El formato del codigo postal es incorrecto");
                document.getElementById("modlgn-cp").focus();
                return false;
            }
        }
        //Fecha de nacimiento
        if (document.getElementById("modlgn-nacimiento").value != "") {
            var bolExpReg = validateMXDate(document.getElementById("modlgn-nacimiento").value);
            if (!bolExpReg) {
                alert("El formato de la fecha de nacimiento es incorrecto");
                document.getElementById("modlgn-nacimiento").focus();
                return false;
            }
        }
        //Telefono
        if (document.getElementById("modlgn-telefono1").value != "") {
            var bolExpReg = _EvalExpReg(document.getElementById("modlgn-telefono1").value, "^[0-9]{10}$");
            if (!bolExpReg) {
                alert("El formato del numero de telefono es incorrecto");
                document.getElementById("modlgn-telefono1").focus();
                return false;
            }
        }
        //Telefono
        if (document.getElementById("modlgn-telefono2").value != "") {
            var bolExpReg = _EvalExpReg(document.getElementById("modlgn-telefono2").value, "^[0-9]{10}$");
            if (!bolExpReg) {
                alert("El formato del numero de telefono es incorrecto");
                document.getElementById("modlgn-telefono2").focus();
                return false;
            }
        }




        //CAPTCHA
        if (document.getElementById("modlgn-answer").value == "") {
            alert("Es necesario que capture el CAPTCHA");
            document.getElementById("modlgn-answer").focus();
            return false;
        }

        if (validaDireccionEntrega() != true) {

            return false;
        }



        if (checkSubmit() == true) {
            console.log("/////////////////////////////////////////////////");
            return true;
        } else {
            console.log("El formulario ya se esta enviando...");
            return false;
        }


        return true;


    }


    function checkSubmit() {
        if (statSend == false) {
            //console.log("/////////////////");
            statSend = true;
            return true;
        } else {

            alert("El formulario ya se esta enviando...");
            //   console.log("El formulario ya se esta enviando...");
            return false;
        }
    }

    /*Copia los datos de facturacion*/
    function copyDireccion() {

        if (document.getElementById("copia").checked == true) {

            document.getElementById("dir_ent_nombre").value = document.getElementById("modlgn-nombre").value;
            document.getElementById("dir_ent_telefono").value = document.getElementById("modlgn-telefono1").value;
            document.getElementById("dir_ent_email").value = document.getElementById("modlgn-email1").value;
            document.getElementById("dir_ent_calle").value = document.getElementById("modlgn-calle").value;
            document.getElementById("dir_ent_numero").value = document.getElementById("modlgn-numero").value;
            document.getElementById("dir_ent_numeroInterno").value = document.getElementById("modlgn-numeroInterno").value;
            document.getElementById("dir_ent_colonia").value = document.getElementById("modlgn-colonia").value;
            document.getElementById("dir_ent_estado").value = document.getElementById("modlgn-estado").value;
            document.getElementById("dir_ent_mun").value = document.getElementById("modlgn-municipio").value;
            document.getElementById("dir_ent_cp").value = document.getElementById("modlgn-cp").value;

        } else {

            document.getElementById("dir_ent_nombre").value = "";
            document.getElementById("dir_ent_telefono").value = "";
            document.getElementById("dir_ent_calle").value = "";
            document.getElementById("dir_ent_numero").value = "";
            document.getElementById("dir_ent_numeroInterno").value = "";
            document.getElementById("dir_ent_colonia").value = "";
            document.getElementById("dir_ent_estado").value = "";
            document.getElementById("dir_ent_mun").value = "";
            document.getElementById("dir_ent_cp").value = "";
            document.getElementById("dir_ent_email").value = "";

        }






    }


    /*Valida los campos de direccion de entrega*/
    function validaDireccionEntrega() {

        if (document.getElementById("dir_ent_nombre").value == "") {
            alert("Es necesario que capture el nombre");
            document.getElementById("dir_ent_nombre").focus();
            return false;
        }

        //Telefono
        if (document.getElementById("dir_ent_telefono").value != "") {
            var bolExpReg = _EvalExpReg(document.getElementById("dir_ent_telefono").value, "^[0-9]{10}$");
            if (!bolExpReg) {
                alert("El formato del numero de telefono es incorrecto");
                document.getElementById("dir_ent_telefono").focus();
                return false;
            }
        } else {
            alert("Captura un Numero de Telefono");
            document.getElementById("dir_ent_telefono").focus();
            return false;

        }

        if (document.getElementById("dir_ent_calle").value == "") {
            alert("Es necesario que capture una calle");
            document.getElementById("dir_ent_calle").focus();
            return false;
        }

        if (document.getElementById("dir_ent_numero").value == "") {
            alert("Es necesario que capture un numero o s/n.");
            document.getElementById("dir_ent_numero").focus();
            return false;
        }

        if (document.getElementById("dir_ent_colonia").value == "") {
            alert("Es necesario que capture una colonia.");
            document.getElementById("dir_ent_colonia").focus();
            return false;
        }

        if (document.getElementById("dir_ent_estado").value == "") {
            alert("Es necesario que seleccione un estado.");
            document.getElementById("dir_ent_estado").focus();
            return false;
        }

        if (document.getElementById("dir_ent_mun").value == "") {
            alert("Es necesario que capture un municipio.");
            document.getElementById("dir_ent_mun").focus();
            return false;
        }
        if (document.getElementById("dir_ent_cp").value == "") {
            alert("Es necesario que capture un Codigo postal.");
            document.getElementById("dir_ent_cp").focus();
            return false;
        }

        /*if (document.getElementById("texto").value == "") {
         alert("Capture alguna referencia");
         document.getElementById("Texto").focus();
         return false;
         }*/


        return true;
    }

    //Valida un cadena conforme una expresion regular
    function _EvalExpReg(YourValue, YourExp)
    {
        var Template = new RegExp(YourExp)
        return (Template.test(YourValue)) ? 1 : 0 //Compara "YourAlphaNumeric" con el formato "Template" y si coincidevuelve verdadero si no devuelve falso
    }

    function validateMXDate(strValue) {
        /************************************************
         DESCRIPTION: Validates that a string contains only
         valid dates with 2 digit month, 2 digit day,
         4 digit year. Date separator can be ., -, or /.
         Uses combination of regular expressions and
         string parsing to validate date.
         Ex. mm/dd/yyyy or mm-dd-yyyy or mm.dd.yyyy
         
         PARAMETERS:
         strValue - String to be tested for validity
         
         RETURNS:
         True if valid, otherwise false.
         
         REMARKS:
         Avoids some of the limitations of the Date.parse()
         method such as the date separator character.
         *************************************************/
        var objRegExp = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/

        //check to see if in correct format
        if (!objRegExp.test(strValue))
            return false; //doesn't match pattern, bad date
        else {
            var strSeparator = strValue.substring(2, 3)
            var arrayDate = strValue.split(strSeparator);
            //create a lookup for months not equal to Feb.
            var arrayLookup = {'01': 31, '03': 31,
                '04': 30, '05': 31,
                '06': 30, '07': 31,
                '08': 31, '09': 30,
                '10': 31, '11': 30, '12': 31}
            var intDay = parseInt(arrayDate[0], 10);

            //check if month value and day value agree
            if (arrayLookup[arrayDate[1]] != null) {
                if (intDay <= arrayLookup[arrayDate[1]] && intDay != 0)
                    return true; //found in lookup table, good date
            }

            //check for February (bugfix 20050322)
            //bugfix  for parseInt kevin
            //bugfix  biss year  O.Jp Voutat
            var intMonth = parseInt(arrayDate[1], 10);
            if (intMonth == 2) {
                var intYear = parseInt(arrayDate[2]);
                if (intDay > 0 && intDay < 29) {
                    return true;
                }
                else if (intDay == 29) {
                    if ((intYear % 4 == 0) && (intYear % 100 != 0) ||
                            (intYear % 400 == 0)) {
                        // year div by 4 and ((not div by 100) or div by 400) ->ok
                        return true;
                    }
                }
            }
        }
        return false; //any other values, bad date
    }


    /*PASA LO QUE ESCRIBES EN TEXTAREA A UN HIDDEN PARA VALIDARLO*/
    function pasaValor() {

        document.getElementById("texto").value = document.getElementById("Texto").value.trim();
    }



</script>

<%         }
%>




