'use strict';
    
exports.handler = function (event, ctx, callback){
  
  var AWS = require('aws-sdk');
  // Set the region 
  AWS.config.update({region: 'sa-east-1'});
  
  // Create the DynamoDB service object
  var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  
  var params = {
    TableName: 'CUSTOMERS',
    Item: {
      'CUSTOMER_ID' : {N: '001'},
      'CUSTOMER_NAME' : {S: 'Richard Roe'}
    }
  };
  
  // Call DynamoDB to add the item to the table
  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
  console.log("querystring? "+event["queryStringParameters"]['id']);
  var queryParams = {
      TableName : "CUSTOMERS",
      KeyConditionExpression: "#id = :id",
      ExpressionAttributeNames:{
          "#id": "CUSTOMER_ID"
      },
      ExpressionAttributeValues: {
          ":id": parseInt(event["queryStringParameters"]['id'])
      }
  };
  
  
  var docClient = new AWS.DynamoDB.DocumentClient();
  
  // Call DynamoDB to read the item from the table
  docClient.query(queryParams, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        callback({
          statusCode: 200,
          body: JSON.stringify(
            err,
            null,
            2
          ),
        }, null);
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.CUSTOMER_ID + ": " + item.CUSTOMER_NAME);
        });
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(
            data,
            null,
            2
          ),
        });
    }
  });
  
};
