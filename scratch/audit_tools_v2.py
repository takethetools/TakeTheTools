import re
import os

def extract_tools_array_ids(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Extract the content inside TOOLS = [ ... ]
    # We look for TOOLS: Tool[] = [ until the final ]; at the end of the file structure
    match = re.search(r'export const TOOLS: Tool\[\] = \[(.*)\];\s*export function', content, re.DOTALL)
    if not match:
        # Try a simpler one if the function export isn't there
        match = re.search(r'export const TOOLS: Tool\[\] = \[(.*)\];', content, re.DOTALL)
    
    if not match:
        return set()
    
    tools_content = match.group(1)
    # Find all ids in this content
    ids = re.findall(r'id:\s*"([^"]+)"', tools_content)
    return set(ids)

def extract_rendered_ids(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Extract content inside TOOL_COMPONENTS = { ... }
    match = re.search(r'const TOOL_COMPONENTS: Record<string,.*?> = \{(.*?)\};', content, re.DOTALL)
    if not match:
        return set()
    
    renderer_content = match.group(1)
    ids = re.findall(r'"([^"]+)"\s*:', renderer_content)
    return set(ids)

registry_path = 'src/lib/tools.ts'
renderer_path = 'src/components/tools/ToolRenderer.tsx'

registered_ids = extract_tools_array_ids(registry_path)
rendered_ids = extract_rendered_ids(renderer_path)

print(f"Total Registered Tools: {len(registered_ids)}")
print(f"Total Rendered Tool IDs: {len(rendered_ids)}")

print("\n--- Registered but NOT Mapped (User will see 'Coming Soon') ---")
not_mapped = registered_ids - rendered_ids
for rid in sorted(not_mapped):
    print(rid)

print("\n--- Mapped but NOT Registered (Hidden from UI but accessible) ---")
not_registered = rendered_ids - registered_ids
for rid in sorted(not_registered):
    print(rid)
