<%-- 
    Document   : logOff
    Created on : Apr 17, 2017, 1:00:44 PM
    Author     : Colin
--%>

<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.user.*" %>
<%@page language="java" import="java.util.ArrayList" %>
<%@page language="java" import="com.google.gson.*" %>

<%
    System.out.println("About to log off with session userName: " + session.getAttribute("userName"));

    session.invalidate();

    HttpSession session2 = request.getSession(false);
    Gson gson = new Gson();
    UserStringData sd = new UserStringData();
    if (session2 == null || !request.isRequestedSessionIdValid())
    {
        sd.errorMsg = "Log off successful";
    } else
    {
        sd.errorMsg = "Log off not successful";
    }
    out.print(gson.toJson(sd).trim());
%>

