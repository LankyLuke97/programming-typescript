// Basic exploration of classes within Typescript
class Game {
    private pieces = Game.makePieces()

    private static makePieces() {
        return [
            // Kings
            new King('White', 'E', 1),
            new King('Black', 'E', 8),
            // Queens
            new Queen('White', 'D', 1),
            new Queen('Black', 'D', 8),
            // Rooks
            new Rook('White', 'A', 1),
            new Rook('White', 'H', 8),
            new Rook('Black', 'A', 1),
            new Rook('Black', 'H', 8),
            // Bishops
            new Bishop('White', 'C', 1),
            new Bishop('White', 'F', 1),
            new Bishop('Black', 'C', 8),
            new Bishop('Black', 'F', 8),
            // Knights
            new Knight('White', 'B', 1),
            new Knight('White', 'G', 1),
            new Knight('Black', 'B', 8),
            new Knight('Black', 'G', 8),
            // Pawns
            new Pawn('White', 'A', 2),
            new Pawn('White', 'B', 2),
            new Pawn('White', 'C', 2),
            new Pawn('White', 'D', 2),
            new Pawn('White', 'E', 2),
            new Pawn('White', 'F', 2),
            new Pawn('White', 'G', 2),
            new Pawn('White', 'H', 2),
            new Pawn('Black', 'A', 7),
            new Pawn('Black', 'B', 7),
            new Pawn('Black', 'C', 7),
            new Pawn('Black', 'D', 7),
            new Pawn('Black', 'E', 7),
            new Pawn('Black', 'F', 7),
            new Pawn('Black', 'G', 7),
            new Pawn('Black', 'H', 7),
        ]
    };
}

abstract class Piece {
    protected position: Position;
    constructor(
        private readonly colour: Colour,
        file: File,
        rank: Rank,
    ) {
        this.position = new Position(file, rank);
    };

    abstract canMoveTo(position: Position): boolean;

    moveTo(position: Position): void {
        this.position = position;
    };
}

class Position {
    constructor(
        private file: File,
        private rank: Rank,
    ) { };

    distanceFrom(position: Position): { rank: number, file: number } {
        return {
            rank: Math.abs(this.rank - position.rank),
            file: Math.abs(this.file.charCodeAt(0) - position.file.charCodeAt(0)),
        }
    };
}

class King extends Piece {
    canMoveTo(position: Position): boolean {
        let distance = this.position.distanceFrom(position);
        return distance.rank < 2 && distance.file < 2;
    };
}

class Queen extends Piece { canMoveTo(position: Position): boolean { return false; }; }

class Rook extends Piece { canMoveTo(position: Position): boolean { return false; }; }

class Bishop extends Piece { canMoveTo(position: Position): boolean { return false; }; }

class Knight extends Piece { canMoveTo(position: Position): boolean { return false; }; }

class Pawn extends Piece { canMoveTo(position: Position): boolean { return false; }; }

type Colour = 'Black' | 'White';
type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8


