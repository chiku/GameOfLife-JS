const neighboursNeededForLiveCellToBeAlive = [2, 3];

const neighboursNeededForDeadCellToBeAlive = [3];

class Rules {
  static carryLiveCellForward(neighbourCount) {
    return neighboursNeededForLiveCellToBeAlive.some((count) => neighbourCount === count);
  }

  static carryDeadCellForward(neighbourCount) {
    return neighboursNeededForDeadCellToBeAlive.some((count) => neighbourCount === count);
  }
}

module.exports = Rules;
