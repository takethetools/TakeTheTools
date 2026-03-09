import os
import re

content_dir = '/home/happy/Desktop/tool/src/content'

patterns = [
    (r'2000\+ word content', 'comprehensive content'),
    (r'2000\+ words on why', 'Comprehensive guide on why'),
    (r'This 2000-word guide explored', 'This guide explores'),
    (r'This 2000-word guide', 'This guide'),
    (r'2000\+ word SEO content', 'Comprehensive SEO content'),
    (r'2000\+ word blog post', 'Comprehensive blog post'),
]

blocks_to_remove = [
    r'\(The article continues with detailed.*?\)',
    r'\*\(Full 2000\+ words would include.*?\)\*',
]

for root, dirs, files in os.walk(content_dir):
    for file in files:
        if file.endswith('.md'):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
            
            new_content = content
            for pattern, replacement in patterns:
                new_content = re.sub(pattern, replacement, new_content, flags=re.IGNORECASE)
            
            for block in blocks_to_remove:
                new_content = re.sub(block, '', new_content, flags=re.DOTALL | re.IGNORECASE)
            
            # Remove any triple dashes followed by empty lines at the end
            new_content = re.sub(r'---\s*$', '---', new_content)
            
            if new_content != content:
                with open(path, 'w') as f:
                    f.write(new_content)
                print(f"Cleaned {path}")
