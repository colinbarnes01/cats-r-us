<%-- 
    Document   : logon
    Created on : Apr 14, 2017, 1:04:55 PM
    Author     : Colin
--%>

<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.user.*" %>
<%@page language="java" import="java.util.ArrayList" %>

<%@page language="java" import="com.google.gson.*" %>

<%
    String email = "";
    String password = "";
    String emailErrorMsg = ""; // be optimistic
    String passwordErrorMsg = ""; // dont show an error upon 1st rendering
    String connErrorMsg = ""; //error message for connection failure
    String welcomeMsg = ""; //message to welcome user if logon successful
    String msg = ""; // this is an overall messsage (beyond field level validation)
    boolean success = false; //variable to state whether log on was successful or not

    UserStringData loggedOnUser = new UserStringData();

    if (request.getParameter("email") != null)
    {
        email = request.getParameter("email"); //extract user input from URL
        System.out.println("Email: " + email);
        if (email.length() == 0)
        {
            emailErrorMsg = "Email is a required field";
        }
        password = request.getParameter("password"); //extract user input from URL
        System.out.println("Password " + password);
        if (password.length() == 0)
        {
            passwordErrorMsg = "Password is a required field";
        }

        DbConn dbc = new DbConn(); //get database connection
        if (connErrorMsg.length() == 0)
        { // no error message so database connection OK
            System.out.println("about to call logon java function");
            loggedOnUser = UserDBWrapper.logon(email, password, dbc);
            System.out.println("loggedOnUser: " + loggedOnUser);

            if (loggedOnUser != null)
            {
                session.setAttribute("user", loggedOnUser);
                success = true;
            }
            if (success && (loggedOnUser.userName.length() > 0))
            {
                welcomeMsg = "Log In Successful, Welcome " + loggedOnUser.userName + "!";
            } else
            {
                welcomeMsg = "Log In Failed. Username and Email invalid.";
            }
        }
        dbc.close();
        Gson gson = new Gson();
        out.print(gson.toJson(loggedOnUser).trim());
    } else
    {
        Gson gson = new Gson();
        out.print(gson.toJson(loggedOnUser).trim());
    }
%>