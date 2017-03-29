package model.user;

import model.user.*;
import model.user.UserStringData;
import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class UserStringDataList {

    public String dbError = "";
    private ArrayList<UserStringData> recordList = new ArrayList();

    public UserStringDataList() {
    }

    public UserStringDataList(String userNameStartsWith, DbConn dbc) {

        UserStringData sd = new UserStringData();

        System.out.println("Searching for users that start with " + userNameStartsWith);

        try {

            String sql = "SELECT user_id, user_name, password, email, role FROM my_user "
                    + " WHERE user_name LIKE ? ORDER BY user_name";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, userNameStartsWith + "%");
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                try {
                    sd = new UserStringData();
                    sd.userId = FormatUtils.formatInteger(results.getObject("user_id"));
                    sd.userName = FormatUtils.formatString(results.getObject("user_name"));
                    sd.email = FormatUtils.formatString(results.getObject("email"));
                    sd.password = FormatUtils.formatString(results.getObject("password"));
                    sd.role = FormatUtils.formatString(results.getObject("role"));
                    this.recordList.add(sd);
                } catch (Exception e) {
                    sd.errorMsg = "Record Level Error in model.user.StringDataList Constructor: " + e.getMessage();
                    this.recordList.add(sd);
                }
            }
        } catch (Exception e) {
            this.dbError = "List Level Error in model.user.StringDataList Constructor: " + e.getMessage();
        }
    }

}
