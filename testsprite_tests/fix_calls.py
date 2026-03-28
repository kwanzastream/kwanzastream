import glob

for f in sorted(glob.glob('testsprite_tests/TC*.py')):
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    lines = content.rstrip().split('\n')
    last = lines[-1].strip()
    if last.startswith('test_') and last.endswith('()'):
        indent_call = '    ' + last
        lines[-1] = 'if __name__ == "__main__":\n' + indent_call
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write('\n'.join(lines) + '\n')
        print(f'Fixed: {f}')
    else:
        print(f'Skip: {f}')
