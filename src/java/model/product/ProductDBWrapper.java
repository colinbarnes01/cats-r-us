/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.product;

import model.product.*;
import dbUtils.*;
import java.math.BigDecimal;

/**
 *
 * @author Colin
 */
public class ProductDBWrapper
{

    public static ProductStringData insert(ProductStringData productData, DbConn dbc)
    {
        if (productData.price.isEmpty())
        {
            productData.price = "0.0";  // or else we get an error trying to insert BigDecimal("") into database
        }

        ProductStringData errorMsgs = new ProductStringData();

        System.out.println("In InsertUpdate.insert() ready to insert person with these values: " + productData.toString());

        errorMsgs = validate(productData);
        System.out.println("In InsertUpdate.insert() finished with validation");

        String formMsg = "";

        if (errorMsgs.getCharacterCount() > 0)
        {  // at least one field has an error, don't go any further.
            System.out.println("Validation errors: " + errorMsgs.toString());
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;
        } else
        { // all fields passed validation
            System.out.println("In InsertUpdate.insert() passed validation");

            // Start preparing SQL statement
            formMsg = dbc.getErr(); // will be empty string if DB connection is OK.
            if (formMsg.length() == 0)
            { // db connection is good

                // prepare the statement
                String sql = "INSERT INTO product (product_name, image_url, price, description, website_url) VALUES (?,?,?,?,?)";
                PrepStatement pStatement = new PrepStatement(dbc, sql);

                // Encoding string values into the prepared statement is pretty easy...
                pStatement.setString(1, productData.productName);
                pStatement.setString(2, productData.imageUrl);
                pStatement.setBigDecimal(3, new BigDecimal(productData.price));
                pStatement.setString(4, productData.description);
                pStatement.setString(5, productData.websiteUrl);

                System.out.println("ready to execute insert");

                int numRows = pStatement.executeUpdate();

                // This will return empty string if all went well, else all error messages.
                formMsg = pStatement.getErrorMsg();
                System.out.println("Error msg from after executing the insert: " + formMsg);

                if (formMsg.length() == 0)
                {
                    if (numRows == 1)
                    {
                        formMsg = ""; // This means SUCCESS. Let the JSP page decide how to tell this to the product.
                    } else
                    {
                        // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                        formMsg = numRows + " records were inserted when exactly 1 was expected.";
                    }
                    System.out.println("Number of records affected: " + numRows);
                }
            } // Db Connection is good - double check, JSP page should not send us a bad one... 
        } // customerId is not null and not empty string.
        errorMsgs.errorMsg = formMsg;
        return errorMsgs;
    }

    private static ProductStringData validate(ProductStringData inputData)
    {
        ProductStringData errorMsgs = new ProductStringData();

        errorMsgs.productName = ValidationUtils.stringValidationMsg(inputData.productName, 45, true);
        errorMsgs.price = ValidationUtils.decimalValidationMsg(inputData.price, false);
        errorMsgs.imageUrl = ValidationUtils.stringValidationMsg(inputData.imageUrl, 10000, false); // 10,000 chars seems reasonable for a max url
        errorMsgs.description = ValidationUtils.stringValidationMsg(inputData.description, 45, false);
        errorMsgs.websiteUrl = ValidationUtils.stringValidationMsg(inputData.websiteUrl, 10000, false);
         
        return errorMsgs;
    }
}
