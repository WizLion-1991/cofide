function rhh_retencion_captura(){}function initRetenciones(){doMakeFolioRetenciones();}function initModRetenciones(){var bolEsDividendo=document.getElementById("RET_ES_DIVIDENDO1").checked;if(bolEsDividendo){document.getElementById("RET_CLAVTIPDIVOUTIL").style.display="";document.getElementById("RET_MONTOISR_ACREDIRETMEXICO").style.display="";document.getElementById("RET_MONTOISR_ACREDIRETEXTRANJ").style.display="";document.getElementById("RET_MONTRETEXTDIVIEXTRA").style.display="";document.getElementById("RET_TIPOSOCDISTDIV").style.display="";document.getElementById("RET_MONISR_ACREDNACIO").style.display="";document.getElementById("RET_MONTDIVACUNNACIO").style.display="";document.getElementById("RET_MONTDIVACUNEXTRANJ").style.display="";document.getElementById("RET_PORPORCREMNET").style.display="";}else{document.getElementById("RET_CLAVTIPDIVOUTIL").style.display="none";document.getElementById("RET_MONTOISR_ACREDIRETMEXICO").style.display="none";document.getElementById("RET_MONTOISR_ACREDIRETEXTRANJ").style.display="none";document.getElementById("RET_MONTRETEXTDIVIEXTRA").style.display="none";document.getElementById("RET_TIPOSOCDISTDIV").style.display="none";document.getElementById("RET_MONISR_ACREDNACIO").style.display="none";document.getElementById("RET_MONTDIVACUNNACIO").style.display="none";document.getElementById("RET_MONTDIVACUNEXTRANJ").style.display="none";document.getElementById("RET_PORPORCREMNET").style.display="none";}}function ImprimirReciboRetencionCaptura(){var grid=jQuery("#CAPTURA");var id=grid.getGridParam("selrow");var lstRow=grid.getRowData(id);if(grid.getGridParam("selrow")!=null){var folio=lstRow.RET_FOLIOINT;var sc_id=lstRow.SC_ID;var emp_id=lstRow.EMP_ID;Abrir_Link("JasperReport?REP_ID=70&boton_1=PDF&folio_ini="+folio+"&folio_fin="+folio+"&sc_id="+sc_id+"&emp_id="+emp_id,"_reporte",500,600,0,0);}else{alert("Selecciona un registro de la tabla");}}function doMakeFolioRetenciones(){$("#dialogWait").dialog("open");var strPost="";$.ajax({type:"POST",data:strPost,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"html",url:"ERP_Retenciones.jsp?id=6",success:function(datos){document.getElementById("RET_FOLIOINT").value=trim(datos);document.getElementById("RET_CONSECUTIVO").value=trim(datos);$("#dialogWait").dialog("close");},error:function(objeto,quepaso,otroobj){alert(":Obten folio siguiente:"+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});}function MuestraRetenciones(){var intIdRetencion=document.getElementById("RET_CVERETENC").value;if(intIdRetencion!=""){var strPost="";strPost+="&intIdRetencion="+intIdRetencion;$.ajax({type:"POST",data:strPost,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_Retenciones.jsp?id=4",success:function(datos){var objsc=datos.getElementsByTagName("cat_reten")[0];if(objsc!=null){var lstProds=objsc.getElementsByTagName("cat_reten");for(var i=0;i<lstProds.length;i++){var obj=lstProds[i];document.getElementById("RET_DESCRETENC").value=obj.getAttribute("RET_CONCEPTO");}}else{document.getElementById("RET_CVERETENC").value="";document.getElementById("RET_DESCRETENC").value="";alert("La retencion no existe");$("#dialogWait").dialog("close");}$("#dialogWait").dialog("close");},error:function(){alert("No hay retenciones con esas caracteristicas");$("#dialogWait").dialog("close");}});}}function MuestraEmpleado(){var intEMP_NUM=document.getElementById("EMP_NUM").value;var intEMP_ID=document.getElementById("EMP_ID").value;if(intEMP_NUM!=""){var strPost="";strPost+="&intEMP_NUM="+intEMP_NUM;strPost+="&intEMP_ID="+intEMP_ID;$.ajax({type:"POST",data:strPost,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_Retenciones.jsp?id=5",success:function(datos){var objsc=datos.getElementsByTagName("empleado")[0];if(objsc!=null){var lstProds=objsc.getElementsByTagName("empleado");for(var i=0;i<lstProds.length;i++){var obj=lstProds[i];document.getElementById("RET_RFCRECEP").value=obj.getAttribute("RET_RFCRECEP");document.getElementById("RET_NOMDENRAZSOCR").value=obj.getAttribute("RET_NOMDENRAZSOCR");document.getElementById("RET_CURPR").value=obj.getAttribute("RET_CURPR");}}else{document.getElementById("EMP_NUM").value="";document.getElementById("RET_RFCRECEP").value="";document.getElementById("RET_NOMDENRAZSOCR").value="";document.getElementById("RET_CURPR").value="";alert("El empleado no existe");$("#dialogWait").dialog("close");}$("#dialogWait").dialog("close");},error:function(){alert("No hay empleados con esas caracteristicas");$("#dialogWait").dialog("close");}});}}function OpnDiagEmplea1(){OpnOpt("rhh_emplea","grid","dialogCte",false,false);}function OpenDialogRetenciones(){OpnOpt("CATAL_RETEN","grid","dialogView",false,false);}function MuestraDividendo(){var bolEsDividendo=document.getElementById("RET_ES_DIVIDENDO1").checked;if(bolEsDividendo){document.getElementById("RET_CLAVTIPDIVOUTIL").style.display="";document.getElementById("RET_MONTOISR_ACREDIRETMEXICO").style.display="";document.getElementById("RET_MONTOISR_ACREDIRETEXTRANJ").style.display="";document.getElementById("RET_MONTRETEXTDIVIEXTRA").style.display="";document.getElementById("RET_TIPOSOCDISTDIV").style.display="";document.getElementById("RET_MONISR_ACREDNACIO").style.display="";document.getElementById("RET_MONTDIVACUNNACIO").style.display="";document.getElementById("RET_MONTDIVACUNEXTRANJ").style.display="";document.getElementById("RET_PORPORCREMNET").style.display="";}else{document.getElementById("RET_CLAVTIPDIVOUTIL").style.display="none";document.getElementById("RET_MONTOISR_ACREDIRETMEXICO").style.display="none";document.getElementById("RET_MONTOISR_ACREDIRETEXTRANJ").style.display="none";document.getElementById("RET_MONTRETEXTDIVIEXTRA").style.display="none";document.getElementById("RET_TIPOSOCDISTDIV").style.display="none";document.getElementById("RET_MONISR_ACREDNACIO").style.display="none";document.getElementById("RET_MONTDIVACUNNACIO").style.display="none";document.getElementById("RET_MONTDIVACUNEXTRANJ").style.display="none";document.getElementById("RET_PORPORCREMNET").style.display="none";}}function ImprimirReciboRetencionXml(){var grid=jQuery("#CAPTURA");var id=grid.getGridParam("selrow");var lstRow=grid.getRowData(id);if(grid.getGridParam("selrow")!=null){var intIdRetencion=lstRow.RET_ID;var strHtml='<form action="ERP_XML_Download.jsp" method="post" target="_blank" id="formSend">';strHtml+=CreaHidden("RET_ID",intIdRetencion);strHtml+="</form>";document.getElementById("formHidden").innerHTML=strHtml;document.getElementById("formSend").submit();}else{alert("Selecciona un registro de la tabla");}}