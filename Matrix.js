/**
 * Function matrix
 * @param int rows
 * @param int cols
 */
function Matrix(rows, cols) {
    let _matrix = this;

    _matrix.rows = rows;
    _matrix.cols = cols;

    _matrix.data = new Array();

    _matrix.reset = function () {
        for (let r = 0; r < _matrix.rows; r++) {
            _matrix.data.push(new Array());
            for (let c = 0; c < _matrix.cols; c++) {
                _matrix.data[r].push(1);
            }
        }
    }

    _matrix.reset();

    _matrix.show = function () {
        console.log('%c ' + _matrix.rows + "X" + _matrix.cols, "color: red; font-size: 200%; text-align: center;");            

        let str = '';
        
        _matrix.data.forEach(function(rows, index) {
            str += (index != 0) ? " | " : "| ";

            rows.forEach(cols => {
                str += cols + " | ";
            });

            str += "\n";       

        });
        console.log('%c ' + str, "color: white; font-size: 150%; background: black;");     
    }


    _matrix.set = function (row, column, value) {
        if (!((row - 1) in _matrix.data)) {
            return false;
        }

        if (!((column - 1) in _matrix.data[row-1])) {
            return false;
        }


        _matrix.data[row - 1][column - 1] = value;

        return true;
    }

    _matrix.addition = function (matrix) {
        if (!(matrix instanceof Matrix)) {
            return false;
        }

        if (_matrix.rows != matrix.rows || _matrix.cols != matrix.cols) {
            return false;
        }

        let retMatrix = new Matrix(_matrix.rows, _matrix.cols);
        for (let r = 0; r < _matrix.rows; r++) {
            for (let c = 0; c < _matrix.cols; c++) {
                retMatrix.data[r][c] = _matrix.data[r][c] + matrix.data[r][c];
            }
        }

        return retMatrix;
    }

    _matrix.scale = function (value) {
        let retMatrix = new Matrix(_matrix.rows, _matrix.cols);
        for (let r = 0; r < _matrix.rows; r++) {
            for (let c = 0; c < _matrix.cols; c++) {
                retMatrix.data[r][c] = _matrix.data[r][c] * value;
            }
        }

        return retMatrix;
    }

    _matrix.substruction = function (matrix) {
        if (!(matrix instanceof Matrix)) {
            return false;
        }

        if (_matrix.rows != matrix.rows || _matrix.cols != matrix.cols) {
            return false;
        }

        matrix = matrix.scale(-1);

        let retMatrix = new Matrix(_matrix.rows, _matrix.cols);
        for (let r = 0; r < _matrix.rows; r++) {
            for (let c = 0; c < _matrix.cols; c++) {
                retMatrix.data[r][c] = _matrix.data[r][c] + matrix.data[r][c];
            }
        }

        return retMatrix;
    }

    _matrix.multiplication = function (matrix) {
        if (!(matrix instanceof Matrix)) {
            return false;
        }

        if (_matrix.cols != matrix.rows) {
            return false;
        }

        let retMatrix = new Matrix(_matrix.rows, matrix.cols);
       
        for (let i = 0; i < _matrix.rows; i++) {
            for (let j = 0; j < matrix.cols; j++) {
                let sum = 0;
                for (let k = 0; k < matrix.rows; k++) {
                    sum += _matrix.data[i][k] * matrix.data[k][j];
                }
                retMatrix.data[i][j] = sum;
            }
        }

        return retMatrix;
    }

    _matrix.setRow = function(row, array) {
        if (!((row - 1) in _matrix.data)) {
            return false;
        }

        if (array.length > _matrix.data[0].length) {
            return false;
        }

        if (!Array.isArray(array)) {
            return false;
        }

        for (let i = 0; i < array.length; i++) {
            _matrix.data[row-1][i] = array[i];
        }

        return true;
    }

    _matrix.setColumn = function (column, array) {
        if (!((column - 1) in _matrix.data[0])) {
            return false;
        }

        if (array.length > _matrix.data.length) {
            return false;
        }

        if (!Array.isArray(array)) {
            return false;
        }

        for (let i = 0; i < array.length; i++) {
            _matrix.data[i][column-1] = array[i];
        }

        return true;
    }


    _matrix.transp = function () {
        let retMatrix = new Matrix(_matrix.cols, _matrix.rows);
       
        for (let r = 0; r < _matrix.rows; r++) {
            for (let c = 0; c < _matrix.cols; c++) {
                retMatrix.data[c][r] = _matrix.data[r][c];
            }
        }

        return retMatrix;
    }

    _matrix.get = function (row, column) {
        if (!((row - 1) in _matrix.data)) {
            return false;
        }

        if (!((column - 1) in _matrix.data[row-1])) {
            return false;
        }

        return _matrix.data[row-1][column-1];
    }
}