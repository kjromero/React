import React, { Component } from 'react';
import firebase from 'firebase';
import FileUpload from './FileUpload';

import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      user: null,
      pictures : []
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount (){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user});
    });

    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures : this.state.pictures.concat(snapshot.val())
      })
    });

  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} ha iniciado sesion`))
    .catch(error => console.log(`Error ${error.code} : ${error.message} `));
  }

  handleLogout(){
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha salido`))
      .catch(error => console.log(`Error ${error.code} : ${error.message} `));
  }

  handleUpload(event){
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
      let porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue : porcentaje
      })
    }, error => {
      console.log(error.message)
    }, () => {
      const record = {
        photoURL : this.state.user.photoURL,
        displayName : this.state.user.displayName,
        image : task.snapshot.downloadURL
      };

       const dbRef = firebase.database().ref('pictures');
       const newPicture = dbRef.push();
       newPicture.set(record);
    });
  }



  renderLoginButton(){
    if(this.state.user){
      return(
         <div>
          <div className="row">

            <div className="col-sm-4" >
              <img className="img-circle" width="100" src={this.state.user.photoURL} alt={this.state.user.displayName} />
            </div>

            <div className="col-sm-4 ">
              <p>{this.state.user.displayName}</p>
            </div>

            <div className="col-sm-4 ">
              <button className="btn btn-warning" onClick={this.handleLogout}>Salir!!</button>
            </div>

          </div>

          <br/>

          <FileUpload onUpload={this.handleUpload}/>

          <br/>

          <div className="container">
          {
            this.state.pictures.map(picture => (
                <div className="center">

                    <div className="panel panel-default">
                      <div className="panel-heading">
                         <img className="img-circle"  src={picture.photoURL} width="40" alt={picture.displayName} />
                          <span>{picture.displayName}</span>
                      </div>
                      <div className="panel-body">
                          <img src={picture.image} className="imgpsot" alt="" />
                      </div>
                    </div>
                    <br/>
                </div>

              )).reverse()
          }
          </div>
        </div>
      )
    }else{
      return(<div className="center" id="MyImage">


                  <img id="theImage" src="https://store-images.s-microsoft.com/image/apps.58521.13510798887167234.713cc0e4-e4a7-4f7c-8cde-9c6a53872b1d.539a5fdf-76a3-486f-bb0f-d2dce82923cc" />
<br/>

                  <p> Bienvenido a nuestra red social de imagenes comaprtidas

                  Aqui podras subir tus imagenes y ver la de los demas </p>

                  <button id="myButton" onClick={this.handleAuth}>Ingresar </button>
                <br/>
            </div>
          )
    }
  }


  render() {
    return (
      <div className="container">
       
        {this.renderLoginButton()}
       
      </div>
    );
  }
}

export default App;
