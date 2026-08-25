import os
import re

files_to_fix = [
    'send-welcome.mjs',
    'src/app/api/notify/route.ts',
    'test-resend-arbitrary.mjs',
    'test-resend.mjs'
]

for file in files_to_fix:
    if not os.path.exists(file):
        continue
    with open(file, 'r') as f:
        content = f.read()
    
    # Replace any string starting with 're_' with process.env.RESEND_API_KEY
    # usually it's something like "re_123456789" or 're_123456789'
    new_content = re.sub(r'[\'"]re_[a-zA-Z0-9_]+[\'"]', 'process.env.RESEND_API_KEY', content)
    
    with open(file, 'w') as f:
        f.write(new_content)
    print(f"Fixed {file}")
