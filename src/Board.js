// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex)
      var conflicts = 0;

      for(var i=0 ; i<row.length ; i++){
        conflicts += row[i];
        if(conflicts > 1){
          return true;
        }
      }
      return false;
    },


    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var n = this.get('n');
      for(var i = 0; i < n; i++){
        if(this.hasRowConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var rows = this.rows();
      var conflict = 0;
      for(var i = 0; i < rows.length; i++){
        conflict += rows[i][colIndex];
        if(conflict > 1){
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var n = this.get('n');
      for(var i=0 ; i<n ; i++){
        if(this.hasColConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var col = majorDiagonalColumnIndexAtFirstRow;
      var row = 0;
      var diff;
      var count = this.get('n');
      var conflict = 0;
      var rows = this.rows();

      if(col < 0){
        diff = -col;
        col += diff;
        row += diff;
      }

      for(;row < count; col++, row++){
        conflict += rows[row][col];
        if(conflict > 1){
          return true;
        }
      }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = this.get('n');
      for(var i=-(n-2) ; i<n-1 ; i++){
        if(this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var col = minorDiagonalColumnIndexAtFirstRow;
      var diff;
      var row = 0;
      var conflict = 0;
      var n = this.get('n');
      var rows = this.rows();

      if(col > n-1){
      diff = col-(n-1)
      col -= diff;
      row += diff;
      }

      for(;row<n; col--, row++){
        conflict += rows[row][col];
        if(conflict > 1){
          return true;
        }
      }

      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.get('n');
      for(var i = 1; i < ((2*n)-2); i++){
        if(this.hasMinorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    },

// BITWISE OPERATORS BELOW

    hasRowConflictAtBIT: function(rowIndex) {
      var row = this.get(rowIndex)
      var cases = {};
      var n = this.get('n');
      for(var i = 0 ; i < n; i++){
        cases[Math.pow(2,i)] = 1;
      }
      if(!(Math.log(2, row) in cases)){
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflictsBIT: function() {
      var n = this.get('n');
      for(var i = 0; i < n; i++){
        if(this.hasRowConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAtBIT: function(colIndex) {
      var rows = this.rows();
      var conflict = 0;
      for(var i = 0; i < rows.length; i++){
        conflict += rows[i][colIndex];
        if(conflict > 1){
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflictsBIT: function(board) {
      var n = board.length;
      var conflicts = {};
      for(var i=0 ; i<n ; i++){
        if(conflicts[board[i]] === undefined){
          conflicts[board[i]] = true;
        }else {
          return true;
        }
      }
    },

//     difference in bit array indexes [at bitArrray row indexes] is the same as the difference between rows, there is a diagonal conflict.
// diff = row1-row2
// if(diff === Math.abs((bitArray[index of row value]) - bitArray[index of row value (R lean)]) || Math.abs((bitArray[index of row value]) - bitArray[index of row value (left lean)]) );

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAtBIT: function(majorDiagonalColumnIndexAtFirstRow) {
      var col = majorDiagonalColumnIndexAtFirstRow;
      var row = 0;
      var diff;
      var count = this.get('n');
      var conflict = 0;
      var rows = this.rows();

      if(col < 0){
        diff = -col;
        col += diff;
        row += diff;
      }

      for(;row < count; col++, row++){
        conflict += rows[row][col];
        if(conflict > 1){
          return true;
        }
      }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflictsBIT: function() {
      var n = this.get('n');
      for(var i=-(n-2) ; i<n-1 ; i++){
        if(this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAtBIT: function(minorDiagonalColumnIndexAtFirstRow) {
      var col = minorDiagonalColumnIndexAtFirstRow;
      var diff;
      var row = 0;
      var conflict = 0;
      var n = this.get('n');
      var rows = this.rows();
      if(col > n-1){
      diff = col-(n-1)
      col -= diff;
      row += diff;
      }

      for(;row<n; col--, row++){
        conflict += rows[row][col];
        if(conflict > 1){
          return true;
        }
      }

      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflictsBIT: function() {
      var n = this.get('n');
      for(var i = 1; i < ((2*n)-2); i++){
        if(this.hasMinorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    }


    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
