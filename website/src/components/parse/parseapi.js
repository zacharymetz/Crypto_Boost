import { coinList } from '../../constants/coins';



class ParseAPI {
  constructor() {
    this.parse = require('parse');
    //  this is the connected
    this.parse.initialize("backend");
    this.parse.serverURL = 'https://api.logicx.ca'
    //  this is where we can inisialize some of ther services 

    //  add the authchage function 
    this.parse.onAuthChangeListeners = [];
    var _this =  this;
    this.parse.onAuthChange = function(listener){
      console.log("adding event listners")
      _this.parse.onAuthChangeListeners.push(listener);
    }
    this.parse.triggerOnAuthChange = function(){

      var user = _this.parse.User.current()
      _this.parse.onAuthChangeListeners.forEach((elm)=>{
        elm(user);
      })
    }

    

  }
  // down here is where we create function that will wrap around the parse api thing 
  async loginUser(email,password){
    console.log("ASDASDASD")
    try{
      
      const user = await this.parse.User.logIn(email, password);
      console.log("loggedinb")
      this.parse.triggerOnAuthChange(user);
    }catch(error){
      console.log(error)
      throw error
    }
      
  }

  async createNewUser(username,email,password){
    
    //  make a new user 
    var user = new this.parse.User();
    user.set("username", email);
    user.set("email", email)
    user.set("password", password);
    //  create a new public profile with the username
    //  new account image 
    var PublicProfile = this.parse.Object.extend("publicProfile");
    var publicProfile = new PublicProfile();
    publicProfile.set('username',username);
    //  give them a random profile pic
    publicProfile.set('profilePicture',"https://i.pravatar.cc/150?img="+(Math.floor(Math.random() * 70) + 1).toString());
    user.set("publicProfile",publicProfile)
    

    //  create a private profile that only the user can see 
    //  for things relating to thier account 
    var PrivateProfile = this.parse.Object.extend("privateProfile");
    var privateProfile = new PrivateProfile();


    //  set up all of the feilds for the user (TODO MOVE TO CLOUD CODE)
    privateProfile.set("displayTotalWagers", true);
    privateProfile.set("displayAmmountWagered", true);
    privateProfile.set("maskSensitiveInformation", false);
    privateProfile.set("incognitoMode", false);

    privateProfile.set("name", null);
    privateProfile.set("dob", new Date());  //  set dob to now
    privateProfile.set("country", "");

    user.set("privateProfile",privateProfile)
    //  create the wallet for the user with all the currency from 
    //  coins / copnfig with a bunch of BAT for testing (MOVE TO COULD CODE)
    var UserWallet = this.parse.Object.extend("userWallet");
    var userWallet = new UserWallet();
    
    //  sets all the coins in the app from the constants 
    for(let coin of coinList){
      //  
      userWallet.set(coin.name,0.0);
    }

    user.set("userWallet",userWallet);
    //  sign up the user 
    await user.signUp();
    //  set public read access on the public profile and the user 
    var acl = new this.parse.ACL();
    acl.setPublicReadAccess(true);
    publicProfile.setACL(acl);
    acl.setWriteAccess(this.parse.User.current().id, true);
    await publicProfile.save();
    
    //  set the private profile to not public access 
    var acl = new this.parse.ACL();
    acl.setPublicReadAccess(false);
    privateProfile.setACL(acl);
    acl.setWriteAccess(this.parse.User.current().id, true);
    await privateProfile.save();

    //  set the private profile to not public access 
    var acl = new this.parse.ACL();
    acl.setPublicReadAccess(false);
    userWallet.setACL(acl);
    acl.setWriteAccess(this.parse.User.current().id, true);
    await userWallet.save();

    //  done createing a new user trigger an auth change 
    this.parse.triggerOnAuthChange(user);
    return 
    
  }

  

  async createNewAnonUser(){
    console.log("created anno user");
    //  so make a new new user name for this person 
    var username = "anon_" + makeid(7);
    
    //  generate a random passowrd 
    var password = makeid(64) + "Q";
    //  sign them up 
    var user = new this.parse.User();
    user.set("username", username);
    user.set("password", password);
    //user.set("profilePicture", "https://i.pravatar.cc/150?img="+(Math.floor(Math.random() * 70) + 1).toString())
    //  make a public profile for the user so they can 
    //  have some data that is saved with all the chat stuff
    var PublicProfile = this.parse.Object.extend("publicProfile");
    var publicProfile = new PublicProfile()
    publicProfile.set('username',username);
    publicProfile.set('profilePicture',"https://i.pravatar.cc/150?img="+(Math.floor(Math.random() * 70) + 1).toString());
    // other fields can be set just like with Parse.Object
    user.set("publicProfile",publicProfile)
    
    
    await user.signUp();
    var acl = new this.parse.ACL();
    acl.setPublicReadAccess(true);
    publicProfile.setACL(acl);
    acl.setWriteAccess(this.parse.User.current().id, true);
    await publicProfile.save();

    var user = this.parse.User.current();
    var userAcl = new this.parse.ACL(user)
    user.setACL(userAcl);


    //  after we need to do the private data thing and 
    //  it will hold all of the virual "items" your 
    //  account holds (move this to the after user create trigger )
    //  so that the user does not have access to this part 
    var Inventory = this.parse.Object.extend("Inventory");
    var inventory = new Inventory();
    inventory.setACL(new this.parse.ACL(this.parse.User.current()));
    
    //  set the ammount of coins the account has 
    inventory.set("coins", 0);

    this.parse.User.current().set("inventory", inventory);

   
    
    
    this.parse.triggerOnAuthChange();
    
  }

  

  //  this function will call its own parse thing 
  //  and say it wants to remove its session 
  async signOutCurrentUser(){
    await this.parse.User.logOut();
    this.parse.triggerOnAuthChange();
  }
    
  
  
}
function makeid(length) {
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export default ParseAPI;