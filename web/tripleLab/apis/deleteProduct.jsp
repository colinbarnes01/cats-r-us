<%@page contentType="application/json" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.DbConn"%> 
<%@page language="java" import="model.product.*"%> 

<%@page language="java" import="com.google.gson.*" %>

<%
    Gson gson = new Gson();
    DbConn dbc = new DbConn();
    
    String deleteId = request.getParameter("id");
    System.out.println("ready to delete product "+deleteId);
    
    // just so we have an actual pojo (plain old java object) to convert to json. 
    ProductStringData product = new ProductStringData();
    
    product.errorMsg = "";

    if (deleteId == null) {
        product.errorMsg = "Cannot delete -- no id was received";
    } else {
        product.errorMsg = dbc.getErr();
        if (product.errorMsg.length() == 0) { // means db connection is ok
            //System.out.println("productDelete.jsp ready to delete id "+deleteId);
            product.errorMsg = ProductDBWrapper.deleteById(deleteId, dbc);
        }
    }
    System.out.println("result of delete is: "+product.errorMsg+"(empty string means worked)");
    out.print(gson.toJson(product));
    dbc.close();
%>