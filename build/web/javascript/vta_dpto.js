function vta_dpto(){}function status_Fields_Dpto(s){var strDescripcion=document.getElementById("DP_DESC_CONTA_CUENTA");var strPrecepcion=document.getElementById("DP_PERC_ID");if(s=="mostrar"){strDescripcion.parentNode.parentNode.style.display="";strPrecepcion.parentNode.parentNode.style.display="";}if(s=="ocultar"){strDescripcion.parentNode.parentNode.style.display="none";strPrecepcion.parentNode.parentNode.style.display="none";}if(s=="limpiar"){strDescripcion.value="";strPrecepcion.value="";}}function newCC(){status_Fields_Dpto("mostrar");document.getElementById("DP_NUEVACC").parentNode.parentNode.style.display="none";document.getElementById("DP_BORRARCC").parentNode.parentNode.style.display="none";document.getElementById("DP_GUARDARCC").parentNode.parentNode.style.display="";document.getElementById("DP_CANCELARCC").parentNode.parentNode.style.display="";}function delCC(){var grid=jQuery("#DP_GRID_CUENTAS_CONT");if(grid.getGridParam("selrow")!=null){var id=grid.getGridParam("selrow");var lstRow=grid.getRowData(id);var CCId=lstRow.DPG_DEC_ID;if(confirm("Atención: Confirma que desea eliminar la dirección")){grid.delRowData(grid.getGridParam("selrow"));deleteCC(CCId);}else{alert("Selecciona un registro el la tabla");}}}function deleteCC(CCId){var strPost="";strPost+="&CCId="+CCId;strPost+="&DP_ID="+document.getElementById("DP_ID").value;$.ajax({type:"POST",data:strPost,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"html",url:"ERP_DEPARTAMENTOS.jsp?ID=3",success:function(datos){alert("Cuenta Contable eliminada...");$("#dialogWait").dialog("close");},error:function(objeto,quepaso,otroobj){alert(":pto:"+objeto+" "+quepaso+" "+otroobj);}});}function saveCC(){if(document.getElementById("DP_ID").value==""||document.getElementById("DP_ID").value=="0"){alert("ATENCIÓN: Primero debes guardar el departamento para asignarle mas direcciones de entrega.");}else{var strPost="";if(validaCC()!=0){strPost+="&DP_ID="+document.getElementById("DP_ID").value;strPost+="&Descripcion="+document.getElementById("DP_DESC_CONTA_CUENTA").value;strPost+="&Percepcion="+document.getElementById("DP_PERC_ID").value;$.ajax({type:"POST",data:strPost,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"html",url:"ERP_DEPARTAMENTOS.jsp?ID=2",success:function(datos){alert("Alta Exitosa!");LoadCC(document.getElementById("DP_ID").value);status_Fields_Dpto("ocultar");cancelCC();$("#dialogWait").dialog("close");},error:function(objeto,quepaso,otroobj){alert(":pto:"+objeto+" "+quepaso+" "+otroobj);}});}}}function validaCC(){var strDescripcion=document.getElementById("DP_DESC_CONTA_CUENTA").value;var strPrecepcion=document.getElementById("DP_PERC_ID").value;if(strDescripcion==""){alert("Atención: Captura la descripción");strDescripcion.focus();return 0;}if(strPrecepcion==""){alert("Atención: Captura la percepción");strPrecepcion.focus();return 0;}return 1;}function cancelCC(){status_Fields_Dpto("ocultar");document.getElementById("DP_GUARDARCC").parentNode.parentNode.style.display="none";document.getElementById("DP_CANCELARCC").parentNode.parentNode.style.display="none";document.getElementById("DP_NUEVACC").parentNode.parentNode.style.display="";document.getElementById("DP_BORRARCC").parentNode.parentNode.style.display="";status_Fields_Dpto("limpiar");}function tabShowCC(event,ui){var idx=0;if(document.getElementById("DP_ID")!=null){idx=document.getElementById("DP_ID").value;}if(ui.newTab.index()==1){document.getElementById("DP_GUARDARCC").parentNode.parentNode.style.display="block";document.getElementById("DP_CANCELARCC").parentNode.parentNode.style.display="none";LoadCC(idx);}}function LoadCC(idx){var strPost="";strPost+="&DP_ID="+idx;$("#dialogWait").dialog("open");$.ajax({type:"POST",data:strPost,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_DEPARTAMENTOS.jsp?ID=1",success:function(datos){jQuery("#DP_GRID_CUENTAS_CONT").clearGridData();var objsc=datos.getElementsByTagName("CuentasContables")[0];var lstProds=objsc.getElementsByTagName("CuentaContable");var monto=0;for(var i=0;i<lstProds.length;i++){var obj=lstProds[i];var datarow={DPG_DEC_ID:obj.getAttribute("Id"),DPG_DESC_CONTA_CUENTA:obj.getAttribute("Descripcion"),DPG_PERC_ID:obj.getAttribute("Percecion")};jQuery("#DP_GRID_CUENTAS_CONT").addRowData(i,datarow,"last");}$("#dialogWait").dialog("close");},error:function(){jQuery("#DP_GRID_CUENTAS_CONT").clearGridData();alert("No hay productos con esas caracteristicas");$("#dialogWait").dialog("close");}});}function ObtienePorcentajesDep(obj1){$("#dialogWait").dialog("open");if(obj1==1){if(document.getElementById("DP_USAR_BONO_ASIS1").checked==true){document.getElementById("DP_ASISTENCIA").parentNode.parentNode.style.display="none";document.getElementById("DP_ASISTENCIA").value=0;}else{document.getElementById("DP_ASISTENCIA").parentNode.parentNode.style.display="";}}if(obj1==2){if(document.getElementById("DP_USAR_BONO_PROD1").checked==true){document.getElementById("DP_PRODUCTIVIDAD").parentNode.parentNode.style.display="none";document.getElementById("DP_PRODUCTIVIDAD").value=0;}else{document.getElementById("DP_PRODUCTIVIDAD").parentNode.parentNode.style.display="";}}if(obj1==3){if(document.getElementById("DP_USAR_BONO_PUNT1").checked==true){document.getElementById("DP_PUNTUALIDAD").parentNode.parentNode.style.display="none";document.getElementById("DP_PUNTUALIDAD").value=0;}else{document.getElementById("DP_PUNTUALIDAD").parentNode.parentNode.style.display="";}}$("#dialogWait").dialog("close");}function ModiPorcentajesDep(){$("#dialogWait").dialog("open");if(document.getElementById("DP_USAR_BONO_ASIS1").checked==true){document.getElementById("DP_ASISTENCIA").parentNode.parentNode.style.display="none";document.getElementById("DP_ASISTENCIA").value=0;}else{document.getElementById("DP_ASISTENCIA").parentNode.parentNode.style.display="";}if(document.getElementById("DP_USAR_BONO_PROD1").checked==true){document.getElementById("DP_PRODUCTIVIDAD").parentNode.parentNode.style.display="none";document.getElementById("DP_PRODUCTIVIDAD").value=0;}else{document.getElementById("DP_PRODUCTIVIDAD").parentNode.parentNode.style.display="";}if(document.getElementById("DP_USAR_BONO_PUNT1").checked==true){document.getElementById("DP_PUNTUALIDAD").parentNode.parentNode.style.display="none";document.getElementById("DP_PUNTUALIDAD").value=0;}else{document.getElementById("DP_PUNTUALIDAD").parentNode.parentNode.style.display="";}$("#dialogWait").dialog("close");}