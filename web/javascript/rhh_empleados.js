function rhh_empleados(){}function initEmpleados(){if(document.getElementById("EMP_PENSION_ALIMENTICIA2").checked){document.getElementById("EMP_PENSIONA_IMPORTE").style.display="none";}}function dblClickEmpleado(id){var strNomMain=objMap.getNomMain();var grid=jQuery("#rhh_emplea");var lstVal=grid.getRowData(id);if(strNomMain=="rhh_emplea"){OpnEdit(document.getElementById("Ed"+strNomMain));}else{if(strNomMain=="NOM_VIEW1"){document.getElementById("VIEW_EMPLEADO").value=lstVal.EMP_NUM;$("#dialogCte").dialog("close");}else{if(strNomMain=="INCID"){document.getElementById("EMP_NUM").value=lstVal.EMP_NUM;document.getElementById("EMP_NOMBRE").value=lstVal.EMP_NOMBRE;$("#dialogCte").dialog("close");}else{if(strNomMain=="CAPTURA"){document.getElementById("EMP_NUM").value=lstVal.EMP_NUM;document.getElementById("RET_RFCRECEP").value=lstVal.EMP_RFC;document.getElementById("RET_NOMDENRAZSOCR").value=lstVal.EMP_NOMBRE;document.getElementById("RET_CURPR").value=lstVal.EMP_CURP;$("#dialogCte").dialog("close");}else{if(strNomMain=="DESC_PRESTA"){document.getElementById("EMP_NUM").value=lstVal.EMP_NUM;document.getElementById("EMP_NOMBRE").value=lstVal.EMP_NOMBRE;$("#dialogCte").dialog("close");}else{if(strNomMain=="RET_FOND_AHORRO"){document.getElementById("EMP_NUM").value=lstVal.EMP_NUM;document.getElementById("EMP_NOMBRE").value=lstVal.EMP_NOMBRE;$("#dialogCte").dialog("close");}else{if(strNomMain=="OTRO_DESC"){document.getElementById("EMP_NUM").value=lstVal.EMP_NUM;document.getElementById("EMP_NOMBRE").value=lstVal.EMP_NOMBRE;$("#dialogCte").dialog("close");}else{if(strNomMain=="DESC_INFONACOT"){document.getElementById("EMP_NUM").value=lstVal.EMP_NUM;document.getElementById("EMP_NOMBRE").value=lstVal.EMP_NOMBRE;$("#dialogCte").dialog("close");}else{if(strNomMain=="DESC_INFONAVIT"){document.getElementById("EMP_NUM").value=lstVal.EMP_NUM;document.getElementById("EMP_NOMBRE").value=lstVal.EMP_NOMBRE;$("#dialogCte").dialog("close");}}}}}}}}}}function tabShowEmpleados(event,ui){var index=ui.newTab.index();if(index===5){LoadGridBitacora();}}function LoadGridBitacora(){$("#dialogWait").dialog("open");itemIdCob=0;var strPost="";strPost+="&intIdEmp="+document.getElementById("EMP_NUM").value;$.ajax({type:"POST",data:strPost,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_Nominas.jsp?id=5",success:function(datos){jQuery("#BITACORA_GRID").clearGridData();var objsc=datos.getElementsByTagName("empleados")[0];var lstProds=objsc.getElementsByTagName("empleados_deta");for(var i=0;i<lstProds.length;i++){var obj=lstProds[i];var datarow={BIT_RHI_FECHA:obj.getAttribute("strFECHA"),BIT_RHI_USUARIO:obj.getAttribute("strUSUARIO"),BIT_RHI_TIPO_CAMBIO:obj.getAttribute("strTIPO_CAMBIO"),BIT_RHI_SALARIO_ANT:obj.getAttribute("strSALARIO_ANT"),BIT_RHI_TIPO_SALARIO_ANT:obj.getAttribute("strTIPO_SALARIO_ANT"),BIT_RHI_NUEVO_SALARIO:obj.getAttribute("strNUEVO_SALARIO"),BIT_RHI_TIPO_SALARIO_NVO:obj.getAttribute("strTIPO_SALARIO_NVO"),BIT_RHI_REGISTRO_PATRONAL_ANT:obj.getAttribute("strREGISTRO_PATRONAL_ANT"),BIT_RHI_NOTAS:obj.getAttribute("strNOTAS"),BIT_EMP_NUM:obj.getAttribute("strEMP_NUM")};itemIdCob++;jQuery("#BITACORA_GRID").addRowData(itemIdCob,datarow,"last");}$("#dialogWait").dialog("close");},error:function(){jQuery("#BITACORA_GRID").clearGridData();alert("No hay productos con esas caracteristicas");$("#dialogWait").dialog("close");}});}function pensiona(){if(document.getElementById("EMP_PENSION_ALIMENTICIA1").checked){document.getElementById("EMP_PENSIONA_IMPORTE").style.display="";}else{document.getElementById("EMP_PENSIONA_IMPORTE").style.display="none";}}