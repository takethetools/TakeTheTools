import re

def get_registered_tools(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    tools = []
    # Find all tool objects
    matches = re.finditer(r'\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)"', content)
    for m in matches:
        tools.append({'id': m.group(1), 'name': m.group(2)})
    return tools

missing_ids = [
    "aes-encryption-decryption", "alphabetical-line-sorter", "angle-converter", "area-converter",
    "base32-encoder-decoder", "camel-case-converter", "csv-to-xml-converter", "date-difference-calculator",
    "decimal-to-fraction", "digital-storage-converter", "email-signature-generator-tool", "excel-to-json-converter",
    "extract-emails-from-text", "extract-urls-from-text", "fraction-to-decimal", "hashtag-generator",
    "hsl-to-rgb", "image-to-pdf", "js-formatter", "json-to-typescript-interface",
    "kebab-case-converter", "length-converter", "markdown-to-pdf-converter", "pdf-to-image",
    "power-converter", "pressure-converter", "quadratic-equation-solver", "redirect-checker",
    "remove-html-tags", "rgb-to-hsl", "rotate-pdf", "sitemap-generator", "snake-case-converter",
    "speed-converter", "statistics-calculator", "string-length-calculator", "temperature-converter",
    "time-converter", "title-case-converter", "username-generator", "volume-converter",
    "webp-to-jpg-converter", "weight-converter", "word-to-markdown-converter", "xml-to-csv-converter"
]

registered = get_registered_tools('src/lib/tools.ts')
reg_ids = {t['id'] for t in registered}
reg_names = {t['name'].lower() for t in registered}

print("ID | Possible Registered Twin")
print("-" * 40)
for mid in missing_ids:
    twin = ""
    # Try to find by similar ID
    for rid in reg_ids:
        if rid in mid or mid in rid:
            twin = rid
            break
    # Try to find by name (approximate)
    if not twin:
        name_guess = mid.replace("-", " ").lower()
        for t in registered:
            if t['name'].lower() in name_guess or name_guess in t['name'].lower():
                twin = t['id']
                break
    print(f"{mid} | {twin}")
