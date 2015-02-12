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
  var eligCol = [];
  for(var i=0; i<n ; i++){
    eligCol.push(true);
  }

  var recurse = function(board, row, col){
    //base case
    if(board.hasAnyColConflicts() || board.hasAnyRowConflicts()){
      return;
    }
    if(rooks === n){
      solutionCount++;
      console.log("Solution count:", solutionCount);
      return;
    }
    // Recursive Case
      for(col=0 ;col < n; col++){
        if(!eligCol[col]){
          continue;
        }
        rows[row][col] = 1;
        eligCol[col] = false;
        rooks++;

        recurse(board,row+1,0);

        rows[row][col] = 0;
        eligCol[col] = true;
        rooks--;
      }

    return;

  };

  recurse(board, 0, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutionCount = 0;
  var rooks = 0;
  var board = new Board({n:n});
  var rows = board.rows();
  var eligCol = [];
  for(var i=0; i<n ; i++){
    eligCol.push(true);
  }
  var solution = undefined;

  var recurse = function(board, row, col){
    //base case
    if(n === 6){
      debugger;
    }
    if(board.hasAnyColConflicts()){
      return;
    }
    if(board.hasAnyRowConflicts()){
      return;
    }
    if(board.hasAnyMajorDiagonalConflicts()){
      return;
    }
    //error in minor diagonal conflicts
    if(board.hasAnyMinorDiagonalConflicts()){
      return;
    }
    if(rooks === n){
      solution = board.rows();
      // console.log("Solution count:", solutionCount);
      return;
    }
    // Recursive Case
      for(col=0 ;col < n; col++){
        if(!eligCol[col]){
          continue;
        }
        rows[row][col] = 1;
        eligCol[col] = false;
        rooks++;

        recurse(board,row+1,0);
        if(solution !== undefined){
          return;
        }
        rows[row][col] = 0;
        eligCol[col] = true;
        rooks--;
      }

    return;

  };

  recurse(board, 0, 0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
