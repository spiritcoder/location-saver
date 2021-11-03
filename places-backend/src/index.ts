import dao from './repo/dao';
import {app} from './app'


//setup database
dao.setupDbForDev();

//Now tisten to this port 
if (app.listen(process.env.PORT)) {
  console.log("Node is listening to Port " + process.env.PORT);
}
else {
  console.log("An error occured");
}
