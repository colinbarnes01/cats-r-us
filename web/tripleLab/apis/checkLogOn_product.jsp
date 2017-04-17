<%-- 
    Document   : checkLogOn
    Created on : Apr 17, 2017, 5:20:03 PM
    Author     : Colin
--%>



<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.product.*" %>
<%@page language="java" import="java.util.ArrayList" %>
<%@page language="java" import="com.google.gson.*" %>

<%
    String userName = (String) session.getAttribute("userName");
    if (userName == null)
    {
        Gson gson = new Gson();
        System.out.println("Inside of null login in insertProduct");
        ProductStringData psd = new ProductStringData();
        psd.errorMsg = "Error: please log in to do that.";
        out.print(gson.toJson(psd).trim());
        return;
    }
%>