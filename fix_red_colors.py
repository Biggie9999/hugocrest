import os

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated colors in {filepath}")

# Layout admin panel color
replace_in_file(
    'src/app/(dashboard)/layout.tsx',
    {"color: '#d32f2f'": "color: '#047857'"}
)

# Messages page wine colors
replace_in_file(
    'src/app/(dashboard)/messages/page.module.css',
    {
        "#8b0000": "#047857",
        "#5c0000": "#02553d"
    }
)

print("Color replacements applied.")
