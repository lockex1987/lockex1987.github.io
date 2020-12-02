import java.util.Properties;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;

public class LdapLogin {

	public static void main(String[] args) {
		System.out.println(performAuthentication());
	}

	public static boolean performAuthentication() {
		// LDAP connection info
	    String ldap = "192.168.101.15";
	    int port = 389;
	    String ldapUrl = "ldap://" + ldap + ":" + port;

		// Config
		String identifyingAttribute = "uid";
		String base = "ou=people,dc=modtest,dc=gov,dc=vn";

	    // service user
	    String serviceUserDN = "uid=zimbra,cn=admins,cn=zimbra";
	    String serviceUserPassword = "YgngV0Ydf";

	    // user to authenticate
	    
	    String identifier = "ttcd123";
	    String password = "Hanoi@123";

	    // first create the service context
	    DirContext serviceCtx = null;
	    try {
	        // use the service user to authenticate
	        Properties serviceEnv = new Properties();
	        serviceEnv.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
	        serviceEnv.put(Context.PROVIDER_URL, ldapUrl);
	        serviceEnv.put(Context.SECURITY_PRINCIPAL, serviceUserDN);
	        serviceEnv.put(Context.SECURITY_CREDENTIALS, serviceUserPassword);
			serviceEnv.put(Context.SECURITY_AUTHENTICATION, "simple");
	        serviceCtx = new InitialDirContext(serviceEnv);

	        // we don't need all attributes, just let it get the identifying one
	        String[] attributeFilter = {
				identifyingAttribute
			};
	        SearchControls sc = new SearchControls();
	        sc.setReturningAttributes(attributeFilter);
	        sc.setSearchScope(SearchControls.SUBTREE_SCOPE);

	        // use a search filter to find only the user we want to authenticate
	        String searchFilter = "(" + identifyingAttribute + "=" + identifier + ")";
	        NamingEnumeration<SearchResult> results = serviceCtx.search(base, searchFilter, sc);

	        if (results.hasMore()) {
	            // get the users DN (distinguishedName) from the result
	            SearchResult result = results.next();
	            String distinguishedName = result.getNameInNamespace();
				System.out.println(distinguishedName);

	            // attempt another authentication, now with the user
	            Properties authEnv = new Properties();
	            authEnv.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
	            authEnv.put(Context.PROVIDER_URL, ldapUrl);
	            authEnv.put(Context.SECURITY_PRINCIPAL, distinguishedName);
	            authEnv.put(Context.SECURITY_CREDENTIALS, password);
	            new InitialDirContext(authEnv);

	            System.out.println("Authentication successful");
	            return true;
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	    } finally {
	        if (serviceCtx != null) {
	            try {
	                serviceCtx.close();
	            } catch (NamingException e) {
	                e.printStackTrace();
	            }
	        }
	    }
	    System.err.println("Authentication failed");
	    return false;
	}
}
