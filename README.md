# what is it?
This is the demo shared on 25/05/2020 in .Net Mafia`s event about Azure functions vs AWS lambdas. 

# deployment

1. Install serverless
```
npm install -g serverless
```
2. Deploy
```
serverless deploy -v
```

It will ask you to create or sign-in with your aws account and then deploy the lambda to aws and expose it through an api gateway.

More details:
https://www.serverless.com/framework/docs/providers/aws/guide/quick-start/

# resources

1. lambda
2. api gateway
3. dynamo db