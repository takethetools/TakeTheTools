import re

with open('src/lib/tools.ts', 'r') as f:
    content = f.read()

# Extract TOOLS array content
tools_match = re.search(r'export const TOOLS: Tool\[\] = \[(.*?)\];', content, re.DOTALL)
if not tools_match:
    print("Could not find TOOLS array")
    exit()

tools_content = tools_match.group(1)

# Split into individual tool objects (roughly)
tool_blocks = re.findall(r'\{.*?id: ".*?".*?\}', tools_content, re.DOTALL)

missing_example = []
for block in tool_blocks:
    name_match = re.search(r'name: "(.*?)",', block)
    if not name_match: continue
    name = name_match.group(1)
    
    if 'exampleInput:' not in block:
        missing_example.append(name)

print(f"Total tools missing exampleInput: {len(missing_example)}")
for name in missing_example:
    print(f"- {name}")
