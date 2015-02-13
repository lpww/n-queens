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

window.recurse = function(row, n, eligCol, board, testfn, callback){
    //base case
    // if(board.hasAnyColConflicts() || board.hasAnyRowConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()){
    //   return;
    // }
    if(row === n){
      return callback();
      // console.log("Solution count:", solutionCount);
      // return;
    }
    // Recursive Case
      for(var col=0 ;col < n; col++){
        if(!eligCol[col]){
          continue;
        }
        if(row > 0){
          board.togglePiece(row,col);   //rows[row][col] = 1;
          if(!board[testfn]()){
            eligCol[col] = false;
            // queens++;

            var result = recurse(row+1, n, eligCol, board, testfn, callback);
            if(result){
              return result;
            }
            eligCol[col] = true;
            // queens--;
          }
          board.togglePiece(row,col);   //rows[row][col] = 0;
        } else {
          eligCol[col] = false;
          board.togglePiece(row,col);   //rows[row][col] = 0;
          var result = recurse(row+1, n, eligCol, board, testfn, callback);
          if(result){
              return result;
          }
          board.togglePiece(row,col);   //rows[row][col] = 1;
          eligCol[col] = true;
        }
      }

    // return;

  };

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

  // var rows = board.rows();

  var eligCol = [];
  for(var i=0; i<n ; i++){
    eligCol.push(true);
  }

  var recurse = function(board, row, col){
    //base case
    // if(board.hasAnyRooksConflicts()){    //board.hasAnyColConflicts() || board.hasAnyRowConflicts()){
    //   return;
    // }
    if(rooks === n){
      solutionCount++;

      // console.log("Solution count:", solutionCount);

      return;
    }
    // Recursive Case
      for(col=0 ;col < n; col++){
        if(!eligCol[col]){
          continue;
        }

        board.togglePiece(row, col);  //rows[row][col] = 1;
        rooks++;

        if(!board.hasAnyRooksConflicts()){

        eligCol[col] = false;

        recurse(board,row+1,0);
        }

        board.togglePiece(row, col);  //rows[row][col] = 0;

        eligCol[col] = true;
        rooks--;
      }

    return;

  };

  recurse(board, 0, 0);
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // var solutionCount = 0;
  var queens = 0;
  var board = new Board({n:n});
  var rows = board.rows();
  var eligCol = [];
  for(var i=0; i<n ; i++){
    eligCol.push(true);
  }

  if(n === 2 || n === 3){
    return rows;
  }

  var solution = undefined;

  var recurse = function(board, row, col){
    //base case
    if(board.hasAnyQueensConflicts()){  //board.hasAnyColConflicts() || board.hasAnyRowConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()){
      return;
    }
    if(queens === n){
      solution = board.rows();
      // console.log("Solution count:", solutionCount);
      return;
    }
    // Recursive Case
      for(col=0 ;col < n; col++){
        if(!eligCol[col]){
          continue;
        }
        board.togglePiece(row, col)  //rows[row][col] = 1;
        eligCol[col] = false;
        queens++;

        recurse(board,row+1,0);
        if(solution !== undefined){
          return;
        }
        board.togglePiece(row, col);  //rows[row][col] = 0;
        eligCol[col] = true;
        queens--;
      }

    return;

  };

  recurse(board, 0, 0);

  if(solution === undefined){
    return rows;
  }

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n:n});
  var solutionCount = 0;
  // var queens = 0;
  // var rows = board.rows();
  var eligCol = [];
  for(var i=0; i<n ; i++){
    eligCol.push(true);
  }



  recurse(0, n, eligCol, board, 'hasAnyQueensConflicts', function(){solutionCount++});

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
window.bitwiseTester = function(board, row, bitArray,valIndex){
  var n = board.length;
  var conflicts = {},diff;
  for(var i=0 ; i<n ; i++){
    if(conflicts[board[i]] === undefined){
      conflicts[board[i]] = true;
    }else {
    return true;
    }
  }
  for(i=row-1 ; i >= 0 ; i-- ){
  var diffBetweenRows = row - i;
    if(diff === Math.abs( bitArray[valIndex[row]] - bitArray[valIndex[i]] )) {
      return true;
    }
  }
  return false;
};
//     difference in bit array indexes [at bitArrray row indexes] is the same as the difference between rows, there is a diagonal conflict.
// diff = row1-row2
// if(diff === Math.abs((bitArray[index of row value]) - bitArray[index of row value (R lean)]) || Math.abs((bitArray[index of row value]) - bitArray[index of row value (left lean)]) );

window.countNQueensSolutionsBitwise = function(n) {
  var solutionCount = 0;
  var board = [];
  var eligCol = [];
  var bitArray = []
  var valIndex = {};
  for(var i=0; i<n ; i++){
    eligCol.push(true);
    bitArray.unshift(Math.pow(2,i));
    board[i] = 0;
    valIndex[Math.pow(2,i)] = i;
  }

  var recurse = function(board, row, col){
    //base case

    // CHANGE TO BITWISE
    // CHANGE ^ TO BITWISE

    if(rows === n){
      solutionCount++;
      console.log("Solution count:", solutionCount);
      return;
    }
    // Recursive Case
      for(col=0 ; col < n; col++){
        if(!eligCol[col]){
          continue;
        }
        board[row] = bitArray[col];
        if(!board.hasAnyQueenConflictsBIT()){
            eligCol[col] = false;
            recurse(board,row+1,0);
          }
            board[row] = 0;
            eligCol[col] = true;
        }

    return;

  };

  recurse(board, 0, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

