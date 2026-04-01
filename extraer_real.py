import json
import os

JSON_FILE = 'backup.json'

def main():
    if not os.path.exists(JSON_FILE):
        print(f"❌ Error: Falta el archivo {JSON_FILE}")
        return
        
    print("📖 Leyendo el código fuente original...")
    try:
        with open(JSON_FILE, 'r', encoding='utf-8') as f:
            raw = f.read().strip()
            # Limpiamos si copiaste palabras extra al principio
            if raw.startswith('este es el otro ('): raw = raw[17:]
            elif raw.startswith('files ('): raw = raw[7:]
            elif raw.startswith('('): raw = raw[1:]
            
            if raw.endswith(')'): raw = raw[:-1]
            if raw.endswith(';'): raw = raw[:-1]
            
            data = json.loads(raw)
    except Exception as e:
        print(f"❌ Error leyendo JSON: {e}")
        return
        
    files = data.get('files', {})
    if not files:
        print("❌ No se encontró el bloque 'files'.")
        return
        
    print(f"🚀 Extrayendo {len(files)} archivos exactos de Base44...")
    for path, content in files.items():
        if path.startswith('/'): path = path[1:]
        
        directory = os.path.dirname(path)
        if directory and not os.path.exists(directory):
            os.makedirs(directory)
            
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Extraído: {path}")
        
    print("\n✨ ¡EXTRACCIÓN 100% COMPLETA! ✨")
    print("Ejecuta en tu terminal:")
    print("1. npm install")
    print("2. npm run dev")

if __name__ == '__main__':
    main()