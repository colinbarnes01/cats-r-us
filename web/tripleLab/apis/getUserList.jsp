<%-- 
    Document   : webApi
    Created on : Mar 3, 2017, 1:05:27 PM
    Author     : Colin Barnes
--%>
<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.user.*" %>
<%@page language="java" import="java.util.ArrayList" %>
<%@page language="java" import="com.google.gson.*" %>

<%

    UserStringDataList list = new UserStringDataList();

    DbConn dbc = new DbConn();
    list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

    if (list.dbError.length() == 0) { // got open connection 

        String userNameStartsWith = request.getParameter("q");
        if (userNameStartsWith == null) {
            userNameStartsWith = "";
        }

        // userFlagList is an object with an array of user objects inside, 
        // plus a possible dbError.
        System.out.println("jsp page ready to search for user with " + userNameStartsWith);
        list = new UserStringDataList(userNameStartsWith, dbc);
    } 

    // PREVENT DB connection leaks:
    dbc.close(); // EVERY code path that opens a db connection, must also close it.

    Gson gson = new Gson();
    out.print(gson.toJson(list).trim()); 
%>