import re
import os

def extract_ids(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    # Find all IDs in the TOOLS array
    tool_ids = re.findall(r'id:\s*"([^"]+)"', content)
    return set(tool_ids)

def extract_rendered_ids(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    # Find all keys in TOOL_COMPONENTS
    rendered_ids = re.findall(r'"([^"]+)"\s*:\s*', content)
    return set(rendered_ids)

def extract_imports(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    # Find all dynamic imports
    imports = re.findall(r"import\('@/components/tools/([^']+)'\)", content)
    return set(imports)

def check_files_exist(import_list, base_dir):
    missing_files = []
    for imp in import_list:
        file_path = os.path.join(base_dir, f"{imp}.tsx")
        if not os.path.exists(file_path):
            missing_files.append(imp)
    return missing_files

registry_path = 'src/lib/tools.ts'
renderer_path = 'src/components/tools/ToolRenderer.tsx'
components_dir = 'src/components/tools'

registered_ids = extract_ids(registry_path)
rendered_ids = extract_rendered_ids(renderer_path)
imports = extract_imports(renderer_path)

print(f"Total Registered Tools: {len(registered_ids)}")
print(f"Total Rendered Tool IDs: {len(rendered_ids)}")

print("\n--- [1] Registered but NOT Rendered (Coming Soon) ---")
missing_render = registered_ids - rendered_ids
for rid in sorted(missing_render):
    print(rid)

print("\n--- [2] Rendered but NOT Registered (Hidden) ---")
unregistered_render = rendered_ids - registered_ids
for rid in sorted(unregistered_render):
    print(rid)

print("\n--- [3] Missing Component Files (Ghost Imports) ---")
missing_files = check_files_exist(imports, components_dir)
for mf in sorted(missing_files):
    print(mf)

print("\n--- [4] Component Mapping Check ---")
with open(renderer_path, 'r') as f:
    content = f.read()

# Check for GenericMockTool usage
mock_usage = re.findall(r'"([^"]+)"\s*:\s*GenericMockTool', content)
if mock_usage:
    print("\nTools using GenericMockTool (Mocked):")
    for mu in sorted(mock_usage):
        print(mu)

# Check for ComingSoonTool usage
coming_soon_usage = re.findall(r'"([^"]+)"\s*:\s*ComingSoonTool', content)
if coming_soon_usage:
    print("\nTools using ComingSoonTool (Explicitly Coming Soon):")
    for csu in sorted(coming_soon_usage):
        print(csu)
