import pyaudio
import socket
import sys

FRAMES = 65000
FORMAT = pyaudio.paInt8  # 8-bit mono
CHANNELS = 1
RATE = 44100

def StartServer(port):
    audio = pyaudio.PyAudio()
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind(("0.0.0.0", port))

    print(f"Servidor escuchando en puerto {port}...")

    frame_size = pyaudio.get_sample_size(FORMAT)

    stream = audio.open(format=FORMAT, channels=CHANNELS,
                        rate=RATE, output=True)
    try:
        while True:
            data, addr = sock.recvfrom(65535)
            print(f"Audio recibido de {addr}")
            frames_to_play = len(data) // frame_size
            stream.write(data[:frames_to_play * frame_size])
    except KeyboardInterrupt:
        print("Servidor detenido.")
    finally:
        stream.stop_stream()
        stream.close()
        audio.terminate()
        sock.close()


def StartClient(port):
    audio = pyaudio.PyAudio()
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    frame_size = pyaudio.get_sample_size(FORMAT)

    stream = audio.open(format=FORMAT, channels=CHANNELS,
                        rate=RATE, input=True,
                        frames_per_buffer=FRAMES)
    try:
        while True:
            server_ip = input("IP del servidor (o 'salir'): ")
            if server_ip.lower() == "salir":
                break

            print("Grabando...")
            buffer = stream.read(FRAMES)
            num_frames = FRAMES
            bytes_to_send = num_frames * frame_size

            sock.sendto(buffer[:bytes_to_send], (server_ip, port))
            print("Audio enviado.")
    except KeyboardInterrupt:
        print("Cliente detenido.")
    finally:
        stream.stop_stream()
        stream.close()
        audio.terminate()
        sock.close()


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python walkie.py [server|client] [puerto]")
        sys.exit(1)

    mode = sys.argv[1]
    port = int(sys.argv[2])

    if mode == "server":
        StartServer(port)
    elif mode == "client":
        StartClient(port)
    else:
        print("Modo inválido. Usa 'server' o 'client'.")