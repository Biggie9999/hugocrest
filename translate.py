import os
import re

auth_dir = 'src/app/(auth)'
dashboard_dir = 'src/app/(dashboard)'

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # 1. Replace CHF with £
    content = content.replace('CHF ', '£')
    content = content.replace('CHF', '£')
    
    # 2. Hardcode default language to 'en' instead of 'de'
    content = content.replace("useState('de')", "useState('en')")
    
    # 3. Remove the lang-switcher div block
    # We find the start of the lang-switcher and the closing </div>
    pattern = r'<div className="lang-switcher".*?</div>'
    content = re.sub(pattern, '', content, flags=re.DOTALL)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
            process_file(os.path.join(root, file))

print("Translation script completed.")
