import React from "react";
import styles from "./Users.module.css";
import  axios from "axios";
import userImg from '../../assets/images/userImg.png'




class UsersC extends React.Component {

    constructor(props){
        super(props)
        
    }

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')        
        .then(response => this.props.setUsers(response.data.items))
    }

    // getUsers() {
    //     if(this.props.users.length === 0){
    //         axios.get('https://social-network.samuraijs.com/api/1.0/users')
           
    //         .then(response => this.props.setUsers(response.data.items))
         
    //      }
    // }

    render() {
        return (
            <div className={styles.wrapper}>
                {/* <button onClick={this.getUsers}>Get users</button> */}
                  {this.props.users.map(u => <div key={u.id}>
                    <span>
                        <div><img src={u.photos.small != null ? u.photos.small : userImg} className={styles.userPhoto}/></div>
                        <div>
                            {/* <button onClick={() => {u.followed ? props.unfollow(u.id) : props.follow(u.id)}} >{u.followed ? "Follow" : "Unfollow"}</button> */}
                            {u.followed 
                            ? <button onClick={() => {this.props.unfollow(u.id)}}>Unfollow</button> 
                            : <button onClick={() => {this.props.follow(u.id)}}>Follow</button>}
    
                        </div>
                        <br/>
                        <br/>
                    </span>
                    <span>
                        <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                        </span>
                        <span>
                                <div>{'u.location.country'}</div>
                                <div>{'u.location.city'}</div>
                        </span>
                    </span>
                  </div> )}
            </div>
        )
    }

}

export default UsersC;


