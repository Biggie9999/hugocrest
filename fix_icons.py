import os

filepath = 'src/app/(dashboard)/dashboard/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('color="#fff"', 'color="#047857"')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Icons fixed.")
