package model.product;

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
}
