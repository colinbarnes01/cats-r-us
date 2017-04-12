<%@page contentType="application/json" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.DbConn"%> 
<%@page language="java" import="view.ProductView"%>
<%@page language="java" import="model.product.ProductStringData"%>
<%@page language="java" import="com.google.gson.*" %>

<%
    /*  http://stackoverflow.com/questions/477816/what-is-the-correct-json-content-type 
     The MIME media type for JSON text is application/json. The default encoding is UTF-8. (Source: RFC 4627).
     */

    Gson gson = new Gson();

    DbConn dbc = new DbConn();
    String id = request.getParameter("id");

    //findPersonById will check if id is null or not...
    System.out.println("in productJson with product id: " + id);
    ProductStringData product = ProductView.findProductById(dbc, id);
    System.out.println("in productJson with product: " + product);
    out.print(gson.toJson(product).trim());

    // PREVENT DB connection leaks:
    dbc.close(); // EVERY code path that opens a db connection, must also close it.
%>