function vta_ajustacobros(){}var lastselBco=0;var itemIdCob=0;function IniAjustaCobros(){$("#dialogWait").dialog("open");myLayout.close("west");myLayout.close("east");myLayout.close("south");myLayout.close("north");var strHtml="<ul>"+getMenuItem("GuardaAjustaPago();","Guardar Cobro","images/ptovta/CircleSave.png")+getMenuItem("SalirAjustaCob();","Salir","images/ptovta/exitBig.png")+"</ul>";document.getElementById("TOOLBAR").innerHTML=strHtml;document.getElementById("btn1").style.display="none";itemIdCob=0;$("#dialogWait").dialog("close");}function CargaAjustaCobro(){var strCte=d.getElementById("COB_CTE").value;var strFecha1=d.getElementById("COB_FECHAS1").value;var strFecha2=d.getElementById("COB_FECHAS2").value;var strMoneda=d.getElementById("COB_MONEDA").value;itemIdCob=0;ValidaClean("COB_CTE");if(strCte==0){ValidaShow("COB_CTE","NECESITA SELECCIONAR UN CLIENTE");}else{$("#dialogWait").dialog("open");resetCobroAjuste(false);$.ajax({type:"POST",data:"CT_ID="+strCte+"&TKT_FECHA1="+strFecha1+"&TKT_FECHA2="+strFecha2+"&TKT_MONEDA="+strMoneda,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_Cobros.jsp?id=16",success:function(datos){var objsc=datos.getElementsByTagName("tickets")[0];var lstTiks=objsc.getElementsByTagName("ticket");for(i=0;i<lstTiks.length;i++){var obj=lstTiks[i];if(obj.getAttribute("TKT_SALDO")>0){var dblPagos=obj.getAttribute("TKT_TOTAL")-obj.getAttribute("TKT_SALDO");var strFecha=obj.getAttribute("TKT_FECHA");strFecha=strFecha.substr(strFecha.length-2,strFecha.length)+"/"+strFecha.substr(4,2)+"/"+strFecha.substr(0,4);var datarow={COBD_ID:obj.getAttribute("TKT_ID"),COBD_FOLIO:obj.getAttribute("TKT_FOLIO"),COBD_FECHA:strFecha,COBD_TOTAL:obj.getAttribute("TKT_TOTAL"),COBD_PAGOS:dblPagos,COBD_SALDO:obj.getAttribute("TKT_SALDO"),COBD_TIPO:"TICKET",COBD_CTAS_IMPORTE:0,COBD_CTAS_IMP_CAMBIO:0,COBD_CTAS_MONEDA:0};itemIdCob++;jQuery("#COB_GRID1").addRowData(itemIdCob,datarow,"last");}}var objsc=datos.getElementsByTagName("facturas")[0];var lstTiks=objsc.getElementsByTagName("factura");for(i=0;i<lstTiks.length;i++){var obj=lstTiks[i];var dblPagos=obj.getAttribute("FAC_TOTAL")-obj.getAttribute("FAC_SALDO");var strFecha=obj.getAttribute("FAC_FECHA");strFecha=strFecha.substr(strFecha.length-2,strFecha.length)+"/"+strFecha.substr(4,2)+"/"+strFecha.substr(0,4);var datarow={COBD_ID:obj.getAttribute("FAC_ID"),COBD_FOLIO:obj.getAttribute("FAC_FOLIO"),COBD_FECHA:strFecha,COBD_TOTAL:obj.getAttribute("FAC_TOTAL"),COBD_PAGOS:dblPagos,COBD_SALDO:obj.getAttribute("FAC_SALDO"),COBD_TIPO:"FACTURA",COBD_CTAS_IMPORTE:0,COBD_CTAS_IMP_CAMBIO:0,COBD_CTAS_MONEDA:0};itemIdCob++;jQuery("#COB_GRID1").addRowData(itemIdCob,datarow,"last");}$("#dialogWait").dialog("close");},error:function(objeto,quepaso,otroobj){alert(":ptoExist:"+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});}}function RecalculoAjuste(){setTimeout(function(){var grid=jQuery("#COB_GRID1");var arr=grid.getDataIDs();var dblTotal=0;var dblNumero;var dblTasaCambio=1;var dblTotalAntes=0;for(var i=0;i<arr.length;i++){var idRow=arr[i];dblNumero=0;var lstRow=grid.getRowData(idRow);var dblTasaAPagar=1;if(document.getElementById(""+(i+1)+"_COBD_CTAS_IMPORTE")!=null){dblNumero=parseFloat(document.getElementById(""+(i+1)+"_COBD_CTAS_IMPORTE").value);var strOperacion="M";var dblImporte=parseFloat(lstRow.COBD_SALDO)*dblTasaAPagar;document.getElementById(""+(i+1)+"_COBD_CTAS_IMPORTE").value=dblImporte;}else{dblNumero=parseFloat(lstRow.COBD_CTAS_IMPORTE)*dblTasaAPagar;}dblTotal+=dblNumero*(dblTasaCambio);dblTotalAntes+=dblNumero;}d.getElementById("COB_TOTAL").value=FormatNumber(dblTotalAntes*dblTasaCambio,2,true);d.getElementById("COB_TOTAL2").value=FormatNumber(dblTotalAntes,2,true);},300);}function ClickFueraGridAjustaCobro(){var grid=jQuery("#COB_GRID1");var lstRow=grid.getRowData(lastselBco);var dblMonedaAPagar=1;var dato=document.getElementById((lastselBco)+"_COBD_CTAS_IMPORTE").value;lstRow.COBD_CTAS_IMPORTE=dato;lstRow.COBD_CTAS_IMP_CAMBIO=parseFloat(dato)*(dblMonedaAPagar);grid.setRowData(lastselBco,lstRow);grid.saveRow(lastselBco);RecalculoAjuste();lastselBco=0;}function editGridAjusteCobros(e){if(e.originalEvent.keyCode==13){var dblTasaCambio=1;var grid=jQuery("#COB_GRID1");var lstRow=grid.getRowData(lastselBco);var dato=0;if(document.getElementById((lastselBco)+"_COBD_CTAS_IMPORTE")!=null){dato=document.getElementById((lastselBco)+"_COBD_CTAS_IMPORTE").value;}else{dato=lstRow.COBD_CTAS_IMPORTE;}if((parseFloat(dato)*dblTasaCambio)<=parseFloat(lstRow.COBD_SALDO)){lstRow.COBD_CTAS_IMPORTE=dato;lstRow.COBD_CTAS_IMP_CAMBIO=parseFloat(dato)*(dblTasaCambio);grid.setRowData(lastselBco,lstRow);}else{lstRow.COBD_CTAS_IMPORTE=lstRow.COBD_CTAS_SALDO*parseFloat(document.getElementById("TASA_CAMBIO_PAGO").value);lstRow.COBD_CTAS_IMP_CAMBIO=parseFloat(lstRow.COBD_CTAS_IMPORTE)*(dblTasaCambio);grid.setRowData(lastselBco,lstRow);alert("No puede pagar mas de lo que debe");}grid.saveRow(lastselBco);RecalculoAjuste();lastselBco=0;}}function editFilaAjusteCobro(id){var grid=jQuery("#COB_GRID1");if(id!=lastselBco){grid.saveRow(lastselBco);grid.editRow(id,false);lastselBco=id;}}function selAjusteRow(rowid,status){editFilaAjusteCobro(rowid);RecalculoAjuste();}function resetCobroAjuste(bolUpdateGrid){d.getElementById("COB_TOTAL").value=0;if(bolUpdateGrid){CargaAjustaCobro();}else{jQuery("#COB_GRID1").clearGridData();}}function GuardaAjustaPago(){$("#dialogWait").dialog("open");var dblDev=0;var dblPagado=0;var dblxCobrar=0;var strPOST="";var intIdOper=3;var grid=jQuery("#COB_GRID1");var arr=grid.getDataIDs();var intContaPays=0;for(var i=0;i<arr.length;i++){var id=arr[i];var lstRow=grid.getRowData(id);if(lstRow.COBD_CTAS_IMPORTE>0){intContaPays++;}}dblDev=0;dblPagado=0-dblDev;dblxCobrar=parseFloat(d.getElementById("COB_TOTAL").value);if(dblxCobrar>0){var strMoneda=d.getElementById("COB_MONEDA").value;strPOST+="FECHA="+(d.getElementById("COB_FECHA").value);strPOST+="&NOTAS="+encodeURIComponent(d.getElementById("COB_CONCEPTO").value);strPOST+="&MONEDA="+strMoneda;strPOST+="&TASAPESO=1";strPOST+="&MONTOPAGOTOTAL="+dblPagado;strPOST+="&SIN_BANCO=1";for(var i=0;i<arr.length;i++){var id=arr[i];var lstRow=grid.getRowData(id);if(lstRow.COBD_CTAS_IMPORTE>0){strPOST+="&idTrx="+lstRow.COBD_ID;strPOST+="&TipoDoc="+encodeURIComponent((lstRow.COBD_TIPO=="FACTURA")?1:2);strPOST+="&MONTOPAGO="+lstRow.COBD_CTAS_IMPORTE;}}var strNomForm="COBROSMAS";var strNomField="MCM_ID";strPOST+="&COUNT_PAGOS=5";strPOST+="&MCD_MONEDA1="+strMoneda;strPOST+="&MCD_FOLIO1=";strPOST+="&MCD_FORMAPAGO1=EFECTIVO";strPOST+="&MCD_NOCHEQUE1=";strPOST+="&MCD_BANCO1=";strPOST+="&MCD_NOTARJETA1=";strPOST+="&MCD_TIPOTARJETA1=";strPOST+="&MCD_IMPORTE1="+0;strPOST+="&MCD_TASAPESO1=1";strPOST+="&MCD_CAMBIO1="+0;strPOST+="&MCD_MONEDA2="+strMoneda;strPOST+="&MCD_FOLIO2=";strPOST+="&MCD_FORMAPAGO2=CHEQUE";strPOST+="&MCD_NOCHEQUE2="+0;strPOST+="&MCD_BANCO2="+0;strPOST+="&MCD_NOTARJETA2=";strPOST+="&MCD_TIPOTARJETA2=";strPOST+="&MCD_IMPORTE2="+0;strPOST+="&MCD_TASAPESO2=1";strPOST+="&MCD_CAMBIO2=0";strPOST+="&MCD_MONEDA3="+strMoneda;strPOST+="&MCD_FOLIO3=";strPOST+="&MCD_FORMAPAGO3=TCREDITO";strPOST+="&MCD_NOCHEQUE3=";strPOST+="&MCD_BANCO3=";strPOST+="&MCD_NOTARJETA3="+0;strPOST+="&MCD_TIPOTARJETA3="+0;strPOST+="&MCD_IMPORTE3="+0;strPOST+="&MCD_TASAPESO3=1";strPOST+="&MCD_CAMBIO3=0";strPOST+="&MCD_MONEDA4="+strMoneda;strPOST+="&MCD_FOLIO4=";strPOST+="&MCD_FORMAPAGO4=SALDOFAVOR";strPOST+="&MCD_NOCHEQUE4=";strPOST+="&MCD_BANCO4=";strPOST+="&MCD_NOTARJETA4=";strPOST+="&MCD_TIPOTARJETA4=";strPOST+="&MCD_IMPORTE4="+0;strPOST+="&MCD_TASAPESO4=1";strPOST+="&MCD_CAMBIO4=0";strPOST+="&MCD_MONEDA5="+strMoneda;strPOST+="&MCD_FOLIO5=";strPOST+="&MCD_FORMAPAGO5=TRANSFERENCIA BANCARIA";strPOST+="&MCD_NOCHEQUE5=";strPOST+="&MCD_BANCO5="+0;strPOST+="&MCD_NOTARJETA5="+0;strPOST+="&MCD_TIPOTARJETA5=";strPOST+="&MCD_IMPORTE5="+0;strPOST+="&MCD_TASAPESO5=1";strPOST+="&MCD_CAMBIO5=0";$.ajax({type:"POST",data:encodeURI(strPOST),scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"html",url:"Cobros.do?id="+intIdOper,success:function(dato){dato=trim(dato);
if(Left(dato,3)=="OK."){openFormat(strNomForm,"PDF",CreaHidden(strNomField,dato.replace("OK.","")));resetCobroAjustePago(true);LimpiarGridAjustaCobro();$("#dialogPagos").dialog("close");}else{alert(dato);}$("#dialogWait").dialog("close");},error:function(objeto,quepaso,otroobj){alert(":pto9:"+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});}else{alert(lstMsg[10]);$("#dialogWait").dialog("close");}}function LimpiarGridAjustaCobro(){itemIdCob=0;CargaAjustaCobro();}function OpnDiagCteCobAjuste(){OpnOpt("CLIENTES","grid","dialogCte",false,false);}function SalirAjustaCob(){myLayout.open("west");myLayout.open("east");myLayout.open("south");myLayout.open("north");var objMainFacPedi=objMap.getScreen("AJS_COBROC");objMainFacPedi.bolActivo=false;objMainFacPedi.bolMain=false;objMainFacPedi.bolInit=false;objMainFacPedi.idOperAct=0;document.getElementById("MainPanel").innerHTML="";}function resetCobroAjustePago(bolUpdateGrid){d.getElementById("COB_TOTAL").value=0;if(bolUpdateGrid){}else{jQuery("#COB_GRID1").clearGridData();}}