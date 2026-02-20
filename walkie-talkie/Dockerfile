FROM python:3.9-slim

# Instalar dependencias del sistema para pyaudio
RUN apt-get update && apt-get install -y \
    portaudio19-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Instalar pyaudio
RUN pip install pyaudio

# Copiar el código
COPY walkie.py ./

CMD ["python3", "walkie.py"]