package model.product;

import model.product.StringData;
import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class StringDataList {

    public String dbError = "";
    private ArrayList<StringData> recordList = new ArrayList();

    // Default constructor just leaves the 2 data members initialized as above
    public StringDataList() {
    }

    // overloaded constructor populates the list (and possibly the dbError)
    public StringDataList(String productNameStartsWith, DbConn dbc) {

        StringData sd = new StringData();

        System.out.println("Searching for countries that start with " + productNameStartsWith);

        try {

            String sql = "SELECT image_url, product_name, product_id, price, description FROM product "
                    + " WHERE product_name LIKE ? ORDER BY product_name";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, productNameStartsWith + "%");
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                try {
                    sd = new StringData();
                    sd.productId = FormatUtils.formatInteger(results.getObject("product_id"));
                    sd.productName = FormatUtils.formatString(results.getObject("product_name"));
                    sd.imageUrl = FormatUtils.formatString(results.getObject("image_url"));
                    sd.price = FormatUtils.formatDollar(results.getObject("price"));
                    sd.description = FormatUtils.formatString(results.getObject("description"));
                    this.recordList.add(sd);
                } catch (Exception e) {
                    sd.errorMsg = "Record Level Error in model.product.StringDataList Constructor: " + e.getMessage();
                    this.recordList.add(sd);
                }
            } // while
        } catch (Exception e) {
            this.dbError = "List Level Error in model.product.StringDataList Constructor: " + e.getMessage();
        }
    } // method

} // class
