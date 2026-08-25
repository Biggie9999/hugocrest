import os
import re

directory = 'src'

replacements = {
    # Texts
    r'Lienhardt & Partners': 'Hugocrest',
    r'Lienhardt &amp; Partners': 'Hugocrest',
    r'Lienhardt & Partner': 'Hugocrest',
    r'Lienhardt \u0026amp; Partner': 'Hugocrest',
    r'Bank Lienhardt': 'Hugocrest Bank',
    r'Lienhardt': 'Hugocrest',
    r'Privatbank': 'Hugocrest Bank',
    r'lienhardtandpartners\.com': 'hugocrest.com',
    r'lienhardt\.ch': 'hugocrest.com',
    # Colors (Case-insensitive hex replacements)
    r'baa16f': '047857',
    r'BAA16F': '047857',
    r'cbb59c': '065f46',
    r'CBB59C': '065f46',
}

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return

    new_content = content
    for pattern, replacement in replacements.items():
        new_content = re.sub(pattern, replacement, new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(('.js', '.jsx', '.ts', '.tsx', '.css', '.html', '.json')):
            process_file(os.path.join(root, file))

print("Rebranding complete.")
