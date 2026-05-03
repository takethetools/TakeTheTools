import json

missing_tools = [
    {"id": "alphabetical-line-sorter", "name": "Alphabetical Line Sorter", "category": "text"},
    {"id": "angle-converter", "name": "Angle Converter", "category": "math"},
    {"id": "area-converter", "name": "Area Converter", "category": "math"},
    {"id": "base32-encoder-decoder", "name": "Base32 Encoder/Decoder", "category": "security"},
    {"id": "camel-case-converter", "name": "Camel Case Converter", "category": "text"},
    {"id": "date-difference-calculator", "name": "Date Difference Calculator", "category": "math"},
    {"id": "decimal-to-fraction", "name": "Decimal to Fraction Converter", "category": "math"},
    {"id": "digital-storage-converter", "name": "Digital Storage Converter", "category": "developer"},
    {"id": "email-signature-generator-tool", "name": "Email Signature Generator", "category": "marketing"},
    {"id": "extract-emails-from-text", "name": "Extract Emails from Text", "category": "marketing"},
    {"id": "extract-urls-from-text", "name": "Extract URLs from Text", "category": "marketing"},
    {"id": "fraction-to-decimal", "name": "Fraction to Decimal Converter", "category": "math"},
    {"id": "hashtag-generator", "name": "Hashtag Generator", "category": "marketing"},
    {"id": "hsl-to-rgb", "name": "HSL to RGB Converter", "category": "developer"},
    {"id": "js-formatter", "name": "JavaScript Formatter", "category": "developer"},
    {"id": "kebab-case-converter", "name": "Kebab Case Converter", "category": "text"},
    {"id": "length-converter", "name": "Length Converter", "category": "math"},
    {"id": "power-converter", "name": "Power Converter", "category": "math"},
    {"id": "pressure-converter", "name": "Pressure Converter", "category": "math"},
    {"id": "quadratic-equation-solver", "name": "Quadratic Equation Solver", "category": "math"},
    {"id": "redirect-checker", "name": "URL Redirect Checker", "category": "developer"},
    {"id": "remove-html-tags", "name": "Remove HTML Tags", "category": "text"},
    {"id": "rgb-to-hsl", "name": "RGB to HSL Converter", "category": "developer"},
    {"id": "snake-case-converter", "name": "Snake Case Converter", "category": "text"},
    {"id": "speed-converter", "name": "Speed Converter", "category": "math"},
    {"id": "statistics-calculator", "name": "Statistics Calculator", "category": "math"},
    {"id": "temperature-converter", "name": "Temperature Converter", "category": "math"},
    {"id": "time-converter", "name": "Time Converter", "category": "math"},
    {"id": "title-case-converter", "name": "Title Case Converter", "category": "text"},
    {"id": "username-generator", "name": "Random Username Generator", "category": "security"},
    {"id": "volume-converter", "name": "Volume Converter", "category": "math"},
    {"id": "weight-converter", "name": "Weight Converter", "category": "math"},
]

def generate_tool_code(tool):
    return f"""  {{
    id: "{tool['id']}",
    name: "{tool['name']}",
    slug: "{tool['id']}",
    description: "{tool['name']} - Free online tool.",
    category: "{tool['category']}",
    iconName: "Zap",
    instructions: ["Enter your data.", "Click process.", "Copy the result."],
    faqs: [{{ question: "Is it free?", answer: "Yes, 100% free." }}],
    metaTitle: "{tool['name']} - Free Online Tool",
    metaDescription: "{tool['name']} online for free.",
    longDescription: "A powerful {tool['name']} tool that runs entirely in your browser.",
    exampleInput: "Example data"
  }},"""

for tool in missing_tools:
    print(generate_tool_code(tool))
