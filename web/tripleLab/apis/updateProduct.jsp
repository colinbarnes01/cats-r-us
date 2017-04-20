<%@page contentType="application/json" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.DbConn"%> 
<%@page language="java" import="model.product.*"%>
<%@page language="java" import="com.google.gson.*" %>

<%@include file="checkLogOn_product.jsp"%>
<%
    Gson gson = new Gson();

    // Create an empty ProductStringData object to hold all the possible field level error messages.
    ProductStringData errorMsgs = new ProductStringData();

    // Extract from the URL, the json-ized version of record they want to update in the database. 
    String jsonUpdateData = request.getParameter("jsonData");

    // Will need a database connection object.
    DbConn dbc = new DbConn();

    if (jsonUpdateData == null) {
        errorMsgs.errorMsg = "Cannot update -- no data was received";
    } else {

        errorMsgs.errorMsg = dbc.getErr();
        if (errorMsgs.errorMsg.length() == 0) { // means db connection is ok

            System.out.println("personUpdate.jsp ready to update from this data: "
                    + jsonUpdateData);

            // Convert the json format (using the GSON object) to a POJO (plain old java object)
            ProductStringData updateData = gson.fromJson(jsonUpdateData, ProductStringData.class);

            // this method validates each field (putting any validation messages into 
            // errorMsgs (ProductStringData object). 
            errorMsgs = ProductDBWrapper.update(updateData, dbc); // this is the form level message 
            
            System.out.println("personUpdate.jsp found these errors: "
                    + jsonUpdateData);
        }
    }
    out.print(gson.toJson(errorMsgs).trim());

    // prevent database connection leaks.
    dbc.close();
%>