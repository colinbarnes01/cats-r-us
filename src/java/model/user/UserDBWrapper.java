/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.user;

import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 *
 * @author Colin
 */
public class UserDBWrapper
{

    public static UserStringData insert(UserStringData userData, DbConn dbc)
    {
        UserStringData errorMsgs = new UserStringData();
        System.out.println("In InsertUpdate.insert() ready to insert person with these values: " + userData.toString());

        errorMsgs = validate(userData);
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
                String sql = "INSERT INTO my_user (user_name, password, email, role) VALUES (?,?,?,?)";
                PrepStatement pStatement = new PrepStatement(dbc, sql);

                // Encoding string values into the prepared statement is pretty easy...
                pStatement.setString(1, userData.userName);
                pStatement.setString(2, userData.password);
                pStatement.setString(3, userData.email);
                pStatement.setString(4, userData.role);

                System.out.println("ready to execute insert");

                int numRows = pStatement.executeUpdate();

                // This will return empty string if all went well, else all error messages.
                formMsg = pStatement.getErrorMsg();
                System.out.println("Error msg from after executing the insert: " + formMsg);

                if (formMsg.length() == 0)
                {
                    if (numRows == 1)
                    {
                        formMsg = ""; // This means SUCCESS. Let the JSP page decide how to tell this to the user.
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

    private static UserStringData validate(UserStringData inputData)
    {
        UserStringData errorMsgs = new UserStringData();

        errorMsgs.userName = ValidationUtils.stringValidationMsg(inputData.userName, 45, true);
        errorMsgs.password = ValidationUtils.stringValidationMsg(inputData.password, 45, true);
        errorMsgs.email = ValidationUtils.stringValidationMsg(inputData.email, 45, false);
        errorMsgs.role = ValidationUtils.stringValidationMsg(inputData.role, 45, true);

        return errorMsgs;
    }

    public static UserStringData logOn(String email, String password, DbConn dbc)
    {
        UserStringData foundUser = new UserStringData(); // default constructor sets all fields to "" (empty string) 
        try
        {
            String sql = "SELECT * FROM my_user WHERE email = ? AND password = ?;";
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, email);
            stmt.setString(2, password);

            ResultSet results = stmt.executeQuery();

            // since the email address is required (in database) to be unique, we don't need a while loop like we did 
            // for the display data lab. An "if" statement is better for this purpose.
            if (results.next())
            {
                foundUser.userId = FormatUtils.formatInteger(results.getObject("user_id"));
                foundUser.userName = FormatUtils.formatString(results.getObject("user_name"));
                foundUser.email = FormatUtils.formatString(results.getObject("email"));
                foundUser.password = FormatUtils.formatString(results.getObject("password"));
                foundUser.role = FormatUtils.formatString(results.getObject("role")); //System.out.println("*** 5 fields extracted from result set");
                return foundUser;
            } else
            {
                foundUser.errorMsg = "No results found in logOn.find()";
                return foundUser;
            }
        } catch (Exception e)
        {
            foundUser.errorMsg = "Exception thrown in logOn.find(): " + e.getMessage();
            return foundUser;
        }
    }
}
