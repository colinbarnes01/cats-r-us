<%-- 
    Document   : webApi
    Created on : Mar 3, 2017, 1:05:27 PM
    Author     : Colin Barnes
--%>
<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.product.*" %>
<%@page language="java" import="java.util.ArrayList" %>

<%@page language="java" import="com.google.gson.*" %>

<%

    StringDataList list = new StringDataList();

    DbConn dbc = new DbConn();
    list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

    if (list.dbError.length() == 0) { // got open connection 

        String productNameStartsWith = request.getParameter("q");
        if (productNameStartsWith == null) {
            productNameStartsWith = "";
        }

        // productFlagList is an object with an array of product objects inside, 
        // plus a possible dbError.
        System.out.println("jsp page ready to search for product with " + productNameStartsWith);
        list = new StringDataList(productNameStartsWith, dbc);
    } 

    // PREVENT DB connection leaks:
    dbc.close(); // EVERY code path that opens a db connection, must also close it.

    Gson gson = new Gson();
    out.print(gson.toJson(list).trim()); 
%>