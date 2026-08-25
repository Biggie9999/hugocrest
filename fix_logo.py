import os

directory = 'src'
old_logo = 'https://www.hugocrest.com/wp-content/uploads/2024/07/logo.svg'
new_logo = '/wp-content/uploads/2024/07/Pages-logo-8.webp'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if old_logo in content:
                new_content = content.replace(old_logo, new_logo)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed logo in {filepath}")
