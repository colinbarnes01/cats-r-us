package model.user;

import model.user.*;

public class UserStringData
{

    public String userId = "";
    public String userName = "";
    public String email = "";
    public String password = "";
    public String role = "";
    public String errorMsg = "";

    public int getCharacterCount()
    {
        String s = this.userId + this.userName + this.email + this.password + this.role + this.errorMsg;
        return s.length();
    }

    public String toString()
    {
        return "userId:" + this.userId
                + ", userName:" + this.userName
                + ", email:" + this.email
                + ", password:" + this.password
                + ", role:" + this.role
                + ", errorMsg:" + this.errorMsg;
    }
}
