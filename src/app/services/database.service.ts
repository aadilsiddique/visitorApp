import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ConstantService } from './constant.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db;
  constructor(private sqlite: SQLite,
    private constantServices: ConstantService) { }

  openDatabase(onSuccess) {
    var ref = this;
    this.sqlite.create({
      name: ref.constantServices.projectConstants.databaseName,
      location: 'default'
    }).then((db: SQLiteObject) => {
      ref.db = db;
      onSuccess(db);
    }).catch(e => console.log(e));
  }

  executeQuery(sqlQuery, onSuccess, onError) {
    this.db.executeSql(sqlQuery, [])
      .then(res => {
        onSuccess(res);
      })
      .catch(e => {
        console.log(e);
        onError(e);
      });
  }

  /*
  * createDbTable function
  * createDbTable is used to create DB tables.
  */
  createDbTable(tableName, columnData, onSuccess, onError) {
    try {
      var createSql = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' (' + columnData + ')';
      this.executeQuery(createSql, function (results) {
        onSuccess(results);
      }, function (err) {
        onError(err);
      });
    } catch (e) {
      onError(e);
    }
  }


  insertData(tableName, dataArr, onSuccess, onError) {
    var query = 'INSERT INTO ' + tableName + ' VALUES (' + dataArr + ')';
    this.executeQuery(query, function (results) {
      onSuccess(results);
    }, function (err) {
      onError(err);
    });
  }

  dropTable(tableName, onSuccess, onError) {
    var query = 'DROP TABLE ' + tableName;
    this.executeQuery(query, function (results) {
      onSuccess(results);
    }, function (err) {
      onError(err);
    });
  }

  deleteAllDataTable(tableName, onSuccess, onError) {
    var deleteSql = 'DELETE FROM  ' + tableName;
    this.executeQuery(deleteSql, function (results) {
      onSuccess(results);
    }, function (err) {
      console.log(err)
      onError(err);
    });
  }

  deleteRowDataFromTable(tableName, columnName, value, onSuccess, onError) {
    var deleteSql = 'DELETE FROM  ' + tableName + ' where ' + columnName + ' = "' + value + '"';
    this.executeQuery(deleteSql, function (results) {
      onSuccess(results);
    }, function (err) {
      onError(err);
    });
  }

  selectAllDataFromTable(tableName, onSuccess, onError) {
    var selectSql = 'SELECT * FROM  ' + tableName;
    this.executeQuery(selectSql, function (results) {
      onSuccess(results);
    }, function (err) {
      onError(err);
    });
  }

  selectDataFromTableUsingClause(tableName, columnArr, valueArr, clause, onSuccess, onError) {
    var query = [];

    for (var i = 0; i < columnArr.length; i++) {
      query.push(columnArr[i] + ' = "' + valueArr[i] + '"');
      if (i < columnArr.length - 1 && columnArr.length > 1) {
        query.push(' ' + clause + ' ');
      }
    }
    var selectSql = 'SELECT * FROM ' + tableName + ' WHERE ' + query.join("");
    this.executeQuery(selectSql, function (results) {
      onSuccess(results);
    }, function (err) {
      onError(err);
    });
  }

  alterTable(tableName, columnName, onSuccess, onError) {
    var query = 'ALTER TABLE ' + tableName + ' ADD ' + columnName;
    this.executeQuery(query, function (results) {
      onSuccess(results);
    }, function (err) {
      onError(err);
    });
  }

  updateTable(tableName, updateColumnArr, updateValueArr, columnArr,
    valueArr, onSuccess, onError) {
    var updateQueryArr = [];
    for (var i = 0; i < updateColumnArr.length; i++) {
      updateQueryArr.push(updateColumnArr[i] + "='" + updateValueArr[i] + "'");
      if (i !== updateColumnArr.length - 1 && updateColumnArr.length > 1) {
        updateQueryArr.push(",");
      }
    }
    var updateClauseArr = [];
    for (var j = 0; j < columnArr.length; j++) {
      updateClauseArr.push(columnArr[j] + " = '" + valueArr[j] + "'");
      if (j !== columnArr.length - 1 && columnArr.length > 1) {
        updateClauseArr.push(" AND ");
      }
    }
    var query = "UPDATE " + tableName + " SET " + updateQueryArr.join("") + " WHERE " + updateClauseArr.join("");
    this.executeQuery(query, function (results) {
      onSuccess(results);
    }, function (err) {
      onError(err);
    });
  }

  lastIndexOfTable(tableName, columnName, onSuccess, onError) {
    var query = 'SELECT ' + columnName + ' FROM ' + tableName + '';
    this.executeQuery(query, function (results) {
      if (results.rows.length > 0) {
        var tempArr = [];
        for (var i = 0; i < results.rows.length; i++) {
          tempArr.push({
            unique_id: results.rows.item(i)[columnName]
          });
        }
        var sortedArray = tempArr.sort(function (a, b) { return a.unique_id - b.unique_id })
        var temp_id = parseInt(sortedArray[sortedArray.length - 1]["unique_id"]) + 1;
        onSuccess(temp_id);
      } else {
        onSuccess("1");
      }
    }, function (err) {
      onError(err);
    });
  }

  /*
  * updateDbRowData function
  * updateDbRowData is used to update a particular row in db.
  */
  updateDbParticularRowData(tableName, updateColumn, updateValue, columnName, value, onSuccess, onError) {
    var query = 'UPDATE ' + tableName + ' SET ' + updateColumn + '="' + updateValue + '" ' + ' WHERE ' + columnName + '="' + value + '"';
    this.executeQuery(query, function (results) {
      onSuccess(results);
    }, function (err) {
      onError(err);
    });
  }

  /*
  * updateDbParticularRowMultipleData function
  * updateDbParticularRowMultipleData is used to update multiple values of a particular row in db.
  */
  updateDbParticularRowMultipleData(tableName, updateColumnArr, updateValueArr, columnName, value, onSuccess, onError) {
    var tempArr = [];
    for (var i = 0; i < updateColumnArr.length; i++) {
      tempArr.push(updateColumnArr[i] + "='" + updateValueArr[i] + "'");
      if (i !== updateColumnArr.length - 1) {
        tempArr.push(",");
      }
    }
    var query = 'UPDATE ' + tableName + ' SET ' + tempArr.join("") + ' WHERE ' + columnName + '="' + value + '"';
    this.executeQuery(query, function (results) {
      onSuccess(results);
    }, function (err) {
      onError(err);
    });
  }


  updateDbParticularRowDataMultipleClause(tableName, updateColumn, updateValue, columnNameArr, valueArr, onSuccess, onError) {
    var tempArr = [];
    for (var i = 0; i < columnNameArr.length; i++) {
      tempArr.push(columnNameArr[i] + "='" + valueArr[i] + "'");
      if (i !== columnNameArr.length - 1) {
        tempArr.push(" AND ");
      }
    }
    var query = 'UPDATE ' + tableName + ' SET ' + updateColumn + '="' + updateValue + '" WHERE ' + tempArr.join("");
    this.executeQuery(query, function (results) {
      onSuccess(results);
    }, function (err) {
      onError(err);
    });
  }


  deleteRowDataFromTableUsingClause(tableName, columnName1, columnName2, clause, value1, value2, onSuccess, onError) {
    var deleteSql = 'DELETE FROM  ' + tableName + ' where ' + columnName1 + ' = "' + value1 + '" ' + clause + ' ' + columnName2 + ' = "' + value2 + '"';
    this.executeQuery(deleteSql, function (results) {
      onSuccess(results);
    }, function (err) {
      onError(err);
    });
  }
}
