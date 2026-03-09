---
title: "How to Decode a JWT Token Online"
date: "2026-02-26"
description: "Decode and inspect JSON Web Token (JWT) headers, payloads, and signatures using our free online JWT Decoder."
category: "Developer Tools"
image: "https://placehold.co/1200x630/3b82f6/ffffff?text=JWT+Decoder"
toolSlug: "jwt-decoder"
toolName: "JWT Decoder"
---

JWT (JSON Web Tokens) are the backbone of modern authentication systems. Our **free JWT Decoder** lets you instantly inspect any token's contents without needing a secret key.

## What is a JWT?

A JWT is a compact, URL-safe token made up of three Base64URL-encoded sections separated by dots:

```
header.payload.signature
```

### Header
Contains metadata about the token:
```json
{ "alg": "HS256", "typ": "JWT" }
```

### Payload (Claims)
Contains the actual data:
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622
}
```

### Signature
A cryptographic hash that verifies the token wasn't tampered with.

## How to Decode a JWT

1. Open the [JWT Decoder](/tools/jwt-decoder).
2. Paste your JWT token into the input field.
3. View the decoded header, payload, and signature instantly.
4. Check the expiry time (`exp`) to see if the token is still valid.

## Important Security Notes

- **Decoding ≠ Verifying**: Our tool decodes the token but does not verify the signature. To verify, you need the secret key.
- **Never paste production tokens**: JWT payloads often contain sensitive user data. Only use test tokens in online decoders.
- **Check expiry**: The `exp` claim contains a Unix timestamp of when the token expires.

## Standard JWT Claims

| Claim | Full Name | Description |
|---|---|---|
| `iss` | Issuer | Who issued the token |
| `sub` | Subject | Who the token represents |
| `aud` | Audience | Who the token is for |
| `exp` | Expiration | When the token expires |
| `iat` | Issued At | When the token was created |
