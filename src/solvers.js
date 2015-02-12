/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  var rows = board.rows();

  for(var i=0 ; i<rows.length ; i++){
    rows[i][i] = 1;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(rows));
  return rows;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var rooks = 0;
  var board = new Board({n:n});
  var rows = board.rows();
  var row = 0;
  var col = 0;
  var prevRow = 0;
  var prevCol = 0;

  var recurse = function(board, row, col){
    //base case
    console.log("Checking base cases:", JSON.stringify(rows));
    if(board.hasAnyColConflicts() || board.hasAnyRowConflicts()){
      return;
    }
    if(rooks === n){
      solutionCount++;
      console.log("Solution count:", solutionCount);
      return;
    }
    //recursive case
    while(row < n){
      //addrook
      rows[row][col] = 1;
      console.log("Added rook", JSON.stringify(rows));
      rooks++;
      if(col < n-1){
        if(row > prevRow){
          prevRow++;
        }
        prevCol = col;
        col++
      }else if(row < n){
        prevRow = row;
        row++;
        prevCol = col;
        col = 0;
      }
      //recurse
      recurse(board,row,col);
      //deleted rook
      rows[prevRow][prevCol] = 0;
      console.log("Removed rook", JSON.stringify(rows));
      rooks--;
      if(row === n){return};
    }

    return;
  }

  recurse(board, row, col);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
