package model.product;

import dbUtils.FormatUtils;
import java.sql.ResultSet;

public class ProductStringData
{

    // select product_id, product_name, flag_abbrev, flag_URL from product_flag
    public String productId = "";
    public String productName = "";
    public String imageUrl = "";
    public String price = "";
    public String description = "";
    public String websiteUrl = "";
    public String errorMsg = "";
    public int id;

    public int getCharacterCount()
    {
        String s = this.productId + this.productName + this.imageUrl + this.price + this.description + this.websiteUrl + this.errorMsg;
        return s.length();
    }

    public String toString()
    {
        return "productId:" + this.productId
                + ", productName:" + this.productName
                + ", email:" + this.imageUrl
                + ", password:" + this.price
                + ", role:" + this.description
                + ", websiteUrl: " + this.websiteUrl
                + ", errorMsg:" + this.errorMsg;
    }

    public void extractProductStringsFromResultSet(ResultSet results)
    {
        System.out.println("inside extract function with results: " + results);
        try
        {
            this.productId = FormatUtils.formatInteger(results.getObject("product_id"));
            this.productName = FormatUtils.formatString(results.getObject("product_name"));
            this.imageUrl = FormatUtils.formatString(results.getObject("image_url"));
            this.price = FormatUtils.formatDollar(results.getObject("price"));
            this.description = FormatUtils.formatString(results.getObject("description"));
            this.websiteUrl = FormatUtils.formatString(results.getObject("website_url"));
            this.id = Integer.parseInt(this.productId);
        } catch (Exception e)
        {
            this.errorMsg = "Data Exception thrown in extractProductStringsFromResultSet(): " + e.getMessage();
            System.out.println("*****" + this.errorMsg);
        }
    }
}
