---
title: "How to Encode and Decode URLs Online for Free"
date: "2026-04-28"
description: "Encode special characters in URLs and decode percent-encoded URLs instantly. Free URL encoder and decoder tool — no signup required. Learn why URL encoding exists."
category: "Developer Tools"
toolSlug: "url-encoder"
toolName: "URL Encoder & Decoder"
---

## Why URLs Cannot Contain Certain Characters

A URL can only contain a specific set of safe characters: letters (A-Z, a-z), digits (0-9), and a handful of special characters like hyphens, underscores, periods, and tildes. Everything else — spaces, ampersands, question marks, brackets, non-English characters, emoji — has to be encoded before it can appear in a URL.

This is not an arbitrary restriction. URLs are transmitted as plain text across internet protocols that were designed decades ago with a limited character set in mind. Characters like `&` and `?` have specific meanings in URL syntax — they separate query parameters. If your data contains these characters, they need to be encoded so the URL parser does not misinterpret them as structural elements.

URL encoding converts unsafe characters into a percent sign followed by two hexadecimal digits representing the character's ASCII value. A space becomes `%20`. An ampersand becomes `%26`. The letter `é` becomes `%C3%A9`.

## How to Encode and Decode URLs Using TakeTheTools

Open the URL Encoder and Decoder tool on TakeTheTools.

**To encode:** Paste the text or URL component you want to encode into the input field and click Encode. The encoded version appears instantly. This is what you use when you are building a URL that needs to include special characters.

**To decode:** Paste a percent-encoded URL or URL component into the input field and click Decode. The human-readable version appears. This is useful for reading URLs that have been encoded by a system and are hard to interpret.

Everything runs in your browser with no server connection.

## URL Encoding vs Full URL Encoding — An Important Difference

There are two different encoding operations that are often confused:

**Encoding a URL component** — This encodes a single piece of data that will go inside a URL, like a search query or a parameter value. It encodes everything that is not a safe character, including `/`, `?`, `&`, and `=`. Use this when you are encoding a value that will be placed inside a URL parameter.

**Encoding a full URL** — This preserves the structure of a complete URL (the `://`, the `/` path separators, the `?` and `&` query separators) while encoding only the characters within each component that need encoding. Use this when you have a complete URL that needs to be made safe for embedding in another context.

Most developer tools provide both options. For most use cases — encoding a search query, a file name, or a user input before appending it to a URL — encoding the component is what you need.

## Common Encoded Characters Reference

Knowing what common characters encode to helps you read encoded URLs quickly:

| Character | Encoded |
|---|---|
| Space | `%20` (or `+` in form data) |
| `&` | `%26` |
| `=` | `%3D` |
| `?` | `%3F` |
| `#` | `%23` |
| `/` | `%2F` |
| `+` | `%2B` |
| `@` | `%40` |
| `:` | `%3A` |
| `,` | `%2C` |

Non-ASCII characters like Arabic, Urdu, Chinese, and accented European characters encode to multiple percent-encoded bytes because they require more than one byte in UTF-8 encoding.

## When You Actually Need URL Encoding

**Building search URLs programmatically.** When your code constructs a URL with a user-provided search query, you must encode the query before appending it. If a user searches for "C++ tutorial", the URL needs to be `.../search?q=C%2B%2B+tutorial`, not `.../search?q=C++ tutorial`. The unencoded version breaks the URL.

**Passing file paths in URLs.** File paths often contain characters like spaces, parentheses, and special characters that are unsafe in URLs. Encoding the path ensures it transmits correctly.

**Reading analytics and tracking URLs.** UTM parameters and tracking URLs are often heavily encoded. Decoding them lets you read the campaign parameters and values clearly.

**Debugging API requests.** When an API request fails and you are examining the raw request URL, encoded characters make the URL hard to read. Decoding it reveals the actual parameter values being sent.

**Working with internationalized URLs.** URLs containing non-English characters — Arabic text in a path, Chinese characters in a query parameter — require encoding for safe transmission. Decoding these helps you verify the actual content.

**Form submissions.** When HTML forms submit data via GET method, the form values are URL-encoded and appended to the URL. Decoding the query string lets you see the raw form values.

## The Difference Between `%20` and `+` for Spaces

You will encounter both `%20` and `+` used to represent spaces in URLs, which causes confusion.

`%20` is the standard URL encoding for a space and works correctly in all parts of a URL — the path, query string, and fragment.

`+` as a space encoding is specific to HTML form data encoding (application/x-www-form-urlencoded). It only means space in the query string portion of a URL, not in the path. In the path, `+` is a literal plus sign.

When you are encoding URLs for general use, use `%20` for spaces. When you are working specifically with HTML form data, `+` is conventional and widely supported in query strings.

## Final Thoughts

URL encoding is one of those foundational web concepts that you encounter constantly once you start working with APIs, form data, and dynamic URL construction. Understanding what it does and when to apply it prevents a whole category of subtle bugs.

The TakeTheTools URL Encoder and Decoder handles both encoding and decoding instantly in your browser, covers all standard characters, and is completely free with no account required.
