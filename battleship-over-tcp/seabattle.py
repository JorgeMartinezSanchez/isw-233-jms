import socket
import random
import sys

UNKNOWN = 0
EMPTY = 1
HIT = 2
KILL = 3
SHIP = 4

class SeabattleField:
    def __init__(self):
        self.grid = [[EMPTY] * 8 for _ in range(8)]
        self.ships = []

    @staticmethod
    def get_random_field(seed):
        field = SeabattleField()
        rng = random.Random(seed)
        ship_sizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]

        for size in ship_sizes:
            while True:
                horizontal = rng.randint(0, 1) == 0
                if horizontal:
                    x = rng.randint(0, 7 - size + 1)
                    y = rng.randint(0, 7)
                    cells = [(x + i, y) for i in range(size)]
                else:
                    x = rng.randint(0, 7)
                    y = rng.randint(0, 7 - size + 1)
                    cells = [(x, y + i) for i in range(size)]

                if field._can_place(cells):
                    for cx, cy in cells:
                        field.grid[cy][cx] = SHIP
                    field.ships.append(cells)
                    break
        return field

    def _can_place(self, cells):
        for cx, cy in cells:
            for dx in range(-1, 2):
                for dy in range(-1, 2):
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < 8 and 0 <= ny < 8:
                        if self.grid[ny][nx] == SHIP:
                            return False
        return True

    def shoot(self, x, y):
        if self.grid[y][x] == SHIP:
            self.grid[y][x] = HIT
            for ship in self.ships:
                if (x, y) in ship:
                    if all(self.grid[sy][sx] == HIT for sx, sy in ship):
                        for sx, sy in ship:
                            self.grid[sy][sx] = KILL
                        return 2
            return 1
        else:
            self.grid[y][x] = EMPTY
            return 0

    def mark_miss(self, x, y):
        self.grid[y][x] = EMPTY

    def mark_hit(self, x, y):
        self.grid[y][x] = HIT

    def mark_kill(self, x, y):
        self.grid[y][x] = KILL

    def is_loser(self):
        for row in self.grid:
            if SHIP in row:
                return False
        return True


class SeabattleAgent:
    def __init__(self, field):
        self.my_field = field
        self.opponent_field = SeabattleField()
        self.sock = None

    def parse_move(self, text):
        if len(text) != 2:
            return None
        col = ord(text[0].upper()) - ord('A')
        row = int(text[1]) - 1
        if 0 <= col < 8 and 0 <= row < 8:
            return (col, row)
        return None

    def move_to_string(self, x, y):
        return chr(ord('A') + x) + str(y + 1)

    def print_fields(self):
        symbols = {UNKNOWN: '?', EMPTY: '.', HIT: 'X', KILL: '#', SHIP: 'O'}
        print("\n  Mi campo          Campo enemigo")
        print("  A B C D E F G H  A B C D E F G H")
        for y in range(8):
            my_row = ' '.join(symbols[self.my_field.grid[y][x]] for x in range(8))
            op_row = ' '.join(symbols[self.opponent_field.grid[y][x]] for x in range(8))
            print(f"{y+1} {my_row}  {op_row}")
        print()

    def is_game_ended(self):
            if self.my_field.is_loser():
                return True

            kills = sum(row.count(KILL) for row in self.opponent_field.grid)
            if kills == 10:
                return True
                
            return False

    def send_move(self, x, y):
        move = self.move_to_string(x, y).encode()
        self.sock.sendall(move)

    def send_result(self, result):
        self.sock.sendall(bytes([result]))

    def read_move(self):
        data = b""
        while len(data) < 2:
            data += self.sock.recv(2 - len(data))
        return data.decode()

    def read_result(self):
        data = b""
        while len(data) < 1:
            data += self.sock.recv(1)
        return data[0]

    def start_game(self, my_turn):
        print("¡Juego iniciado!")
        self.opponent_field.grid = [[UNKNOWN] * 8 for _ in range(8)]

        while not self.is_game_ended():
            self.print_fields()

            if my_turn:
                while True:
                    move_text = input("Tu turno, ingresa coordenada (ej: A1): ")
                    coords = self.parse_move(move_text)
                    if coords:
                        break
                    print("Coordenada inválida, intenta de nuevo.")

                x, y = coords
                self.send_move(x, y)
                result = self.read_result()

                if result == 0:
                    print("¡Fallaste!")
                    self.opponent_field.mark_miss(x, y)
                    my_turn = False
                elif result == 1:
                    print("¡Tocado!")
                    self.opponent_field.mark_hit(x, y)
                elif result == 2:
                    print("¡Hundido!")
                    self.opponent_field.mark_kill(x, y)

            else:
                print("Turno del oponente...")
                move_text = self.read_move()
                coords = self.parse_move(move_text)
                x, y = coords
                result = self.my_field.shoot(x, y)
                self.send_result(result)

                if result == 0:
                    print(f"El oponente falló en {move_text}")
                    my_turn = True
                elif result == 1:
                    print(f"El oponente tocó en {move_text}")
                elif result == 2:
                    print(f"El oponente hundió en {move_text}")

        self.print_fields()
        if self.my_field.is_loser():
            print("¡Perdiste!")
        else:
            print("¡Ganaste!")


def StartServer(seed, port):
    field = SeabattleField.get_random_field(seed)
    agent = SeabattleAgent(field)

    server_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server_sock.bind(("0.0.0.0", port))
    server_sock.listen(1)
    print(f"Servidor esperando en puerto {port}...")

    conn, addr = server_sock.accept()
    print(f"Cliente conectado desde {addr}")
    agent.sock = conn
    agent.start_game(my_turn=False)
    conn.close()
    server_sock.close()


def StartClient(seed, server_ip, port):
    field = SeabattleField.get_random_field(seed)
    agent = SeabattleAgent(field)

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((server_ip, port))
    print(f"Conectado al servidor {server_ip}:{port}")
    agent.sock = sock
    agent.start_game(my_turn=True)
    sock.close()


if __name__ == "__main__":
    if len(sys.argv) == 3:
        StartServer(int(sys.argv[1]), int(sys.argv[2]))
    elif len(sys.argv) == 4:
        StartClient(int(sys.argv[1]), sys.argv[2], int(sys.argv[3]))
    else:
        print("Uso:")
        print("  Servidor: python seabattle.py seed port")
        print("  Cliente:  python seabattle.py seed server_ip port")