import os

directory = 'src/app/(auth)'
old_text = 'Die Nutzung des Fernsupports ist nur nach Kontaktaufnahme mit der E-Banking-Hotline möglich.'
new_text = 'Remote support is only available after contacting the e-banking hotline.'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.js'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if old_text in content:
                new_content = content.replace(old_text, new_text)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed text in {filepath}")

