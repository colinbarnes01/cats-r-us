package model.product;

import model.product.ProductStringData;
import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class ProductStringDataList
{

    public String dbError = "";
    private ArrayList<ProductStringData> recordList = new ArrayList();

    public ProductStringDataList()
    {
    }

    // overloaded constructor populates the list (and possibly the dbError)
    public ProductStringDataList(String productNameStartsWith, DbConn dbc)
    {
        ProductStringData sd = new ProductStringData();
        System.out.println("Searching for countries that start with " + productNameStartsWith);
        try
        {
            String sql = "SELECT image_url, product_name, product_id, price, description, website_url FROM product "
                    + " WHERE product_name LIKE ? ORDER BY product_name";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, productNameStartsWith + "%");
            ResultSet results = stmt.executeQuery();

            while (results.next())
            {
                try
                {
                    sd = new ProductStringData();
                    sd.extractProductStringsFromResultSet(results);
                    this.recordList.add(sd);
                } catch (Exception e)
                {
                    sd.errorMsg = "Record Level Error in model.product.StringDataList Constructor: " + e.getMessage();
                    this.recordList.add(sd);
                }
            }
        } catch (Exception e)
        {
            this.dbError = "List Level Error in model.product.StringDataList Constructor: " + e.getMessage();
        }
    }

    public void add(ProductStringData stringData)
    {
        this.recordList.add(stringData);
    }
}
