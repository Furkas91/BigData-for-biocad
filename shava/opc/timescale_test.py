import subprocess

pognali = '''
sudo -u postgres psql postgres
'''
subprocess.run(pognali, shell=True, check=True)

