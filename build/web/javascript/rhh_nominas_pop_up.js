function rhh_nominas_pop_up(){}function OpnDiagEmplea_DescPrest(){OpnOpt("rhh_emplea","grid","dialogCte",false,false);}function OnBlurEmplea_DescPrest(){var intEMP_NUM=document.getElementById("EMP_NUM").value;var intEMP_ID=document.getElementById("EMP_ID").value;if(intEMP_NUM!=""){var strPost="";strPost+="&intEMP_NUM="+intEMP_NUM;strPost+="&intEMP_ID="+intEMP_ID;$.ajax({type:"POST",data:strPost,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_Retenciones.jsp?id=5",success:function(datos){var objsc=datos.getElementsByTagName("empleado")[0];if(objsc!=null){var lstProds=objsc.getElementsByTagName("empleado");for(var i=0;i<lstProds.length;i++){var obj=lstProds[i];document.getElementById("EMP_NOMBRE").value=obj.getAttribute("RET_NOMDENRAZSOCR");}}else{document.getElementById("EMP_NUM").value="";document.getElementById("EMP_NOMBRE").value="";alert("El empleado no existe");$("#dialogWait").dialog("close");}$("#dialogWait").dialog("close");},error:function(){alert("No hay empleados con esas caracteristicas");$("#dialogWait").dialog("close");}});}}function OpnDiagEmplea_RetFondAhorro(){OpnOpt("rhh_emplea","grid","dialogCte",false,false);}function OnBlurEmplea_RetFondAhorro(){var intEMP_NUM=document.getElementById("EMP_NUM").value;var intEMP_ID=document.getElementById("EMP_ID").value;if(intEMP_NUM!=""){var strPost="";strPost+="&intEMP_NUM="+intEMP_NUM;strPost+="&intEMP_ID="+intEMP_ID;$.ajax({type:"POST",data:strPost,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_Retenciones.jsp?id=5",success:function(datos){var objsc=datos.getElementsByTagName("empleado")[0];if(objsc!=null){var lstProds=objsc.getElementsByTagName("empleado");for(var i=0;i<lstProds.length;i++){var obj=lstProds[i];document.getElementById("EMP_NOMBRE").value=obj.getAttribute("RET_NOMDENRAZSOCR");}}else{document.getElementById("EMP_NUM").value="";document.getElementById("EMP_NOMBRE").value="";alert("El empleado no existe");$("#dialogWait").dialog("close");}$("#dialogWait").dialog("close");},error:function(){alert("No hay empleados con esas caracteristicas");$("#dialogWait").dialog("close");}});}}function OpnDiagEmplea_OtrosDesc(){OpnOpt("rhh_emplea","grid","dialogCte",false,false);}function OnBlurEmplea_OtrosDesc(){var intEMP_NUM=document.getElementById("EMP_NUM").value;var intEMP_ID=document.getElementById("EMP_ID").value;if(intEMP_NUM!=""){var strPost="";strPost+="&intEMP_NUM="+intEMP_NUM;strPost+="&intEMP_ID="+intEMP_ID;$.ajax({type:"POST",data:strPost,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_Retenciones.jsp?id=5",success:function(datos){var objsc=datos.getElementsByTagName("empleado")[0];if(objsc!=null){var lstProds=objsc.getElementsByTagName("empleado");for(var i=0;i<lstProds.length;i++){var obj=lstProds[i];document.getElementById("EMP_NOMBRE").value=obj.getAttribute("RET_NOMDENRAZSOCR");}}else{document.getElementById("EMP_NUM").value="";document.getElementById("EMP_NOMBRE").value="";alert("El empleado no existe");$("#dialogWait").dialog("close");}$("#dialogWait").dialog("close");},error:function(){alert("No hay empleados con esas caracteristicas");$("#dialogWait").dialog("close");}});}}function OpnDiagEmplea_DescInfonacot(){OpnOpt("rhh_emplea","grid","dialogCte",false,false);}function OnBlurEmplea_DescInfonacot(){var intEMP_NUM=document.getElementById("EMP_NUM").value;var intEMP_ID=document.getElementById("EMP_ID").value;if(intEMP_NUM!=""){var strPost="";strPost+="&intEMP_NUM="+intEMP_NUM;strPost+="&intEMP_ID="+intEMP_ID;$.ajax({type:"POST",data:strPost,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_Retenciones.jsp?id=5",success:function(datos){var objsc=datos.getElementsByTagName("empleado")[0];if(objsc!=null){var lstProds=objsc.getElementsByTagName("empleado");for(var i=0;i<lstProds.length;i++){var obj=lstProds[i];document.getElementById("EMP_NOMBRE").value=obj.getAttribute("RET_NOMDENRAZSOCR");}}else{document.getElementById("EMP_NUM").value="";document.getElementById("EMP_NOMBRE").value="";alert("El empleado no existe");$("#dialogWait").dialog("close");}$("#dialogWait").dialog("close");},error:function(){alert("No hay empleados con esas caracteristicas");$("#dialogWait").dialog("close");}});}}