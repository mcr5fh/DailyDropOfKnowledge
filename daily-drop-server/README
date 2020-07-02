## Mongo Serverless Serverless
To run the server locally (note it still talks to Mongo, so you have to whitelist 
your IP address if the DB isn't open), run `npm run watch` and the server will
reload with every change you have. 

To deploy, just run `serverless deploy`

TODO (not in order): 

Back end tuning: 
* Create a solid 'seed datbase' script
* Made a prod/dev deployment set up
* Clean up the code
* Add request ids 

Front end tuning: 
* Clean up the code
* Correctly order chapters
* Maybe add creator id?
* Gate adding questions to the readable owner
* Add a hide/show to the questions/answers
* Add request ids 

New Features:
* Allow for email subscriptions
* Allow for a way to take notes



NOTE: 

Serverless will give you a Creds not found error if you don't have a `[default]` IAM user with 
CloudFormation, S3, and probably more (everything but IAM) permissions set up in your `~/.aws/credentials` file

```
➜  daily-drop-server git:(master) ✗ serverless deploy
Serverless: DOTENV: Loading environment variables from .env:
Serverless: 	 - MONGO_URI

  Serverless Error ---------------------------------------

  AWS provider credentials not found. Learn how to set up AWS provider credentials in our docs here: <http://slss.io/aws-creds-setup>.
```

Questions

- What is a mongoose model
- how does typescript generics <> work?

Knowledge
- In TypeScript, two types are compatible if their internal structure is compatible