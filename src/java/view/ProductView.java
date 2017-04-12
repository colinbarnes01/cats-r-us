package view;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import dbUtils.*;
import model.product.*;

public class ProductView
{

    public static ProductStringDataList buildProductList(DbConn dbc)
    {

        ProductStringDataList productList = new ProductStringDataList();

        productList.dbError = dbc.getErr();
        if (productList.dbError.length() == 0)
        {

            String sql = "SELECT product_id, product_name, product_age, product_sex "
                    + "FROM sk_product ORDER BY product_name";

            try
            {
                PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
                ResultSet results = stmt.executeQuery();

                while (results.next())
                {
                    ProductStringData sd = new ProductStringData();
                    sd.extractProductStringsFromResultSet(results);
                    productList.add(sd);
                }
            } catch (Exception e)
            {
                productList.dbError = "SQL Excepption thrown in ProductView.BuildProductList(): " + e.getMessage();
                System.out.println("*****" + productList.dbError);
            }
        }
        return productList;
    }

    public static ProductStringData findProductById(DbConn dbc, String id)
    {
        System.out.println("inside findProductById with id: " + id);
        ProductStringData product = new ProductStringData();
        if (id == null)
        {
            product.errorMsg = "Cannot find product with null id.";
            return product;
        }

        product.errorMsg = dbc.getErr();
        if (product.errorMsg.length() == 0)
        {
            System.out.println("no dbcErr in findProductById");
            String sql = "SELECT product_id, image_url, product_name, price, description, website_url FROM product "
                    + " WHERE product_id = ?";

            try
            {
                PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
                stmt.setString(1, id);
                ResultSet results = stmt.executeQuery();

                if (results.next())
                {
                    product.extractProductStringsFromResultSet(results);
                }
            } catch (Exception e)
            {
                product.errorMsg = "SQL Exception thrown in ProductView.findProductById(): " + e.getMessage();
                System.out.println("*****" + product.errorMsg);
            }
        } else {
            System.out.println("dbc error found in findProductById: " + dbc.getErr());
        }
        return product;
    }

}
