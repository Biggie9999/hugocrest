import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # Replace the wrong logo
    content = content.replace('Pages-logo-8.webp', 'hugo.png')
    
    # Fix weird names
    content = content.replace('Hugocrest Hugocrest Bank Zürich AG', 'Hugocrest Bank')
    content = content.replace('Hugocrest Bank Zürich AG', 'Hugocrest Bank')
    content = content.replace('Privatbank Zurich', 'Hugocrest Bank')
    content = content.replace('Privatbank', 'Hugocrest Bank')
    
    # Remove Lienhardt linkedin
    content = content.replace('https://www.linkedin.com/company/lienhardtpartnerprivatbank/?originalSubdomain=ch', '#')
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
            process_file(os.path.join(root, file))

print("Fixes applied.")
