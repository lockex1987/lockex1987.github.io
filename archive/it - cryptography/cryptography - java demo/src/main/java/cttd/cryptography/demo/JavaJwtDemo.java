package cttd.cryptography.demo;

import java.util.HashMap;
import java.util.Map;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;

public class JavaJwtDemo {
	
	private static final String SECRET_KEY = "keep_it_secret";

	private static void sign() {
		try {
			Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
			Map<String, Object> headerClaims = new HashMap<>();
			headerClaims.put("owner", "auth0");

			String token = JWT.create()
					.withIssuer("auth0")
					.withHeader(headerClaims)
					.withClaim("isAdmin", 123)
					.withArrayClaim("array", new Integer[] { 1, 2, 3 })
					.sign(algorithm);
			System.out.println(token);
		} catch (JWTCreationException exception) {
			// Invalid Signing configuration / Couldn't convert Claims.
			exception.printStackTrace();
		}
	}

	private static void verify() {
		String token = "eyJvd25lciI6ImF1dGgwIiwiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifQ.eyJhcnJheSI6WzEsMiwzXSwiaXNzIjoiYXV0aDAiLCJpc0FkbWluIjoxMjN9.ISM7zUWpGePCgY_64kEt-5I2W4Oatu7pzqims3Z5hQM";
		try {
			Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
			JWTVerifier verifier = JWT.require(algorithm)
					.withIssuer("auth0")
					.build(); // Reusable verifier instance
			DecodedJWT jwt = verifier.verify(token);
			System.out.println(jwt.getAlgorithm() + "\n"
					+ jwt.getType() + "\n"
					+ jwt.getContentType() + "\n"
					+ jwt.getKeyId() + "\n"
					+ jwt.getHeaderClaim("owner") + "\n"
					+ jwt.getIssuer() + "\n"
					+ jwt.getSubject() + "\n"

					+ jwt.getAudience() + "\n"
					+ jwt.getExpiresAt() + "\n"
					+ jwt.getNotBefore() + "\n"
					+ jwt.getIssuedAt() + "\n"
					+ jwt.getId() + "\n");

			Map<String, Claim> claims = jwt.getClaims(); // Key is the Claim name
			Claim claim = claims.get("isAdmin");
			System.out.println(claim.asInt());
		} catch (JWTVerificationException exception) {
			exception.printStackTrace();
			// Invalid signature/claims
		}
	}

	public static void main(String[] args) {
		sign();
		verify();
	}
}
