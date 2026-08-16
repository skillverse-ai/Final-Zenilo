import os
import re

workspace_dir = r"c:\Users\AKHIL\Downloads\zenlio-website-main (2)\zenlio-website-main"

# Directories to scan for files
scan_dirs = ['app', 'components', 'public', 'lib']

# Get list of all files in the project
all_files = []
for d in scan_dirs:
    dir_path = os.path.join(workspace_dir, d)
    if os.path.exists(dir_path):
        for root, dirs, files in os.walk(dir_path):
            # Skip .next and node_modules if they somehow slip in
            if '.next' in root or 'node_modules' in root:
                continue
            for file in files:
                all_files.append(os.path.join(root, file))

# Code files where we will search for references
code_extensions = ('.ts', '.tsx', '.css', '.json', '.js', '.mjs')
code_contents = {}

for root, dirs, files in os.walk(workspace_dir):
    if any(x in root for x in ['.next', 'node_modules', '.git', 'scratch']):
        continue
    for file in files:
        if file.endswith(code_extensions) and file != 'analyze_unused.py':
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    code_contents[filepath] = f.read()
            except Exception as e:
                print(f"Error reading {filepath}: {e}")

# Special entry points or files we should never delete
always_keep = [
    # Next.js special files
    r'app\\layout\.tsx$',
    r'app\\page\.tsx$',
    r'app\\globals\.css$',
    r'app\\favicon\.ico$',
    r'app\\apple-icon\.png$',
    r'app\\api\\.*',
    # Pages/routes
    r'app\\.*\\page\.tsx$',
    # Metadata and manifests
    r'public\\site\.webmanifest$',
    r'public\\favicon-.*\.png$',
    r'public\\android-chrome-.*\.png$',
    r'public\\apple-touch-icon\.png$',
]

always_keep_patterns = [re.compile(p) for p in always_keep]

def is_entrypoint(rel_path):
    for pattern in always_keep_patterns:
        if pattern.search(rel_path):
            return True
    return False

results = []

for filepath in all_files:
    rel_path = os.path.relpath(filepath, workspace_dir)
    filename = os.path.basename(filepath)
    name_no_ext, ext = os.path.splitext(filename)
    
    if is_entrypoint(rel_path):
        results.append((rel_path, "KEEP (Entrypoint/Special file)"))
        continue
        
    # Check for references
    referenced_in = []
    
    # How might this file be referenced?
    # 1. By its full filename (e.g. 'problem-1.webp' or 'utils.ts')
    # 2. By import path (e.g. '@/components/sections/Hero' or '../ui/button')
    # 3. For public assets, by path relative to public/ (e.g. '/images/problem-1.webp' or '/fonts/Grift-Bold.woff2')
    # 4. For components/utilities, by its module name (e.g. 'animationUtils' or 'ConsentGate')
    
    search_terms = {filename}
    
    if rel_path.startswith('public\\'):
        # E.g. public\images\problem-1.webp -> /images/problem-1.webp
        public_rel = rel_path[len('public\\'):].replace('\\', '/')
        search_terms.add(public_rel)
        # Also just the image name without directories
        search_terms.add(filename)
        # Also check for dynamic patterns (e.g., problem-1 -> "problem-" + id)
        # For problem-1, problem-2, etc. let's check for prefix "problem-" or "project-" or "step"
        match = re.match(r'^(problem-|project-|step)\d+', name_no_ext)
        if match:
            search_terms.add(match.group(1))
            
    elif filepath.endswith(('.ts', '.tsx')):
        # E.g. components\ui\button.tsx -> button
        search_terms.add(name_no_ext)
        
    # Search in all code files
    for code_file, content in code_contents.items():
        # Do not match the file itself referencing itself
        if code_file == filepath:
            continue
            
        found = False
        for term in search_terms:
            if term == name_no_ext and term.isidentifier():
                pattern = r'\b' + re.escape(term) + r'\b'
            else:
                pattern = re.escape(term)
                
            if re.search(pattern, content):
                found = True
                break
                
        if found:
            referenced_in.append(os.path.relpath(code_file, workspace_dir))
            
    if referenced_in:
        results.append((rel_path, f"USED (Referenced in {len(referenced_in)} files: {', '.join(referenced_in[:3])})"))
    else:
        results.append((rel_path, "UNUSED"))

# Print report
print("\n=== UNUSED FILES REPORT ===")
unused_count = 0
for rel_path, status in results:
    if status == "UNUSED":
        print(f"[UNUSED] {rel_path}")
        unused_count += 1

print(f"\nTotal unused files found: {unused_count}")

print("\n=== USED FILES SUMMARY ===")
for rel_path, status in results:
    if status != "UNUSED" and "KEEP" not in status:
        print(f"[USED] {rel_path} -> {status}")
